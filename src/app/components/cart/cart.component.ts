import { style } from '@angular/animations';
import { Component } from '@angular/core';
import { CartapiService } from 'src/app/services/cartapi.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  products:any =[];
  allProducts !:number;
  constructor(private cartApi: CartapiService) {}

  ngOnInit(): void {
  this.cartApi.getProduct().subscribe(res=>{
    this.products = res;
    this.allProducts = this.cartApi.getTotalAmount();
  })
}
removeProduct(item:any){
  this.cartApi.removeCartData(item);
}
removeAllProduct(){
  this.cartApi.removeAllCart();
}
}
