import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  baseurl: string = 'http://localhost:8080/';

  public signIn(user) {
    this.http.post(`${this.baseurl}login`, user).subscribe(res => {
      console.log(res);
      if (res['token']) {
        localStorage.setItem('ACCESS_TOKEN', res['token'])
      }
    })
  }

  public isLoggedIn(){
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }

  public logout(){
    localStorage.removeItem('ACCESS_TOKEN');
  }
}
