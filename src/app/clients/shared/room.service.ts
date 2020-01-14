import { Injectable } from '@angular/core';
import { Client } from './client';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  constructor() {}

  save(client: Client) {
    console.log('GUARDANDO CLIENTE');
  }
}
