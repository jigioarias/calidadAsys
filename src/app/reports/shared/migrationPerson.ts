export interface MigrationPerson {
  hotelCode: string;
  codeCity: string;
  docType: string;
  document: string;
  nationality: string;
  name: string;
  lastName: string;
  surName?: string;
  movementType: string;
  movementDate: string;
  originPlace?: string;
  destinationPlace?: string;
  birthDate: string;
}
