import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { messages } from 'src/app/general/messages';
import { State, STATES } from 'src/app/general/shared/state';
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
  estados: State[];

  constructor(private router: Router, private formBuilder: FormBuilder, private itemService: ItemService) {}

  ngOnInit() {
    this.estados = STATES;

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
    if (!this.addFormItem.valid) {
      return;
    }

    const cf: Item = {
      price: this.addFormItem.get('price').value,
      stock: this.addFormItem.get('stock').value,
      description: this.addFormItem.get('description').value,
      quantity: this.addFormItem.get('quantity').value,
      state: this.addFormItem.get('active').value,
      name: this.addFormItem.get('name').value,
      hotelId: '',
      uuid: '0'
    };

    this.itemService.add(cf).subscribe(
      (data) => {
        Swal.fire({
          text: messages.editItemSuccess,
          icon: messages.success,
          width: messages.widthWindowMessage,
          dismissOnDestroy: false
        });
        this.router.navigate([`/app/items/list`]);
      },
      (err) => {
        Swal.fire({
          text: messages.editItemError + ' : ' + err,
          icon: messages.error,
          width: messages.widthWindowMessage
        });
      }
    );
  }
}
