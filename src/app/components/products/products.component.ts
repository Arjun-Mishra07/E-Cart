import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CartapiService } from 'src/app/services/cartapi.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productList: any;
  filterCategory : any;
  searchKey: string = "";
  constructor(private api: ApiService,
    private cartapi: CartapiService) { }

  ngOnInit(): void {
    this.api.getProduct().subscribe(res => {
      this.productList = res;
      this.filterCategory = res;
      this.productList.forEach((a: any) => {
       if(a.category==="women's clothing" || a.category ==="men's clothing"){
        a.category ="fashion"
       }
        Object.assign(a, { quantity: 1, total: a.price })
      });
      console.log(this.productList)
    });
    this.cartapi.search.subscribe((val: any) => {
      this.searchKey = val;
    })
  }
  addToCart(item: any) {
    this.cartapi.addToCart(item);
  }
  filter(category:string){
   this.filterCategory = this.productList
   .filter((a:any)=>{
    if(a.category == category || category=='')
    {
      return a;
    }
   })

  }
}