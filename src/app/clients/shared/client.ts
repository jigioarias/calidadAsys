import { DocumentType } from '../shared/document-type';
export interface Client {
  uuid: string;
  documentType: DocumentType;
  document: string;
  name: string;
  email: string;
  bithdate: Date;
  phone: string;
}
