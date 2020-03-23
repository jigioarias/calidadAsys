import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from '../shared/item';
import { ItemService } from '../shared/item.service';

const ELEMENT_DATA: Item[] = [];

@Component({
  selector: 'ho-users-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'quantity', 'price', 'stock', 'edit'];
  dataSource = ELEMENT_DATA;
  constructor(private router: Router, private itemService: ItemService) {}

  ngOnInit() {
    this.itemService.list().subscribe(data => {
      console.log(data);
      this.dataSource = data;
    });
  }

  editar(id: string) {
    console.log(`/edit/${id}`);
    console.log(this.router.url);
    this.router.navigate([`/app/items/edit/${id}`]);
  }
}
