import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoDocumento, TIPOS_DOCUMENTO } from '../shared/tipo-documento';

@Component({
  selector: 'ho-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  clientForm: FormGroup;
  tiposDocumento: TipoDocumento[];
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.clientForm = this.formBuilder.group({
      documento: [null, Validators.required],
      tipoDocumento: ['', Validators.required],
      nombreCompleto: ['', Validators.required],
      email: ['', Validators.required],
      fechaNacimiento: ['']
    });
    this.tiposDocumento = TIPOS_DOCUMENTO;
  }
}
