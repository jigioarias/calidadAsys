export interface TypeContract {
  code: string;
  description: string;
}

export const Fijo: TypeContract = {
  code: 'F',
  description: 'Fijo'
};

export const Indefinido: TypeContract = {
  code: 'I',
  description: 'Indefinido'
};

export const Servicios: TypeContract = {
  code: 'S',
  description: 'Prest. de Servicios'
};

export const Horas: TypeContract = {
  code: 'H',
  description: 'Horas'
};

export const TYPE_CONTRACTS: TypeContract[] = [Fijo, Indefinido, Servicios, Horas];
