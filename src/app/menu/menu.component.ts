import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor() { }
  foodData: any 


  ngOnInit(): void {
    this.foodData = [
      {
        id:1,
        foodName:"Paneer Grilled Sandwich",
        foodDetails:"Pan-fried masala paneer.",
        foodPrice:200,
        foodImg:"https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/wzfq7djolqxgdhghebbq"
      },
      {
        id:2,
        foodName:"Veggie Supreme",
        foodDetails:"Onion| Green Capsicum|Mushroom |black olives , sweet corn , Red Paprika topped with Cheese",
        foodPrice:369,
        foodImg:"https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/sgbobtbxlojbtdnr2m5k"
      },
      {
        id:3,
        foodName:"Paneer Burger",
        foodDetails:"panner",
        foodPrice:149,
        foodImg:"https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/xbeqlsck3p0kei53to7k"
      },
      {
        id:4,
        foodName:"Veg Masala Roll In Naan",
        foodDetails:"A homely mix of mashed potato and veggies, seasoned with Indian spices. A filling sure to take you back to mom's kitchen.",
        foodPrice:140,
        foodImg:"https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/l2ng6gtge30sqaafqng7"
      }
    ]
  }

}
