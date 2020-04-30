import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  constructor() {}

  showSuccessMessage(message: string) {
    this.showMessage(message, 'success');
  }

  showErrorMessage(message: string) {
    this.showMessage(message, 'error');
  }

  showWarningMessage(message: string) {
    this.showMessage(message, 'warning');
  }

  showConfirmMessage(message: string): Observable<boolean> {
    return from(
      Swal.fire({
        html: message,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
      })
    ).pipe(switchMap((result: any) => of(!!result.value)));
  }

  private showMessage(message: string, type: string) {
    Swal.fire({
      html: message,
      icon: type
    });
  }
}
