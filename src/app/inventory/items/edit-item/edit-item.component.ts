import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private itemService: ItemService) {}

  ngOnInit() {
    this.estados = STATES;

    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.itemService.find(this.id).subscribe((data) => {
      this.item = data;
      this.editFormItem = this.formBuilder.group({
        description: [this.item.description, Validators.required],
        quantity: [this.item.quantity, Validators.required],
        stock: [this.item.stock, Validators.required],
        active: [this.item.state, Validators.required],
        name: [this.item.name, Validators.required],
        price: [this.item.price, Validators.required]
      });
    });
  }

  onSave() {
    this.itemService.edit(this.item).subscribe(
      (data) => {
        this.item = data;

        Swal.fire({
          text: messages.editItemSuccess,
          icon: messages.success,
          width: messages.widthWindowMessage
        });
      },
      (error) => {
        Swal.fire({
          text: messages.editItemError + ' : ' + error,
          icon: messages.error,
          width: messages.widthWindowMessage
        });
      }
    );
  }
}
