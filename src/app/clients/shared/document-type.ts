export interface DocumentType {
  code: string;
  label: string;
}

export const CC: DocumentType = {
  code: 'CC',
  label: 'Cédula de ciudadanía'
};

export const NIT: DocumentType = {
  code: 'NIT',
  label: 'NIT'
};

export const DOCUMENT_TYPES: DocumentType[] = [CC, NIT];
