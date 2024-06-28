import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CouponService {
  private apiUrl = 'http://localhost:3000/coupons';

  constructor(private http: HttpClient) {}

  getCoupons(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getCoupon(code: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${code}`);
  }

  addCoupon(coupon: any): Observable<any> {
    return this.http.post(this.apiUrl, coupon);
  }

  updateCoupon(code: string, coupon: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${code}`, coupon);
  }

  deleteCoupon(code: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${code}`);
  }
}
