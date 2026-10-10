import { receber } from '@/lib/envio';
import { camposVagas } from '@/lib/validacao';

export const POST = (req: Request) => receber(req, 'vagas', camposVagas);
