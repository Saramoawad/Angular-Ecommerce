import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

   //injection
  private readonly _AuthService=inject(AuthService);
  private readonly _Router=inject(Router);
  msgError:string="";
  isLoading:boolean=false;

  // way1 --syntax form with formbuilder
    private readonly _FormBuilder=inject(FormBuilder);
    loginForm:FormGroup=this._FormBuilder.group({
       email:[null,[Validators.required,Validators.email]],
       password:[null,[Validators.required,Validators.pattern(/^\w{6,}$/ )]],
    })



  // way 2 --syntax form with formgroup

  // loginForm: FormGroup= new FormGroup({

  //   name:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
  //   email:new FormControl(null, [Validators.required,Validators.email]),
  //   password:new FormControl(null,[Validators.required,Validators.pattern(/^\w{6,}$/ )]),
  //   rePassword:new FormControl(null),
  //   phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),


  // }, this.confirmPassword);

  loginSubmit():void
  {
    if(this.loginForm.valid){
        //  console.log(this.loginForm)
        this.isLoading=true;
          console.log(this.loginForm.value);
          this._AuthService.setloginForm(this.loginForm.value).subscribe({
            next:(res)=>{
              console.log(res);
              // this._Router.navigateByurl('/login')  way1
              if(res.message=="success"){
                setTimeout(()=>{
                  // save token
                  localStorage.setItem('userToken',res.token);
                  // decode token by jwt-decode
                  // written in auth servicce to be shared
                  this._AuthService.saveUserData()

                  // navigate to home
                  this._Router.navigate(['/home'])

                }, 1000);

              }
                this.isLoading=false;
            }, 
            error:(err:HttpErrorResponse)=>{
              this.msgError=err.error.message
              console.log(err);
                this.isLoading=false;

            }
           })
    }else{
      this.loginForm.setErrors({mismatch:true})
      this.loginForm.markAllAsTouched()
    }
  // console.log(this.loginForm.value)
  }


}
