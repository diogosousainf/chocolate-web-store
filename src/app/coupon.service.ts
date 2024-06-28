import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
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

  getCoupon(code: string): Observable<any[]> {
    const params = new HttpParams().set('code', code);
    return this.http.get<any[]>(this.apiUrl, { params });
  }

  addCoupon(coupon: any): Observable<any> {
    return this.http.post(this.apiUrl, coupon);
  }

  updateCoupon(id: string, coupon: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, coupon);
  }

  deleteCoupon(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
