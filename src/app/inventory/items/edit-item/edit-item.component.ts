import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { messages } from 'src/app/general/messages';
import { State, STATES } from 'src/app/general/shared/state';
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
  estados: State[];

  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private itemService: ItemService) {}

  ngOnInit() {
    this.editFormItem = this.formBuilder.group({
      description: [null, Validators.required],
      quantity: [null, Validators.required],
      stock: [0, Validators.required],
      active: [null, Validators.required],
      name: [null, Validators.required],
      price: [0, Validators.required]
    });

    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.itemService.find(this.id).subscribe((data) => {
      this.item = data;
      this.editFormItem.reset();
      let indice = 0;
      this.estados = STATES;
      console.log(this.item.state);
      for (let i = 0; i < this.estados.length; i++) {
        if (Number(this.estados[i].code) == this.item.state) {
          indice = i;
        }
      }
      console.log(indice);
      this.editFormItem = this.formBuilder.group({
        description: [this.item.description, Validators.required],
        quantity: [this.item.quantity],
        stock: [this.item.stock, Validators.required],
        active: [this.estados[indice], Validators.required],
        name: [this.item.name, Validators.required],
        price: [this.item.price, Validators.required]
      });
    });
  }

  seItem(): Item {
    if (this.isValidateItem()) {
      console.log(this.editFormItem.get('active').value.code);
      let addForm: Item = {
        state: Number(this.editFormItem.get('active').value.code),
        description: this.editFormItem.get('description').value,
        hotelId: this.item.hotelId,
        price: this.editFormItem.get('price').value,
        quantity: this.editFormItem.get('quantity').value,
        stock: this.editFormItem.get('stock').value,
        uuid: this.item.uuid,
        name: this.editFormItem.get('name').value
      };
      return addForm;
    } else {
      return null;
    }
  }

  isValidateItem(): boolean {
    if (
      this.editFormItem.get('active').value == null ||
      this.editFormItem.get('description').value == null ||
      this.editFormItem.get('price').value == null ||
      this.editFormItem.get('quantity').value == null ||
      this.editFormItem.get('stock').value == null ||
      this.editFormItem.get('name').value == null
    ) {
      return false;
    }

    return true;
  }

  onSave() {
    let itemEdit = this.seItem();
    if (itemEdit != null) {
      console.log(itemEdit);

      this.itemService.edit(itemEdit).subscribe(
        (data) => {
          this.item = data;

          Swal.fire({
            text: messages.editItemSuccess,
            icon: messages.success,
            width: messages.widthWindowMessage,
            dismissOnDestroy: false
          });
          this.router.navigate([`/app/items/list`]);
        },
        (error) => {
          Swal.fire({
            text: messages.editItemError + ' : ' + error,
            icon: messages.error,
            width: messages.widthWindowMessage
          });
        }
      );
    } else {
      Swal.fire({
        text: messages.emptydDataForm,
        icon: messages.error,
        width: messages.widthWindowMessage
      });
    }
  }
}
