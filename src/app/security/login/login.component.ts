import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../shared/authentication.service';

@Component({
  selector: 'ho-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      user: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  login() {
    const user = this.loginForm.get('user').value;
    const pass = this.loginForm.get('password').value;
    this.authenticationService.login(user, pass);
  }
}
