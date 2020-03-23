import { DocumentType } from '../shared/document-type';
import { Country } from './country';
export interface Client {
  uuid: string;
  documentType: DocumentType;
  document: string;
  name: string;
  email?: string;
  bithdate?: Date;
  phone?: string;
  country: Country;
}

export interface Person {
  uuid: string;
  documentType: DocumentType;
  document: string;
  name: string;
  email?: string;
  bithdate?: Date;
  phone?: string;
  country: Country;
}
