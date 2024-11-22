import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user="admin"
  password="admin"
  constructor() { }
  getPassword(){return this.password}
  getUser(){return this.user}
}
