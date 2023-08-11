import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/http/api.service';
import { throwError, catchError } from 'rxjs';
import { SignUpReq } from '../../interfaces/sign-up-request-interface';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private apiService: ApiService
  ) { }

  data!: SignUpReq;

  login(dataReq: SignUpReq) {
    //this.apiService.setHeader('Access-Control-Allow-Origin','http://localhost:4001/home/create')
    return this.apiService.post<any>('/api/home/create', dataReq).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('Se ha producio un error ', error.error);
    }
    else{
      console.error('Backend retornó el código de estado ', error.status, error.error);
    }
    return throwError(()=> new Error('Algo falló. Por favor intente nuevamente.'));
  }
}
