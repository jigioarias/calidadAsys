export interface Sale {
  uuid: string;
  hotelId: string;
  date: Date;
  state: string;
  client: Client;
  values: Value;
  items: Item[];
  rooms: Room[];
}
export interface Value {
  gross: bigint;
  tax: bigint;
  net: bigint;
  discount: bigint;
  total: bigint;
}

export interface Client {
  uuid: string;
  typeDocument: string;
  document: string;
  name: string;
  country: string;
}
export interface Item {
  uuid: string;
  dateSale: Date;
  description: string;
  quantity: bigint;
  values: Value;
}

export interface Room {
  uuid: string;
  description: string;
  startDate: Date;
  endDate: Date;
  values: Value;
  guests: string[];
}
