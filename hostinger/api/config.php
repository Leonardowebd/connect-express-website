<?php
// Configuração do envio dos formulários. É o único arquivo a editar no servidor.
//
// "remetente" precisa ser uma caixa de e-mail que EXISTE no domínio, criada no
// painel da Hostinger (E-mails > Contas de e-mail). Sem isso, a mensagem cai em
// spam ou é recusada.
// "destinos" são as caixas que recebem cada formulário.

return [
    'remetente' => 'site@connectexpresslog.com.br',
    'nome_do_remetente' => 'Site Connect Express Log',
    'destinos' => [
        'contato' => 'comercial@connectexpresslog.com.br',
        'vagas' => 'vagas@connectexpresslog.com.br',
    ],
    'assuntos' => [
        'contato' => 'Pedido de cotação pelo site',
        'vagas' => 'Cadastro em Trabalhe Conosco pelo site',
    ],
    // Envios aceitos por endereço IP a cada janela de tempo.
    'limite' => 5,
    'janela_em_segundos' => 600,
];
