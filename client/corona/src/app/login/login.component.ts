import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router } from  '@angular/router';
import { User } from  '../user';
import { ApiService } from  '../services/api.service';
import { AuthService } from  '../services/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthService, private formBuilder: FormBuilder) { }

  loginForm: FormGroup;
  isRegistered = false;
  isSubmitted  =  false;

  ngOnInit() {
    this.loginForm  =  this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  invalidEmail() {
  	return (this.isSubmitted && this.loginForm.controls.email.errors != null);
  }

  invalidPassword() {
  	return (this.isSubmitted && this.loginForm.controls.password.errors != null);
  }

  get formControls() { return this.loginForm.controls; }

  signIn() {
    this.authService.signIn(this.loginForm.value)
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.loginForm.invalid == true) {
      return ;
    }
    this.isRegistered = true;
  }

}
