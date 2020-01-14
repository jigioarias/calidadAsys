import { TipoDocumento } from './tipo-documento';

export interface Client {
  id: string;
  documento: string;
  tipoDocumento: TipoDocumento;
  nombreCompleto: string;
  email: string;
  fechaNacimiento: Date;
}
