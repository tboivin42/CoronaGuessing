import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  infected: any;
  position: any;
  
  constructor(public apiService: ApiService, private router: Router, public authService: AuthService ) { }


  ngOnInit() {
    this.getAllInfected();
  }

  getAllInfected() {
    this.apiService.getAllInfected().subscribe(data => {
      this.infected = data;
      this.getMap(data)
    })
  }

  getMap(data: any) {
    this.apiService.getMap(data)
  }
}
