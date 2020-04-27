export interface Person {
  address?: string;
  birthdate?: string;
  cellPhone: string;
  country: {
    code: string;
    name: string;
    uuid: string;
  };
  document: string;
  documentType: string;
  email: string;
  lastName: string;
  firstName: string;
  phone?: string;
  uuid: string;
}
