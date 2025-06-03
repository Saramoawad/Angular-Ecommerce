import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/interfaces/iproduct';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

//  private readonly _ProductsService= inject(ProductsService)
 private readonly _ProductsService=inject(ProductsService)

 productsList:IProduct[]=[] //will filled py products
 ngOnInit(): void {
   this._ProductsService.getAllProducts().subscribe({
    next:(res)=>{
      console.log(res.data);
      this.productsList=res.data;
    },
    error:(err)=>{
      console.log(err)
    }
   })
 }

}
