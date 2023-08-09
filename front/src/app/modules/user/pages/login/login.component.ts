import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, FormControl, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { Router } from '@angular/router';

type Usuario = {
  id: Int16Array,
  nombre: string,
  apellido: string,
  email: string,
  rol: Int16Array,
  token: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false,
})
export class LoginComponent implements OnInit{

  nameField = new FormControl('', [Validators.required, Validators.maxLength(10),]);
  //emailField = new FormControl('email');
  phoneField = new FormControl('phone');
  dateField = new FormControl('');
  colorField = new FormControl('#000');
  ageField = new FormControl('1');
  rangeField = new FormControl('');
  agreeField = new FormControl('');
  genderField = new FormControl('');
  tagsField = new FormControl('');

  formLogin: UntypedFormGroup;

  constructor(
    private uFormBuilder: UntypedFormBuilder,
    //private http: HttpClient,
    private router: Router,
    ) {
    this.formLogin = this.uFormBuilder.group({
      correoElectronico: ['',[Validators.required, Validators.email,]],
      contraseña: ['',[Validators.required, Validators.minLength(8),]],
    })
   }

   ngOnInit(): void {
     this.nameField.valueChanges.subscribe(value =>{
      console.log(value)
     })
   }

   usuario_logueado?: Usuario;

  //  conectarBackend() {
  //   this.http.get<any>('localhost:3000/user/info').subscribe((data: Usuario) => {
  //     console.log(data);
  //     this.usuario_logueado = data;
  //   });
  //  }

  //  login(){
  //   if(this.form.valid){
  //     console.log("usar service para consultar al endpoint, los datos estaran en this.form.value");
  //     //this.router.navigateByUrl('/home')
  //   }else{
  //     this.form.markAllAsTouched();
  //     console.log("error al ingresar los datos");
  //     alert("campos obligatorios sin ingresar")
  //   }
  //  }
  getNameValue(){
    console.log("se ejecuto funcion del boton:\n");
    //console.log(this.form.get('nameField'))
  }

  saveForm(event: any) {
    if(this.formLogin.valid){
      console.log("se ejecuto evento submit")
      console.log(this.formLogin.value)
    }else{
      this.formLogin.markAllAsTouched();
    }
  }

  // get nameField():any{
  //   return this.formLogin.get('nameField')
  // }

  get emailField(){
    return this.formLogin.get('correoElectronico');
  }

  get passwordField(){
    return this.formLogin.get('contraseña');
  }

  get isNameFieldValid() {
    return this.nameField?.touched && this.nameField.valid;
  }

  get isNameFieldInvalid() {
    return this.nameField?.touched && this.nameField.invalid;
  }
}
