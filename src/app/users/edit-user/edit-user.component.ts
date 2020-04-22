import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { messages } from 'src/app/general/messages';
import { State, STATES } from 'src/app/general/shared/state';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Rol } from '../shared/rol';
import { RolService } from '../shared/rol.service';
import { User } from '../shared/user';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'ho-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  id: string;
  updated: boolean;
  rol: string;
  estado: string;
  usuario: User;
  addForm: FormGroup;

  estados: State[];

  roles: Rol[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private rolService: RolService
  ) {
    this.addForm = this.formBuilder.group({
      clave: [null, Validators.required],
      usuario: [null, Validators.required],
      rol: [null, Validators.required],
      estado: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.estados = STATES;

    this.rolService.list().subscribe((data) => {
      this.roles = data;
    });

    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.userService.find(this.id).subscribe((data) => {
      this.usuario = data;
      this.addForm = this.formBuilder.group({
        clave: [this.usuario.password, Validators.required],
        usuario: [this.usuario.user, Validators.required],
        rol: [this.usuario.rol],
        estado: [this.usuario.state]
      });
    });
  }

  instanceOfUser(object: any): object is User {
    return object.discriminator === 'object';
  }

  onSave() {
    try {
      this.userService.edit(this.usuario).subscribe((data) => {
        if (this.instanceOfUser(data)) {
          this.usuario = data;

          Swal.fire({
            text: messages.editUserSuccess,
            icon: messages.success,
            width: messages.widthWindowMessage
          });
        } else {
          Swal.fire({
            text: messages.editUserError,
            icon: messages.error,
            width: messages.widthWindowMessage
          });
        }
      });
    } catch (error) {}
  }
  getUsuario() {
    return this.addForm.get('usuario');
  }
  cancel() {
    this.router.navigate([`..users/list`]);
  }
}
