import { Component } from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ProductService} from "../product.service";
import {CurrencyPipe} from "@angular/common";

@Component({
  selector: 'app-show-product',
  standalone: true,
  imports: [
    CurrencyPipe,
    RouterLink
  ],
  templateUrl: './show-product.component.html',
  styleUrl: './show-product.component.css'
})
export class ShowProductComponent {

  product: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.productService.getProduct(id).subscribe(data => {
      this.product = data;
    });
  }
}
