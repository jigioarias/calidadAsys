import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Estado } from 'src/app/users/shared/estado';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Item } from '../../shared/item';
import { ItemService } from '../../shared/item.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.scss']
})
export class AddItemsComponent implements OnInit {
  item: Item;
  submitted: boolean;
  addFormItem: FormGroup;
  estados: Estado[] = [
    { valor: '1', nombre: 'Activo' },
    { valor: '0', nombre: 'Inactivo' }
  ];

  constructor(private formBuilder: FormBuilder, private itemService: ItemService) {}

  ngOnInit() {
    this.addFormItem = this.formBuilder.group({
      description: [null, Validators.required],
      quantity: [null, Validators.required],
      stock: [null, Validators.required],
      active: [null, Validators.required],
      name: [null, Validators.required],
      price: [null, Validators.required]
    });
  }

  onSubmit() {
    const cf: Item = {
      price: this.addFormItem.get('price').value,
      stock: this.addFormItem.get('stock').value,
      description: this.addFormItem.get('description').value,
      quantity: this.addFormItem.get('quantity').value,
      active: this.addFormItem.get('active').value,
      name: this.addFormItem.get('name').value,
      hotelId: '',
      uuid: '0'
    };
    console.log(cf);
    this.itemService.add(cf);
    Swal.fire({
      text: 'El item fue guardado con éxito!',
      icon: 'success'
    });
  }
}
