import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
//httpclient --import-->appconfig
  // constructor(private _HttpClient:HttpClient) { }  --way1 for injection
  // way2
  private readonly _HttpClient=inject(HttpClient);
  userData:any=null

  setRegisterForm(data:object):Observable<any>
  {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signup`,data)
  }
  setloginForm(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signin`,data)
  }
  saveUserData():void{
    if(localStorage.getItem('userToken')!==null){
      // ! means not null
     this.userData= jwtDecode(localStorage.getItem('userToken')!)
     console.log('userData',this.userData)
    }
  }
}
