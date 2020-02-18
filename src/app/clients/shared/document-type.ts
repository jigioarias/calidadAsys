export interface DocumentType {
  code: string;
  description: string;
}

export const CC: DocumentType = {
  code: 'CC',
  description: 'Cédula de ciudadanía'
};

export const NIT: DocumentType = {
  code: 'NIT',
  description: 'NIT'
};

export const DOCUMENT_TYPES: DocumentType[] = [CC, NIT];
