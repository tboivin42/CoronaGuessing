import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  updateForm: FormGroup;
  isSubmitted: any;


  constructor(public authService: AuthService, private formBuilder: FormBuilder, private apiService: ApiService ) { }

  ngOnInit() {
    this.updateForm  =  this.formBuilder.group({
      login: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      message: ['', Validators.required]
    });
  }
  get formControls() { return this.updateForm.controls; }

  updateUser() {
    this.apiService.updateUser(this.updateForm.value)
  }

}
