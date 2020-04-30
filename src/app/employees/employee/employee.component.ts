import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatOption, MatSelectChange } from '@angular/material';
import { Router } from '@angular/router';
import { DocumentType, DOCUMENT_TYPES } from 'src/app/clients/shared/document-type';
import { messages } from 'src/app/general/messages';
import { TypeContract, TYPE_CONTRACTS } from 'src/app/general/shared/contractType';
import { Country } from 'src/app/general/shared/country';
import { CountryService } from 'src/app/general/shared/country.service';
import { Fecha } from 'src/app/general/shared/fecha';
import { State, STATES } from 'src/app/general/shared/state';
import { Person } from 'src/app/persons/shared/person';
import { PersonService } from 'src/app/persons/shared/person.service';
import { Rol } from 'src/app/users/shared/rol';
import { RolService } from 'src/app/users/shared/rol.service';
import { User } from 'src/app/users/shared/user';
import { UserService } from 'src/app/users/shared/user.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { EmployeeHotel } from '../shared/empleadoHotel';
import { Employee } from '../shared/employee';
import { EmployeeService } from '../shared/employee.service';
import { EmployeeHotelService } from '../shared/employeeHotel.service';

@Component({
  selector: 'ho-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  employedHotel: EmployeeHotel;
  employeeForm: FormGroup;
  personForm: FormGroup;
  tipoDocumento: DocumentType;
  documentTypes: DocumentType[];

  userForm: FormGroup;
  estados: State[];
  tiposContrato: TypeContract[];
  roles: Rol[];
  countries: Country[];
  filteredPersons: Person[];
  personID: string;
  userID: string;
  typeDocumentValue: string;
  personaSave: Person;
  usuarioSave: User;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private rolService: RolService,
    private countryService: CountryService,
    private personService: PersonService,
    private employeeService: EmployeeService,
    private userService: UserService,
    private employeeHotelService: EmployeeHotelService
  ) {}

  ngOnInit() {
    this.documentTypes = DOCUMENT_TYPES;
    this.estados = STATES;
    this.tiposContrato = TYPE_CONTRACTS;
    this.personForm = this.formBuilder.group({
      documentType: [null, Validators.required],
      document: [null, Validators.required],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      address: [null, Validators.required],
      email: [null, Validators.email],
      phone: [null, Validators.required],
      cellphone: [null, Validators.required],
      birthdate: [null, Validators.required],
      country: [null, Validators.required]
    });

    this.employeeForm = this.formBuilder.group({
      salary: [null, Validators.required],
      emailHotel: [null, Validators.email],
      state: [null, Validators.required],
      initDate: [null, Validators.required],
      endDate: [null, Validators.required],
      contractType: [null, Validators.required]
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
    this.filterPersons();
  }

  setEmpleado(): Employee {
    let empleadoForm: Employee = {
      contract: this.employeeForm.get('contractType').value,
      dependence: '',
      emailEmployee: this.employeeForm.get('emailHotel').value,
      hotelId: '',
      costCenter: '',
      personId: this.personID,
      position: '',
      userId: this.userID,
      uuid: '',
      responsable: '',
      state: this.employeeForm.get('state').value,
      salary: this.employeeForm.get('salary').value,
      initDate: Fecha.YYYYMMDD(new Date(this.employeeForm.get('initDate').value)),
      endDate: Fecha.YYYYMMDD(new Date(this.employeeForm.get('endDate').value))
    };

    return empleadoForm;
  }

  setUser(): User {
    let userForm: User = {
      user: this.userForm.get('user').value,
      password: this.userForm.get('clave').value,
      rol: this.userForm.get('rol').value,
      state: this.userForm.get('state').value,
      registrationDate: '',
      hotelId: '',
      personId: this.personID,
      uuid: ''
    };
    return userForm;
  }

  setPerson(): Person {
    let personaForm: Person = {
      document: this.personForm.get('document').value,
      documentType: this.personForm.get('documentType').value,
      country: {
        code: this.personForm.get('country').value.code,
        name: this.personForm.get('country').value.name,
        uuid: this.personForm.get('country').value.uuid
      },

      address: this.personForm.get('address').value,
      // birthdate: Fecha.YYYYMMDD(new Date(this.personForm.get('birthdate').value)),
      birthdate: new Date() + '',
      cellPhone: this.personForm.get('cellphone').value,
      email: this.personForm.get('email').value,
      lastName: this.personForm.get('lastName').value,
      firstName: this.personForm.get('firstName').value,
      uuid: this.personID,
      phone: this.personForm.get('phone').value
    };

    return personaForm;
  }

  guardar3() {
    this.employedHotel = {
      employee: this.setEmpleado(),
      user: this.setUser(),
      person: this.setPerson()
    };

    this.employeeHotelService.save(this.employedHotel).subscribe(
      (data) => {
        Swal.fire({
          text: messages.editUserError,
          icon: messages.error,
          width: messages.widthWindowMessage,
          dismissOnDestroy: false
        });
        this.router.navigate([`/app/employees/list`]);
      },
      (error) => {
        Swal.fire({
          text: messages.editUserError,
          icon: messages.error,
          width: messages.widthWindowMessage
        });
      }
    );
  }

  private filterPersons() {
    this.personForm.get('document').valueChanges.subscribe((personVal) => {
      if (personVal != '') {
        this.personService.findDocument(this.typeDocumentValue, personVal).subscribe((data) => {
          this.filteredPersons = data;

          console.log(this.filteredPersons.length);

          if (this.filteredPersons.length > 0 && personVal == this.filteredPersons[0].document) {
            this.filteredPersons[0].country.name;
            let indicie = 0;

            for (let i = 0; i < this.countries.length; i++) {
              if (this.countries[i].name == this.filteredPersons[0].country.name) {
                indicie = i;
              }
            }
            console.log(this.countries[indicie]);
            this.personForm.patchValue({
              firstName: [this.filteredPersons[0].firstName],
              lastName: [this.filteredPersons[0].lastName],
              address: [this.filteredPersons[0].address],
              email: [this.filteredPersons[0].email],
              phone: [this.filteredPersons[0].phone],
              cellphone: [this.filteredPersons[0].cellPhone],
              birthdate: [this.filteredPersons[0].birthdate],
              country: [this.countries[indicie]]
            });
            this.personID = this.filteredPersons[0].uuid;
          } else {
            this.personForm.patchValue({
              firstName: '',
              lastName: '',
              address: '',
              email: '',
              phone: '',
              cellphone: '',
              birthdate: '',
              country: ''
            });
            this.personID = null;
          }
        });
      }
    });
  }
  changeTypeDocument(event: MatSelectChange) {
    const selectedData = {
      text: (event.source.selected as MatOption).viewValue,
      value: event.source.value
    };
    this.typeDocumentValue = selectedData.value;
  }

  guardar() {
    let persona = this.setPerson();
    console.log(this.personID);
    if (persona != null && this.personID == null) {
      console.log(persona);
      this.personService.add(persona).subscribe(
        (data) => {
          this.personaSave = data;

          if (this.personaSave.uuid != null) {
            this.personID = this.personaSave.uuid;
            console.log('usuario>>>', this.setUser());
            this.userService.add(this.setUser()).subscribe(
              (data) => {
                try {
                  this.usuarioSave = data;

                  if (this.usuarioSave.uuid != null) {
                    this.userID = this.usuarioSave.uuid;
                    this.employeeService.save(this.setEmpleado()).subscribe(
                      (data) => {
                        let uiddEmpleado = data.uuid;
                        console.log('UIII>>>', uiddEmpleado);
                        if (uiddEmpleado != null) {
                          Swal.fire({
                            text: messages.addUserSuccess,
                            icon: messages.success,
                            width: messages.widthWindowMessage,
                            dismissOnDestroy: false
                          });
                          this.router.navigate([`/app/employees/list`]);
                        } else {
                          Swal.fire({
                            text: messages.addEmployeeError,
                            icon: messages.error,
                            width: messages.widthWindowMessage,
                            dismissOnDestroy: false
                          });
                        }
                      },
                      (error) => {
                        Swal.fire({
                          text: messages.addEmployeeError,
                          icon: messages.error,
                          width: messages.widthWindowMessage,
                          dismissOnDestroy: false
                        });
                      }
                    );
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
        this.userService.add(this.setUser()).subscribe(
          (data) => {
            this.usuarioSave = data;

            if (this.usuarioSave.uuid != null) {
              Swal.fire({
                text: messages.addUserSuccess,
                icon: messages.success,
                dismissOnDestroy: false
              });
              this.router.navigate([`/app/employees/list`]);
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
}
