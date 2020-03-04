import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service'
import { ApiService } from './services/api.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  constructor(public apiService: ApiService, public auth: AuthService) {}

  ngOnInit() {}
}
