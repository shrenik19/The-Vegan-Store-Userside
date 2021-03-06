import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product_class } from '../Classes/product';
import { cart_class } from '../Classes/cart';
import { AddtocartService } from '../services/addtocart.service';
import { AlertController } from '@ionic/angular';

export interface qty{
  value:string;
  viewValue:string;
}
@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.page.html',
  styleUrls: ['./productdetail.page.scss'],
})
export class ProductdetailPage implements OnInit {
  p_id:number;
  p_name:string;
  p_price:number;
  p_qty:number;
  fk_cat_id:number;
  p_mfg:string;
  p_img:string;
  buffer_stock:number;
  fk_s_id:number;
  x:number;
  user_id:string;
  prodarr:product_class[]=[];
  similararr:product_class[]=[];
  addcart:cart_class[]=[];
  cartarr:cart_class[]=[];
  qty:number;
  price:number;
  checkid:number;
  i:number;
  j:number;
  qtyarr:qty[]=[
    {value:"500",viewValue:"500 gm."},
    {value:"1000",viewValue:"1 Kg"},
    {value:"2000",viewValue:"2 Kg"},
  ];

  sliderConfig={
    spaceBetween:0,
    centeredSlides:true,
    slidesPerView:1.8
  }
  
  selectedFile:File=null;
  flag:boolean=false;
  constructor(private _route:Router,private _acroute:ActivatedRoute,private _proser:ProductService,private _addser:AddtocartService,public alertController: AlertController) { }
  async presentAlert() {
    const alert = await this.alertController.create({
      message: 'Item Added in Your Cart',
      buttons: ['OK']
    });
    await alert.present();
  }
  async presentAlert1() {
    const alert = await this.alertController.create({
      message: 'Please Select Quantity',
      buttons: ['OK']
    });
    await alert.present();
  }
  onclickback(){
    this._route.navigate(['/product']);
  }

  onclickpro(item)
  {
    console.log("hello");
    this._route.navigate(['/productdetail',item.p_id]);
  }

  onclickaddtocart(item)
  {
    console.log(item);
    if(this.qty==null)
    {
        this.presentAlert1();
    }
    else
    {
      this._addser.getAllcart().subscribe(
        (data:any[])=>{
          console.log(data)
          this.cartarr=data;
          console.log(this.cartarr);
        }
      );   
      if(this.cartarr.find(x=>x.fk_p_id==item.p_id))
      {
        alert("Already in cart")
      }
      else
      {
      console.log(this.qty);
      for(this.i=0;this.i<this.prodarr.length;this.i++)
      {
        this.price=(this.prodarr[this.i].p_price*this.qty)/1000;
        this.p_id=this.prodarr[this.i].p_id;
        this.p_name=this.prodarr[this.i].p_name;
        this.p_price=this.prodarr[this.i].p_price;
        this.fk_cat_id=this.prodarr[this.i].fk_cat_id;
        this.p_mfg=this.prodarr[this.i].p_mfg;
        this.p_img=this.prodarr[this.i].p_img;
        console.log(this.price);
      }
        this.user_id=localStorage.getItem('email_id');
        this._addser.addcart(new cart_class(this.user_id,this.price,this.p_id,this.p_name,this.qty,this.p_img,this.p_mfg,this.fk_cat_id,this.p_price)).subscribe(
        (data:any)=>
        {
          this.addcart.push(new cart_class(this.user_id,this.price,this.p_id,this.p_name,this.qty,this.p_img,this.p_mfg,this.fk_cat_id,this.p_price));
          console.log(data);

          this.presentAlert();
          this._route.navigate(['/product']);
        }
      );
    }
    }
    
  }
  ngOnInit() {
    this.x=this._acroute.snapshot.params['p_id'];
    this._proser.getAllproById(this.x).subscribe(
          (data:any)=>{
          this.p_id=data[0].p_id;
          this.fk_cat_id=data[0].fk_cat_id;
          this.prodarr=data;
          console.log(this.prodarr);

          this._proser.similarProduct(this.fk_cat_id,this.p_id).subscribe(
            (data:product_class[])=>{
              this.similararr=data;
              console.log(this.similararr,"similar arr")
            }
          );
       }
     );
  }

}
