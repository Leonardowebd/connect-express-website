<?php
// Recebe um formulário do site e manda por e-mail para a caixa configurada.
// Espelha as regras de src/lib/envio.ts e src/lib/validacao.ts: mesma origem,
// limite por IP, campo armadilha e validação campo a campo. A lista de campos
// vem de campos.json, gerado no build a partir de validacao.ts.

declare(strict_types=1);

const TAMANHO_MAXIMO = 10000;

function responder(int $status, array $corpo): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    header('X-Content-Type-Options: nosniff');
    echo json_encode($corpo, JSON_UNESCAPED_UNICODE);
    exit;
}

function mesma_origem(): bool
{
    $origem = $_SERVER['HTTP_ORIGIN'] ?? '';
    $host = $_SERVER['HTTP_HOST'] ?? '';
    if ($origem === '' || $host === '') {
        return false;
    }
    $partes = parse_url($origem);
    if (!is_array($partes) || !isset($partes['host'])) {
        return false;
    }
    $origem_host = $partes['host'] . (isset($partes['port']) ? ':' . $partes['port'] : '');
    return strcasecmp($origem_host, $host) === 0;
}

function excedeu_limite(string $ip, int $limite, int $janela): bool
{
    $arquivo = sys_get_temp_dir() . '/connect-form-' . sha1($ip) . '.json';
    $agora = time();
    $lido = @file_get_contents($arquivo);
    $anteriores = $lido ? json_decode($lido, true) : [];
    if (!is_array($anteriores)) {
        $anteriores = [];
    }
    $recentes = array_values(array_filter($anteriores, fn ($t) => is_int($t) && $agora - $t < $janela));
    $recentes[] = $agora;
    @file_put_contents($arquivo, json_encode($recentes), LOCK_EX);
    return count($recentes) > $limite;
}

/** Devolve um erro por campo com problema. Lista vazia significa que pode enviar. */
function validar(array $campos, array $valores): array
{
    $erros = [];
    foreach ($campos as $campo) {
        $bruto = $valores[$campo['nome']] ?? null;
        $valor = is_string($bruto) ? trim($bruto) : '';
        if ($valor === '') {
            if ($campo['obrigatorio']) {
                $erros[$campo['nome']] = 'Preencha o campo ' . mb_strtolower($campo['rotulo']) . '.';
            }
            continue;
        }
        if (mb_strlen($valor) > $campo['maximo']) {
            $erros[$campo['nome']] = 'Use até ' . $campo['maximo'] . ' caracteres.';
        } elseif ($campo['tipo'] === 'email' && !preg_match('/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/u', $valor)) {
            $erros[$campo['nome']] = 'Informe um e-mail válido, como nome@empresa.com.br.';
        } elseif ($campo['tipo'] === 'tel' && !preg_match('/^[\d\s()+\-]{8,20}$/', $valor)) {
            $erros[$campo['nome']] = 'Informe um telefone com DDD, como (11) 99999-0000.';
        } elseif ($campo['tipo'] === 'select' && isset($campo['opcoes']) && !in_array($valor, $campo['opcoes'], true)) {
            $erros[$campo['nome']] = 'Escolha uma das opções.';
        }
    }
    return $erros;
}

/** Corta no tamanho máximo e tira caracteres de controle (em campos de uma linha, também as quebras). */
function limpar(array $campos, array $valores): array
{
    $saida = [];
    foreach ($campos as $campo) {
        $bruto = $valores[$campo['nome']] ?? null;
        $texto = is_string($bruto) ? mb_substr(trim($bruto), 0, $campo['maximo']) : '';
        $saida[$campo['nome']] = $campo['tipo'] === 'textarea'
            ? preg_replace('/[\x00-\x08\x0B-\x1F]/', '', $texto)
            : preg_replace('/[\x00-\x1F]/', ' ', $texto);
    }
    return $saida;
}

function receber(string $formulario): void
{
    if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
        header('Allow: POST');
        responder(405, ['ok' => false, 'codigo' => 'metodo']);
    }
    if (!mesma_origem()) {
        responder(403, ['ok' => false, 'codigo' => 'origem']);
    }

    $config = require __DIR__ . '/config.php';
    $definicao = json_decode((string) file_get_contents(__DIR__ . '/campos.json'), true);
    $campos = $definicao['formularios'][$formulario] ?? null;
    $destino = $config['destinos'][$formulario] ?? null;
    if (!is_array($campos) || !is_string($destino)) {
        responder(503, ['ok' => false, 'codigo' => 'indisponivel']);
    }

    $ip = $_SERVER['REMOTE_ADDR'] ?? 'desconhecido';
    if (excedeu_limite($ip, (int) $config['limite'], (int) $config['janela_em_segundos'])) {
        responder(429, ['ok' => false, 'codigo' => 'limite']);
    }

    $texto = (string) file_get_contents('php://input', false, null, 0, TAMANHO_MAXIMO + 1);
    if (strlen($texto) > TAMANHO_MAXIMO) {
        responder(413, ['ok' => false, 'codigo' => 'tamanho']);
    }
    $valores = json_decode($texto, true);
    if (!is_array($valores)) {
        responder(400, ['ok' => false, 'codigo' => 'formato']);
    }

    // Campo armadilha preenchido: é robô. Responde sucesso para não dar pista.
    $armadilha = $definicao['armadilha'];
    if (isset($valores[$armadilha]) && is_string($valores[$armadilha]) && $valores[$armadilha] !== '') {
        responder(200, ['ok' => true]);
    }

    $erros = validar($campos, $valores);
    if ($erros !== []) {
        responder(422, ['ok' => false, 'codigo' => 'campos', 'erros' => $erros]);
    }

    $dados = limpar($campos, $valores);
    $linhas = ['Formulário: ' . $formulario, 'Recebido em: ' . date('d/m/Y H:i'), ''];
    foreach ($campos as $campo) {
        if ($dados[$campo['nome']] !== '') {
            $linhas[] = $campo['rotulo'] . ': ' . $dados[$campo['nome']];
        }
    }
    $corpo = implode("\r\n", str_replace(["\r\n", "\r", "\n"], "\r\n", $linhas));

    $assunto = ($config['assuntos'][$formulario] ?? 'Formulário do site') . ' - ' . ($dados['nome'] ?? '');
    $cabecalhos = [
        'From: ' . mb_encode_mimeheader($config['nome_do_remetente'], 'UTF-8') . ' <' . $config['remetente'] . '>',
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: 8bit',
    ];
    // O e-mail já passou pela validação e pela limpeza: não tem quebra de linha.
    if (($dados['email'] ?? '') !== '') {
        $cabecalhos[] = 'Reply-To: ' . $dados['email'];
    }

    $enviado = @mail(
        $destino,
        mb_encode_mimeheader($assunto, 'UTF-8'),
        $corpo,
        implode("\r\n", $cabecalhos),
        '-f' . $config['remetente']
    );
    if (!$enviado) {
        error_log('[formulario:' . $formulario . '] mail() devolveu falso');
        responder(502, ['ok' => false, 'codigo' => 'envio']);
    }

    responder(200, ['ok' => true]);
}
