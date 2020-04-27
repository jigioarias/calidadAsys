import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  indice = 0;
  indiceState = 0;

  estados: State[];

  public rolCtrl: FormControl = new FormControl();

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

    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.userService.find(this.id).subscribe((data) => {
      this.usuario = data;

      this.rolService.list().subscribe(
        (data) => {
          this.roles = data;
          for (let i = 0; i < this.roles.length; i++) {
            if (this.roles[i].name == this.usuario.rol) {
              this.indice = i;
            }
          }
        },
        (error) => {
          console.log('error listando los roles', error);
        },
        () => {
          for (let i = 0; i < this.estados.length; i++) {
            if (this.estados[i].code == this.usuario.state) {
              this.indiceState = i;
            }
          }

          this.addForm = this.formBuilder.group({
            clave: [this.usuario.password, Validators.required],
            usuario: [this.usuario.user, Validators.required],
            rol: [this.roles[this.indice]],
            estado: [this.estados[this.indiceState]]
          });
        }
      );
    });
  }

  //seteo de usuario
  setUser(): User {
    if (this.isValidateUser()) {
      let userForm: User = {
        user: this.addForm.get('usuario').value,
        password: this.addForm.get('clave').value,
        rol: this.addForm.get('rol').value.name,
        state: this.addForm.get('estado').value.code,
        registrationDate: '',
        hotelId: this.usuario.hotelId,
        personId: this.usuario.personId,
        uuid: this.usuario.uuid
      };
      return userForm;
    } else {
      return null;
    }
  }

  isValidateUser(): boolean {
    if (
      this.addForm.get('usuario').value == null ||
      this.addForm.get('clave').value == null ||
      this.addForm.get('rol').value == null ||
      this.addForm.get('estado').value == null
    ) {
      return false;
    }

    return true;
  }
  onSave() {
    let usuarioA = this.setUser();
    console.log('usuario sin actualizar es:', usuarioA);
    if (usuarioA != null) {
      this.userService.edit(usuarioA).subscribe(
        (data) => {
          this.usuario = data;
          Swal.fire({
            text: messages.editUserSuccess,
            icon: messages.success,
            width: messages.widthWindowMessage,
            dismissOnDestroy: false
          });
          this.router.navigate([`/app/users/list`]);
        },
        (error) => {
          Swal.fire({
            text: messages.editUserError + ' : ' + error,
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
  getUsuario() {
    return this.addForm.get('usuario');
  }
  cancel() {
    this.router.navigate([`/app/users/list`]);
  }
}
