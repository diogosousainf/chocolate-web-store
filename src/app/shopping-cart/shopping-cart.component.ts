import {Component, OnInit} from '@angular/core';
import {CartService} from "../cart.service";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CurrencyPipe, NgForOf} from "@angular/common";
import {OrderService} from "../order.service";

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [
    FormsModule,
    CurrencyPipe,
    NgForOf
  ],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit {
  cart: any[] = [];
  coupon: any = null;
  total: number = 0;
  couponCode: string = '';  

  name: string = '';
  email: string = '';
  address: string = '';
  phone: string = '';

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
      this.total = this.cartService.getTotal();
    });

    this.cartService.coupon$.subscribe(coupon => {
      this.coupon = coupon;
      this.total = this.cartService.getTotal();
    });
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  applyCoupon(code: string): void {
    this.cartService.applyCoupon(code).subscribe(
      coupon => {
        this.cartService.applyCoupon(coupon);
        this.total = this.cartService.getTotal();
      },
      error => {
        console.error('Cupão inválido', error);
      }
    );
  }

  checkout(name: string, email: string, address: string, phone: string): void {
    const order = {
      produtos: this.cart,
      cupao: this.coupon ? this.coupon.code : null,
      valorFinal: this.total,
      dadosContato: { nome: name, email: email, morada: address, telefone: phone }
    };

    this.orderService.createOrder(order).subscribe(response => {
      this.cartService.clearCart();
      this.router.navigate(['/confirmation']);
    });
  }
}
