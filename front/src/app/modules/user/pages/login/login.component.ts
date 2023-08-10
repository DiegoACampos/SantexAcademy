import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/http/api.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginService } from 'src/app/core/services/user/login.service';
import { LoginReq } from 'src/app/core/interfaces/login-request-interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false,
})
export class LoginComponent implements OnInit{

  currentUserLogin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<any> = new BehaviorSubject<any>({token:"", status:"", message:""});

  formLogin: UntypedFormGroup;

  constructor(
    private uFormBuilder: UntypedFormBuilder,
    private http: HttpClient,
    private router: Router,
    private apiService: ApiService,
    private loginService: LoginService
    ) {
    this.formLogin = this.uFormBuilder.group({
      name: ['',[Validators.required, Validators.email,]],
      password: ['',[Validators.required, Validators.minLength(8),]],
    })
  }

  ngOnInit(): void {
    this.formLogin.get('password')?.valueChanges.subscribe(value =>{
      console.log(value)
    })
  }

  data!: LoginReq;

  saveForm(event: any) {
    if(this.formLogin.valid){
      console.log("se ejecuto evento submit")
      console.log(this.formLogin.value)
      console.log("acontinuacion debe estar la peticion post");

      this.data = this.formLogin.value as LoginReq;

      this.loginService.login(this.data).subscribe({
        next: (userLoginData) => {
          console.log("user login data res: \n" + userLoginData.status)
          console.log(userLoginData.message);
          console.log(userLoginData);
        },
        error: (errorData) => {
          console.log(errorData);
        },
        complete: () => {
          console.log("peticion completada")
        }
      })

      console.log("console log despues de la peticion post")
      this.formLogin.reset();
      this.router.navigateByUrl('/home');
    }else{
      this.formLogin.markAllAsTouched();
    }
  }

  get userData():Observable<any>{
    return this.currentUserData.asObservable();
  }

  get userLogin():Observable<any>{
    return this.currentUserLogin.asObservable();
  }

  get emailField(){
    return this.formLogin.get('name');
  }

  get passwordField(){
    return this.formLogin.get('password');
  }

  // get isNameFieldValid() {
  //   return this.nameField?.touched && this.nameField.valid;
  // }
}
