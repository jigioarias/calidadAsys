import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DocumentType, DOCUMENT_TYPES } from 'src/app/clients/shared/document-type';
import { messages } from 'src/app/general/messages';
import { TypeContract, TYPE_CONTRACTS } from 'src/app/general/shared/contractType';
import { Country } from 'src/app/general/shared/country';
import { CountryService } from 'src/app/general/shared/country.service';
import { Fecha } from 'src/app/general/shared/fecha';
import { State, STATES } from 'src/app/general/shared/state';
import { Person } from 'src/app/persons/shared/person';
import { Rol } from 'src/app/users/shared/rol';
import { RolService } from 'src/app/users/shared/rol.service';
import { User } from 'src/app/users/shared/user';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { EmployeeHotel } from '../shared/empleadoHotel';
import { Employee } from '../shared/employee';
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

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private rolService: RolService,
    private countryService: CountryService,
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
  }

  setEmpleado(): Employee {
    let empleadoForm: Employee = {
      contract: this.employeeForm.get('contractType').value,
      dependence: '',
      emailEmployee: this.employeeForm.get('emailHotel').value,
      hotelId: '',
      costCenter: '',
      personId: '0',
      position: '',
      userId: '',
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
      personId: '',
      uuid: '1'
    };
    return userForm;
  }

  setPerson(): Person {
    let personaForm: Person = {
      document: this.personForm.get('document').value,
      documentType: this.personForm.get('documentType').value,
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
}
