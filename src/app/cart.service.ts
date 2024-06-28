import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart = new BehaviorSubject<any[]>([]);
  cart$ = this.cart.asObservable();

  private coupon = new BehaviorSubject<any>(null);
  coupon$ = this.coupon.asObservable();

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  addToCart(product: any): void {
    const currentCart = this.cart.value;
    const existingProduct = currentCart.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      currentCart.push({ ...product, quantity: 1 });
    }
    this.cart.next(currentCart);
  }

  removeFromCart(productId: number): void {
    const currentCart = this.cart.value.filter(item => item.id !== productId);
    this.cart.next(currentCart);
  }

  applyCoupon(code: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/coupons/${code}`);
  }

  getTotal(): number {
    const currentCart = this.cart.value;
    let total = currentCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const currentCoupon = this.coupon.value;
    if (currentCoupon) {
      total = total - (total * (currentCoupon.discountPercentage / 100));
    }
    return total;
  }

  clearCart(): void {
    this.cart.next([]);
    this.coupon.next(null);
  }
}
