import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/http/api.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';

type Usuario = {
  id: Int16Array,
  nombre: string,
  apellido: string,
  email: string,
  rol: Int16Array,
  token: string
}

type LoginReq = {
  name: string,
  password: string,
}

type LoginRes = {
  token: string,
  status: Int16Array,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserLogin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<any> = new BehaviorSubject<any>({});

  constructor(
    private http: HttpClient,
    private router: Router,
    private apiService: ApiService
  ) { }

  usuario_logueado?: Usuario;

  data!: LoginReq;

	login(dataReq: LoginReq) {
    return this.apiService.post<any>('/api/user/login', dataReq).pipe(
      tap((userLoginData) => {
        this.currentUserData.next(userLoginData.user);
        this.currentUserLogin.next(true);
      })
    )
  }





  get userData():Observable<any>{
    return this.currentUserData.asObservable();
  }

  get userLogin():Observable<any>{
    return this.currentUserLogin.asObservable();
  }
}
