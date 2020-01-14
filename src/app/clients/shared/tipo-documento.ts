export interface TipoDocumento {
  code: string;
  label: string;
}

export const CC: TipoDocumento = {
  code: 'CC',
  label: 'Cédula de ciudadanía'
};

export const NIT: TipoDocumento = {
  code: 'NIT',
  label: 'NIT'
};

export const TIPOS_DOCUMENTO: TipoDocumento[] = [CC, NIT];
