import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class CartapiService {
  cartDataList: any = JSON.parse(localStorage.getItem('ECart') || '[]');
  productList = new BehaviorSubject<any>([]);
  search = new BehaviorSubject<string>("");
  
  constructor(private http: HttpClient) { }
  getProduct() {
    this.productList.next(this.cartDataList);
    return this.productList.asObservable();
  }
  setProduct(product: any) {

    this.cartDataList.push(...product);
    this.productList.next(product)
  }
  addToCart(product: any) {
    this.cartDataList.push(product);
    this.productList.next(this.cartDataList);
    this.getTotalAmount();
    console.log(this.cartDataList);
    localStorage.setItem('ECart', JSON.stringify(this.cartDataList))

  }
  getTotalAmount():number{
    let grandTotal =0;
    this.cartDataList.map((a:any)=>{
      grandTotal += a.total;
    })
    return grandTotal
  }
  removeCartData(product:any){
     this.cartDataList.map((a:any, index:any)=>{
      if(product.id === a.id){
        this.cartDataList.splice(index,1)
      }
     })
    localStorage.setItem('ECart', JSON.stringify(this.cartDataList))
     this.productList.next(this.cartDataList)
    }   
  removeAllCart(){
   this.cartDataList =[];
   localStorage.setItem('ECart', JSON.stringify(this.cartDataList))
   this.productList.next(this.cartDataList) 
  }
}
