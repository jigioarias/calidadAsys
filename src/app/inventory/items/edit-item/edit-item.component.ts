import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { messages } from 'src/app/general/messages';
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
  editFormItem: FormGroup;
  estados: Estado[] = [
    { valor: '1', nombre: 'Activo' },
    { valor: '0', nombre: 'Inactivo' }
  ];
  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private itemService: ItemService) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.itemService.find(this.id).subscribe((data) => {
      this.item = data;
      this.editFormItem = this.formBuilder.group({
        description: [this.item.description, Validators.required],
        quantity: [this.item.quantity, Validators.required],
        stock: [this.item.stock, Validators.required],
        active: [this.item.active, Validators.required],
        name: [this.item.name, Validators.required],
        price: [this.item.price, Validators.required]
      });
    });
  }

  instanceOfItem(object: any): object is Item {
    return object.discriminator === 'object';
  }

  onSave() {
    try {
      this.itemService.edit(this.item).subscribe((data) => {
        console.log('daattaaa:::' + data);
        if (this.instanceOfItem(data)) {
          this.item = data;

          Swal.fire({
            text: messages.editItemSuccess,
            icon: messages.success,
            width: messages.widthWindowMessage
          });
        } else {
          Swal.fire({
            text: messages.editItemError,
            icon: messages.error,
            width: messages.widthWindowMessage
          });
        }
      });
    } catch (error) {}
  }
}
