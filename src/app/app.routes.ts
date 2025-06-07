import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProductComponent } from './components/product/product.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { authGuard } from './guards/auth.guard';
import { logedGuard } from './guards/loged.guard';
import { ProdDetailsComponent } from './components/prod-details/prod-details.component';

export const routes: Routes = [

    {path:'', component:AuthLayoutComponent,canActivate:[logedGuard],
        children:[
        {path:'',redirectTo:'login',pathMatch:'full'},
        {path:'login',component:LoginComponent},
        {path:'register',component:RegisterComponent}
    ]
    },
        {path:'', component:BlankLayoutComponent,canActivate:[authGuard],children:[
        {path:'',redirectTo:'home',pathMatch:'full'},
        {path:'home',component:HomeComponent},
        {path:'products',component:ProductComponent},
        {path:'categories',component:CategoriesComponent},
        {path:'brands',component:BrandsComponent},
        {path:'cart',component:CartComponent},
        {path:'prodDetails/:id',component:ProdDetailsComponent}
    ]},
    {path:'**' ,component:NotfoundComponent}
];
