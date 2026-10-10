import { receber } from '@/lib/envio';
import { camposContato } from '@/lib/validacao';

export const POST = (req: Request) => receber(req, 'contato', camposContato);
