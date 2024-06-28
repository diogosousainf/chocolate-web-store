import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CouponService} from "../coupon.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-coupon-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './coupon-form.component.html',
  styleUrl: './coupon-form.component.css'
})
export class CouponFormComponent implements OnInit {
  coupon: any = {};
  isEdit: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private couponService: CouponService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const code = this.route.snapshot.paramMap.get('code');
    if (code) {
      this.isEdit = true;
      this.couponService.getCoupon(code).subscribe(data => {
        this.coupon = data;
      });
    }
  }

  onSubmit(): void {
    if (this.isEdit) {
      this.couponService.updateCoupon(this.coupon.code, this.coupon).subscribe(() => {
        this.router.navigate(['/coupons']);
      });
    } else {
      this.couponService.addCoupon(this.coupon).subscribe(() => {
        this.router.navigate(['/coupons']);
      });
    }
  }
}
