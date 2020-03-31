import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Person } from 'src/app/persons/shared/person';
import { PersonService } from 'src/app/persons/shared/person.service';
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
  person: string;
  estado: string;
  usuario: User;
  addForm: FormGroup;
  submitted: boolean;

  estados: Estado[] = [
    { valor: '1', nombre: 'Activo' },
    { valor: '0', nombre: 'Inactivo' }
  ];

  roles: Rol[];
  persons: Person[];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private rolService: RolService,
    private personService: PersonService
  ) {}

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      user: [null, Validators.required],
      clave: [null, Validators.required],
      rol: [null, Validators.required],
      estado: [null, Validators.required],
      person: [null, Validators.required]
    });

    this.rolService.list().subscribe(data => {
      this.roles = data;
    });

    this.personService.list('EMPLOYEE').subscribe(data => {
      this.persons = data;
    });
  }

  onSubmit() {
    const cf: User = {
      user: this.addForm.get('user').value,
      password: this.addForm.get('clave').value,
      rol: this.addForm.get('rol').value,
      state: this.addForm.get('estado').value,
      registrationDate: '',
      hotelId: '',
      personId: this.addForm.get('person').value,
      uuid: '1'
    };
    this.userService.add(cf);
    this.submitted = true;
  }
}
