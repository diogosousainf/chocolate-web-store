import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CouponService} from "../coupon.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-coupon-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './coupon-edit.component.html',
  styleUrl: './coupon-edit.component.css'
})
export class CouponEditComponent implements OnInit {
  coupon: any = {
    code: '',
    discountPercentage: 0,
    expirationDate: ''
  };

  constructor(
    private route: ActivatedRoute,
    private couponService: CouponService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const code = this.route.snapshot.paramMap.get('code');
    if (code) {
      this.couponService.getCoupon(code).subscribe(
        data => {
          this.coupon = data;
        },
        error => {
          console.error('Erro ao buscar cupão:', error);
          // Redirecionar ou mostrar mensagem de erro
        }
      );
    }
  }

  onSubmit(): void {
    this.couponService.updateCoupon(this.coupon.code, this.coupon).subscribe(() => {
      this.router.navigate(['/coupons']);
    });
  }
}
