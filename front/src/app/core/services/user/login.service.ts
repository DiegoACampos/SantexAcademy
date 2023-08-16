import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/http/api.service';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import handleError from '../../exceptions/errors-handler';
import { User } from '../../interfaces/user-interface';
import { TokenService } from './token.service';


type LoginReq = {
  email: string,
  password: string,
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserLogin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<any> = new BehaviorSubject<any>({name: "asd"});

  authToken: string = "";

  constructor(
    private apiService: ApiService,
    private tokenService: TokenService
  ) { }

	login(dataReq: LoginReq):Observable<any> {
    return this.apiService.post<any>('/api/user/login', dataReq).pipe(
      tap((userLoginData) => {
        console.log("tap pipe:");
        this.authToken = userLoginData.accessToken;
        this.tokenService.saveToken(userLoginData.accessToken);
        // profile(userLoginData.accessToken) en lugar de comunicar componentees con observables, podria usar este metodo para actualizar la barra de navegacion con dato de usuario

        console.log(userLoginData.accessToken)
        this.currentUserData.next(userLoginData);
        this.currentUserLogin.next(true);
      }),
      catchError(handleError)
    )
  }
  //login():token_access

  get userData():Observable<any>{
    return this.currentUserData.asObservable();
  }

  get userLogin():Observable<any>{
    return this.currentUserLogin.asObservable();
  }

  profile(token: string){
    console.log("profile in loginservice")
    this.apiService.setHeader('Authorization',`Bearer ${token}`)
    return this.apiService.get<User>('/api/library/obtener-todas');
  }

  // profile(token: string){
  //   return this.apiService.get<User>('/api/user/profile',{
  //     headers:{
  //       Authorization: `bearer ${token}`
  //     }
  //   });
  // }
}
