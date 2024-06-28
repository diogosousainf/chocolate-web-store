import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {CouponService} from "../coupon.service";
import { FormsModule } from '@angular/forms';
import {NgForOf} from "@angular/common";


@Component({
  selector: 'app-coupon-list',
  standalone: true,
  imports: [
    RouterLink, FormsModule, NgForOf
  ],
  templateUrl: './coupon-list.component.html',
  styleUrl: './coupon-list.component.css'
})
export class CouponListComponent implements OnInit {
  coupons: any[] = [];

  constructor(private couponService: CouponService, private router: Router) {}

  ngOnInit(): void {
    this.couponService.getCoupons().subscribe(data => {
      this.coupons = data;
    });
  }

  editCoupon(code: string): void {
    this.router.navigate([`/coupons/edit/${code}`]);
  }

  deleteCoupon(id: string): void {
    this.couponService.deleteCoupon(id).subscribe(() => {
      this.coupons = this.coupons.filter(coupon => coupon.id !== id);
    });
  }
}



