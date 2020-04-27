export interface DocumentType {
  code: string;
  description: string;
}

export const CEDULA: DocumentType = {
  code: 'CC',
  description: 'Cédula de ciudadanía'
};

export const NIT: DocumentType = {
  code: 'NIT',
  description: 'NIT'
};

export const PASAPORTE: DocumentType = {
  code: 'PA',
  description: 'Pasaporte'
};

export const TARJETA: DocumentType = {
  code: 'TI',
  description: 'Tarjeta de identidad'
};
export const NUIP: DocumentType = {
  code: 'NU',
  description: 'Número de Ident. Unico'
};

export const REGISTRO: DocumentType = {
  code: 'RC',
  description: 'Registro Civil'
};

export const DOCUMENT_TYPES: DocumentType[] = [CEDULA, NIT, PASAPORTE, NUIP, TARJETA, REGISTRO];
