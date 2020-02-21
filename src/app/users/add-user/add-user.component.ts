import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Estado } from '../shared/estado';
import { Rol } from '../shared/rol';
import { RolService } from '../shared/rol.service';
import { User } from '../shared/user';
import { UserService } from '../shared/user.service';



@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})


export class AddUserComponent implements OnInit {

  rol: string;
  estado: string;
  usuario: User;
  addForm: FormGroup;

  estados: Estado[] = [
    { valor: '1', nombre: 'Activo' },
    { valor: '0', nombre: 'Inactivo' },

  ];

  roles: Rol[];

  constructor(private formBuilder: FormBuilder, private userService: UserService, private rolService: RolService) {

  }



  ngOnInit() {
    this.addForm = this.formBuilder.group({
      user: [null, Validators.required],
      clave: [null, Validators.required],
      rol: [null, Validators.required],
      estado: [null, Validators.required]

    });

    this.rolService.list().subscribe(
      data => {
        console.log('rolesss:::>>>>>', data)
        this.roles = data
      }
    );


  }

  onSubmit() {
    const cf: User = {
      user: this.addForm.get('user').value,
      password: this.addForm.get('clave').value,
      rol: this.addForm.get('rol').value,
      state: this.addForm.get('estado').value,
      registrationDate: '',
      hotelId: '',
      personId: '0',
      uuid: '1'

    };
    console.log(cf)
    this.userService.add(cf);


  }

}