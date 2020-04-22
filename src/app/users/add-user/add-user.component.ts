import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DocumentType, DOCUMENT_TYPES } from 'src/app/clients/shared/document-type';
import { messages } from 'src/app/general/messages';
import { Country } from 'src/app/general/shared/country';
import { CountryService } from 'src/app/general/shared/country.service';
import { Fecha } from 'src/app/general/shared/fecha';
import { State, STATES } from 'src/app/general/shared/state';
import { Person } from 'src/app/persons/shared/person';
import { PersonService } from 'src/app/persons/shared/person.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
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
  estados: State[];

  estado: string;
  usuario: User;
  userForm: FormGroup;
  personForm: FormGroup;
  tipoDocumento: DocumentType;
  documentTypes: DocumentType[];
  countries: Country[];
  personaSave: Person;
  usuarioSave: User;

  roles: Rol[];
  persons: Person[];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private rolService: RolService,
    private personService: PersonService,
    private countryService: CountryService
  ) {}

  ngOnInit() {
    this.estados = STATES;
    this.documentTypes = DOCUMENT_TYPES;

    this.personForm = this.formBuilder.group({
      documentType: [null, Validators.required],
      document: [null, Validators.required],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      address: [null, Validators.required],
      email: [null, Validators.required],
      phone: [null, Validators.required],
      cellphone: [null, Validators.required],
      birthdate: [null, Validators.required],
      country: [null, Validators.required]
    });

    this.userForm = this.formBuilder.group({
      user: [null, Validators.required],
      clave: [null, Validators.required],
      rol: [null, Validators.required],
      state: [null, Validators.required]
    });

    this.rolService.list().subscribe((data) => {
      this.roles = data;
    });
    this.countryService.list().subscribe((data) => {
      this.countries = data;
    });
  }

  setUser(personaId: string): User {
    let userForm: User = {
      user: this.userForm.get('user').value,
      password: this.userForm.get('clave').value,
      rol: this.userForm.get('rol').value,
      state: this.userForm.get('state').value,
      registrationDate: '',
      hotelId: '',
      personId: personaId,
      uuid: '1'
    };
    return userForm;
  }

  setPerson(): Person {
    let personaForm: Person = {
      document: this.personForm.get('document').value,
      documentType: 'CC',
      country: {
        code: '',
        name: '',
        uuid: this.personForm.get('country').value
      },

      address: this.personForm.get('address').value,
      birthdate: Fecha.YYYYMMDD(new Date(this.personForm.get('birthdate').value)),
      cellPhone: this.personForm.get('cellphone').value,
      email: this.personForm.get('email').value,
      lastName: this.personForm.get('lastName').value,
      firstName: this.personForm.get('firstName').value,
      uuid: '',
      phone: this.personForm.get('phone').value
    };

    return personaForm;
  }

  guardar() {
    let persona = this.setPerson();
    this.personService.add(this.setPerson()).subscribe(
      (data) => {
        this.personaSave = data;

        console.log(this.personaSave);
        if (this.personaSave.uuid != null) {
          this.userService.add(this.setUser(this.personaSave.uuid)).subscribe(
            (data) => {
              try {
                this.usuarioSave = data;
                console.log('data', data);
                if (this.usuarioSave.uuid != null) {
                  Swal.fire({
                    text: messages.addUserSuccess,
                    icon: messages.success,
                    dismissOnDestroy: false
                  });
                  this.router.navigate([`/app/users/list`]);
                }
              } catch (error) {
                this.personService.delete(this.personaSave).subscribe(
                  (data) => {
                    Swal.fire({
                      text: messages.addUserError + ': ' + error,
                      icon: messages.error
                    });
                  },
                  (error) => {
                    Swal.fire({
                      text: messages.deletePersonError + ': ' + error,
                      icon: messages.error
                    });
                  }
                );
              }
            },
            (err) => {
              this.personService.delete(this.personaSave).subscribe(
                (data) => {
                  Swal.fire({
                    text: messages.addUserError + err,
                    icon: messages.error
                  });
                },
                (error) => {
                  Swal.fire({
                    text: messages.deletePersonError + ': ' + error,
                    icon: messages.error
                  });
                }
              );
            }
          );
        }
      },
      (err) => {
        Swal.fire({
          text: messages.addUserError + ': ' + err,
          icon: messages.error
        });
      }
    );
  }
}
