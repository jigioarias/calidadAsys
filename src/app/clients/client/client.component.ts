import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from '../shared/client';
import { DocumentType, DOCUMENT_TYPES } from '../shared/document-type';

@Component({
  selector: 'ho-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  clientForm: FormGroup;
  documentTypes: DocumentType[];
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.clientForm = this.formBuilder.group({
      uuid: [null, Validators.required],
      documentType: [null, Validators.required],
      document: [null, Validators.required],
      name: [null, Validators.required],
      email: [null, Validators.required, Validators.email],
      bithdate: [null, Validators.required],
      phone: [null, Validators.required]
    });
    this.documentTypes = DOCUMENT_TYPES;
  }

  guardar() {
    const cf: Client = {
      uuid: this.clientForm.get('uuid').value,
      documentType: this.clientForm.get('documentType').value,
      document: this.clientForm.get('document').value,
      name: this.clientForm.get('name').value,
      email: this.clientForm.get('email').value,
      bithdate: this.clientForm.get('bithdate').value,
      phone: this.clientForm.get('phone').value
    };
    console.log('guardar cliente', cf);
  }
}
