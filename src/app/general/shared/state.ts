export interface State {
  code: string;
  description: string;
}

export const Activo: State = {
  code: '1',
  description: 'Activo'
};

export const Inactivo: State = {
  code: '0',
  description: 'Inactivo'
};

export const STATES: State[] = [Activo, Inactivo];
