import { Component } from '@angular/core';
import { CartapiService } from 'src/app/services/cartapi.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
 totalItemNumber:number =0; 
 searchTerm !: string;
constructor(private cartApi:CartapiService){}
 
ngOnInit(): void{
this.cartApi.getProduct().subscribe(res=>{
  this.totalItemNumber= res.length;
})
}
search(event:any){
  this.searchTerm =(event.target as HTMLInputElement).value;
  console.log(this.searchTerm);
  this.cartApi.search.next(this.searchTerm)
}

}
