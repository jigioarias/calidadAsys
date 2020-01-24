import { Hotel } from 'src/app/general/shared/hotel';

export interface UserCredential {
  user: string;
  token: string;
  hotel: Hotel[];
}
