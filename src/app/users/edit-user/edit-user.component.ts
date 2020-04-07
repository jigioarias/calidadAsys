import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Estado } from '../shared/estado';
import { Rol } from '../shared/rol';
import { RolService } from '../shared/rol.service';
import { User } from '../shared/user';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'ho-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  id: string;
  updated: boolean;
  rol: string;
  estado: string;
  usuario: User;
  addForm: FormGroup;

  estados: Estado[] = [
    { valor: '1', nombre: 'Activo' },
    { valor: '0', nombre: 'Inactivo' },
  ];

  roles: Rol[];

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private rolService: RolService
  ) {}

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      user: [null, Validators.required],
      clave: [null, Validators.required],
      rol: [null, Validators.required],
      estado: [null, Validators.required],
    });

    this.rolService.list().subscribe((data) => {
      this.roles = data;
    });

    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.userService.find(this.id).subscribe((data) => {
      console.log(data);
      this.usuario = data;
    });
  }

  onSave() {
    this.userService.edit(this.usuario);
    Swal.fire({
      text: 'El usuario fue actualizado con éxito!',
      icon: 'success',
    });
  }
}
