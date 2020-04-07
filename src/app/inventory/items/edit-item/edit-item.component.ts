import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Estado } from 'src/app/users/shared/estado';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Item } from '../../shared/item';
import { ItemService } from '../../shared/item.service';

@Component({
  selector: 'ho-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit {
  id: string;
  item: Item;
  updated: boolean;
  addFormItem: FormGroup;
  estados: Estado[] = [
    { valor: '1', nombre: 'Activo' },
    { valor: '0', nombre: 'Inactivo' }
  ];
  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private itemService: ItemService) {}

  ngOnInit() {
    this.addFormItem = this.formBuilder.group({
      description: [null, Validators.required],
      quantity: [null, Validators.required],
      stock: [null, Validators.required],
      active: [null, Validators.required],
      name: [null, Validators.required],
      price: [null, Validators.required]
    });

    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.itemService.find(this.id).subscribe((data) => {
      console.log(data);
      this.item = data;
    });

    console.log(this.item);
  }

  onSave() {
    this.itemService.edit(this.item);
    Swal.fire({
      text: 'El item fue actualizado con éxito!',
      icon: 'success'
    });
  }
}
