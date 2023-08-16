import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/core/services/user/login.service';
import { User } from 'src/app/core/interfaces/user-interface';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  userLogin:boolean = false; //para saber si el usuario esta o no logueado, mejor nombre de variable?
  userData?:any = {name: "ejemploNombre"}
  userProfile:any;
  authToken: string = "";

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.currentUserLogin.subscribe({
      next: (logedIn) => {
        this.userLogin = logedIn;
      }
    })

    this.loginService.currentUserData.subscribe({
      next: (loguedUserData) => {
        this.userData = loguedUserData;
        this.authToken = loguedUserData.accessToken;
      }
    })
  }

  logOut() {
    this.userLogin = !this.userLogin;
  }

  toProfile() {
    console.log("profile in nav component")
    this.loginService.profile(this.authToken).subscribe({
      next: (profileResponse) => {
        console.log(profileResponse)
      }
    })
  }

}
