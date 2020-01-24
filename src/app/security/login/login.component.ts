import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Hotel } from 'src/app/general/shared/hotel';
import { AuthenticationService } from '../shared/authentication.service';

@Component({
  selector: 'ho-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: string;
  hotels: Hotel[];

  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService, private router: Router) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      user: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  login() {
    const user = this.loginForm.get('user').value;
    const pass = this.loginForm.get('password').value;
    this.authenticationService.login2(user, pass).subscribe(userCredential => {
      console.log('puede acceder', userCredential);
      if (userCredential.hotel) {
        if (userCredential.hotel && userCredential.hotel.length) {
          if (userCredential.hotel.length > 1) {
            this.hotels = userCredential.hotel;
            return;
          }
        }
        this.router.navigateByUrl('/home');
      } else {
        this.error = 'El usuario no esta asignado a ningún hotel.';
      }
    });
  }
}
