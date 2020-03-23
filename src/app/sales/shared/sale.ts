export interface Sale {
  uuid: string;
  date: Date;
  state: SaleState;
  client: ClientOfSale;
  items: ItemInSale[];
  rooms: RoomInSale[];
}

export interface ClientOfSale {
  person_uuid: string;
  document: string;
  name: string;
}

export interface RoomInSale {
  uuid: string;
  startDate: Date;
  endDate: Date;
  values: Values;
  guests: string[];
}

export interface ItemInSale {
  uuid: string;
  date: Date;
  item_uuid: string;
  description: string;
  quantity: number;
  values: Values;
}

export interface ItemInSale {
  uuid: string;
  item_uuid: string;
  description: string;
  quantity: number;
  values: Values;
}

export interface Values {
  gross: number;
  tax: number;
  net: number;
  discount: number;
  total: number;
}

export enum SaleState {
  PROCESO = 'En proceso',
  FINALIZADA = 'Finalizada',
  FACTURADA = 'Facturada'
}
