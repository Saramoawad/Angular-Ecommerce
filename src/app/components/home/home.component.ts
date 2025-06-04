import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { NgClass } from '@angular/common';




@Component({
  selector: 'app-home',
  imports: [  NgClass ],
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


 getStars(rating: number): string[] {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  const stars: string[] = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push('fa-star');
  }
  if (halfStar) {
    stars.push('fa-solid fa-star-half-stroke');
  }
  for (let i = 0; i < emptyStars; i++) {
    stars.push('fa-regular fa-star'); 
  }

  return stars.map(s => `fas ${s}`);
}


}
