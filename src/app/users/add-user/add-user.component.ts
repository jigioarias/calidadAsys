import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatOption, MatSelectChange } from '@angular/material';
import { Router } from '@angular/router';
import { DocumentType, DOCUMENT_TYPES, NIT } from 'src/app/clients/shared/document-type';
import { messages } from 'src/app/general/messages';
import { Country } from 'src/app/general/shared/country';
import { CountryService } from 'src/app/general/shared/country.service';
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
  // public githubAutoComplete$: Observable<Person> = null;
  //public autoCompleteControl = new FormControl();
  //https://github.com/mainawycliffe/angular-material-autocomplete-with-http-service-demo/blob/master/src/app/services/github.service.ts
  //https://codinglatte.com/posts/angular/ng-material-autocomplete-http-lookup/
  rol: string;
  person: string;
  estados: State[];
  pais: string;
  typeDocumentValue: string;
  personID: string;

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

  filteredPersons: Person[];

  constructor(
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private rolService: RolService,
    private personService: PersonService,
    private countryService: CountryService
  ) {}

  ngOnInit() {
    this.personForm = this.formBuilder.group({
      documentType: [null, Validators.required],
      document: [null, Validators.required],
      firstName: [null, Validators.required],
      lastName: [null],
      email: [null, Validators.email],
      //  phone: [null, Validators.required],
      cellphone: [null, Validators.required],
      // birthdate: [null, Validators.required],
      country: [null, Validators.required]
    });

    this.estados = STATES;
    this.documentTypes = DOCUMENT_TYPES;

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

    this.filterPersons();
  }

  setUser(personaId: string): User {
    if (this.isValidateUser()) {
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
    } else {
      return null;
    }
  }

  setPerson(): Person {
    if (this.isValidatePerson()) {
      let personaForm: Person = {
        document: this.personForm.get('document').value,
        documentType: this.personForm.get('documentType').value,
        country: {
          code: '',
          name: this.pais,
          uuid: this.personForm.get('country').value
        },

        cellPhone: this.personForm.get('cellphone').value,
        email: this.personForm.get('email').value,
        lastName: this.personForm.get('lastName').value,
        firstName: this.personForm.get('firstName').value,
        uuid: ''
      };
      return personaForm;
    } else {
      return null;
    }
  }

  isValidatePerson(): boolean {
    if (
      this.personForm.get('document').value == null ||
      this.personForm.get('documentType').value == null ||
      this.personForm.get('country').value == null ||
      this.personForm.get('cellphone').value == null ||
      this.personForm.get('email').value == null ||
      this.personForm.get('firstName').value == null
    ) {
      return false;
    }
    //validar segundo apellido para NIT
    if (
      this.personForm.get('lastName').value == !null &&
      this.personForm.get('documentType').value != null &&
      this.personForm.get('documentType').value == NIT.code
    ) {
      return false;
    }

    return true;
  }

  isValidateUser(): boolean {
    if (
      this.userForm.get('user').value == null ||
      this.userForm.get('clave').value == null ||
      this.userForm.get('rol').value == null ||
      this.userForm.get('state').value == null
    ) {
      return false;
    }

    return true;
  }

  guardar() {
    let persona = this.setPerson();

    if (persona != null && this.personID == null) {
      this.personService.add(persona).subscribe(
        (data) => {
          this.personaSave = data;

          if (this.personaSave.uuid != null) {
            this.userService.add(this.setUser(this.personaSave.uuid)).subscribe(
              (data) => {
                try {
                  this.usuarioSave = data;

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
                        text: messages.addUserError + ' : ' + error,
                        icon: messages.error
                      });
                    },
                    (error) => {
                      Swal.fire({
                        text: messages.deletePersonError + ' : ' + error,
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
    } else {
      let user = this.setPerson();
      if (user != null) {
        this.userService.add(this.setUser(this.personID)).subscribe(
          (data) => {
            this.usuarioSave = data;

            if (this.usuarioSave.uuid != null) {
              Swal.fire({
                text: messages.addUserSuccess,
                icon: messages.success,
                dismissOnDestroy: false
              });
              this.router.navigate([`/app/users/list`]);
            }
          },
          (error) => {
            Swal.fire({
              text: messages.addUserError + ': ' + error,
              icon: messages.error
            });
          }
        );
      } else {
        Swal.fire({
          text: messages.addUserError + ': ' + messages.emptydDataForm,
          icon: messages.error
        });
      }
    }
  }

  changeCountry(event: MatSelectChange) {
    const selectedData = {
      text: (event.source.selected as MatOption).viewValue,
      value: event.source.value
    };
    this.pais = selectedData.text;
  }

  changeTypeDocument(event: MatSelectChange) {
    const selectedData = {
      text: (event.source.selected as MatOption).viewValue,
      value: event.source.value
    };
    this.typeDocumentValue = selectedData.value;
  }

  private filterPersons() {
    this.personForm.get('document').valueChanges.subscribe((personVal) => {
      this.personService.findDocument(this.typeDocumentValue, personVal).subscribe((data) => {
        this.filteredPersons = data;
        if (this.filteredPersons.length > 0) {
          this.personForm.patchValue({
            firstName: this.filteredPersons[0].firstName,
            lastName: this.filteredPersons[0].lastName,
            email: this.filteredPersons[0].email,
            cellphone: this.filteredPersons[0].cellPhone,
            country: this.filteredPersons[0].country.name
          });
          this.personID = this.filteredPersons[0].uuid;
        } else {
          this.personForm.patchValue({
            firstName: '',
            lastName: '',
            email: '',
            cellphone: '',
            country: ''
          });
          this.personID = null;
        }
      });
    });
  }
}
