import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { NgClass } from '@angular/common';
import { CarouselModule ,OwlOptions} from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-prod-details',
  imports: [NgClass,CarouselModule],
  templateUrl: './prod-details.component.html',
  styleUrl: './prod-details.component.scss'
})
export class ProdDetailsComponent implements OnInit{
 private readonly _ActivatedRoute= inject(ActivatedRoute)
 private readonly _ProductsService= inject(ProductsService)
productImgs: string[] = [];
// detailsProduct:IProduct={} as IProduct; //way one
 //detailsProduct !:IProduct; //way tow
 detailsProduct :IProduct | null = null; //way three
 
ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next:(p)=>{
      let prodID= p.get('id');
      // call api, getspecificmethod
      this._ProductsService.getSpecificProduct(prodID).subscribe({
        next:(res)=>{
          console.log(res.data);
          this.detailsProduct=res.data
          this.productImgs = this.detailsProduct?.images || [];
                },
        error:(err)=>{
          console.log(err)
        }
      })


      
    },
  })

}


// star rating
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

customOptionsProdImgs: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay:true,
    autoplayTimeout:2000,
    autoplayHoverPause:true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
     items:1,
    nav: false
  }

}
