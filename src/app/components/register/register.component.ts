import { Component, inject, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy {

  //injection
  private readonly _AuthService=inject(AuthService);
  private readonly _Router=inject(Router);
  msgError:string="";
  isLoading:boolean=false;
  registerSub !:Subscription

  // way1 --syntax form with formbuilder
    private readonly _FormBuilder=inject(FormBuilder);
    registerForm:FormGroup=this._FormBuilder.group({
       name:[null, [Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
       email:[null,[Validators.required,Validators.email]],
       password:[null,[Validators.required,Validators.pattern(/^\w{6,}$/ )]],
       rePassword:[null],
       phone:[null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]]
    }, {validators:this.confirmPassword})



  // way 2 --syntax form with formgroup

  // registerForm: FormGroup= new FormGroup({

  //   name:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
  //   email:new FormControl(null, [Validators.required,Validators.email]),
  //   password:new FormControl(null,[Validators.required,Validators.pattern(/^\w{6,}$/ )]),
  //   rePassword:new FormControl(null),
  //   phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),


  // }, this.confirmPassword);

  registerSubmit():void
  {
    if(this.registerForm.valid){
        //  console.log(this.registerForm)
        this.isLoading=true;
          console.log(this.registerForm.value);
        this.registerSub=  this._AuthService.setRegisterForm(this.registerForm.value).subscribe({
            next:(res)=>{
              console.log(res);
              // this._Router.navigateByurl('/login')  way1
              if(res.message=="success"){
                  this._Router.navigate(['/login'])

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
      this.registerForm.setErrors({mismatch:true})
      this.registerForm.markAllAsTouched()
    }
  // console.log(this.registerForm.value)
  }



  confirmPassword(g:AbstractControl){
    if(g.get('password')?.value===g.get('rePassword')?.value){
      return null
    }else{
      return{mismatch:true}
    }
  }

  // don't miss ? safty null operator
  ngOnDestroy(): void {
    {
        this.registerSub?.unsubscribe()

    }
  }
}
