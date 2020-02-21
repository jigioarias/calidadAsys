import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { User } from '../shared/user';
import { UserService } from '../shared/user.service';


const ELEMENT_DATA: User[] = [

];

@Component({
  selector: 'ho-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {


  displayedColumns: string[] = ['user', 'password', 'state'];
  dataSource = ELEMENT_DATA;
  constructor(private router: Router, private userService: UserService) {

  }

  ngOnInit() {
    this.userService.list().subscribe(
      data => {
        console.log(data)
        this.dataSource = data
      }
    );



  }

}
