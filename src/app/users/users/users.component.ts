import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { User } from '../shared/user';


const ELEMENT_DATA: User[] = [

];



@Component({
  selector: 'ho-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})


export class UsersComponent implements OnInit {


  displayedColumns: string[] = ['usuario', 'clave', 'estado'];
  dataSource = ELEMENT_DATA;
  usuarios: User[] = [];

  constructor(private router: Router) {

  }

  ngOnInit() {
  }

  deleteUser(user: User): void {

    this.usuarios = this.usuarios.filter(u => u !== user);

  };

  editUser(user: User): void {

    this.router.navigate(['edit-user']);
  };

  addUser(): void {
    this.router.navigate(['add-user']);
  };

}
