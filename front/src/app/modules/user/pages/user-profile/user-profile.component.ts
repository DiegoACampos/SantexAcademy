import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  isMostrarBoton: boolean = false;
  
  nombre: string = 'Federico';
  apellido: string = "Gallo";
  nombreArchivo: string = "Sin archivo seleccionado";

  formularioContacto = new FormGroup({
    nombre: new FormControl('', [Validators.maxLength(15)]),
    apellido: new FormControl('', [Validators.maxLength(15)]),
  });

  constructor() { }

  ngOnInit(): void {
    this.formularioContacto.disable();
  }

  url="../../../../../assets/user.png";

  habilitar(){
    this.formularioContacto.enable();
    this.isMostrarBoton = true;
  
    this.nombreArchivo = "Sin archivo seleccionado";
  }

  enviar(){
    if (this.formularioContacto.valid){
      window.alert("Datos editados y guardados");
      this.isMostrarBoton = false;
      this.formularioContacto.disable();
    }
    else
      window.alert("Los datos no cumplen con la condicion");
  }
  
  seleccionarArchivo(e: any){
    if(e.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event:any)=>{
        this.url = event.target.result;
        this.nombreArchivo = e.target.files[0].name;
      };
    }
  }
}
