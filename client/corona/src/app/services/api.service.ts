import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InfectedModel } from './InfectedModel'

import * as L from 'leaflet';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  latitude: any;
  longitude: any;
  token = localStorage.getItem('ACCESS_TOKEN');

  baseurl: string = 'http://localhost:8080/';

  updatePosition() {
    navigator.geolocation.getCurrentPosition(pos => {
      const crd = pos.coords;
      const headers =  new HttpHeaders()
        .set("content-Type", "application/json")

      const decoded = jwt_decode(this.token);

      this.http.put(`${this.baseurl}user/${decoded.sub}`, {
        "latitude": crd.latitude,
        "longitude": crd.longitude
      }, {headers})
      .subscribe(
        val => console.log('PUT call successful value returned in body', val)
      ),
        res => console.log('PUT call in error', res),
        () => console.log('The PUT observable in now completed')
    });
  }

  updateUser(user) {
    const decoded = jwt_decode(this.token)
    
    console.log(user)
    this.http.put(`${this.baseurl}user/${decoded.sub}`, user).subscribe(data => console.log('PUT call successeful'))
  }

  getAllInfected() {
    return this.http.get<InfectedModel[]>(`${this.baseurl}users`);
  }

  getMap(data) {
    const myfrugalmap = L.map('frugalmap').setView([50.6311634, 3.0599573], 12);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
   attribution: 'Frugal Map'
    }).addTo(myfrugalmap);

    data.map((v) => {
      L.marker([v.latitude, v.longitude]).bindPopup(v.message || 'Infécté').addTo(myfrugalmap).openPopup();
    })
  }

  deleteUser() {
    const decoded = jwt_decode(this.token);

    this.http.delete(`${this.baseurl}user/${decoded.sub}`).subscribe((data) =>
      localStorage.removeItem('ACCESS_TOKEN')
    )
  }
}
