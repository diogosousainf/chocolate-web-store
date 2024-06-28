import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ProductService} from "../product.service";
import {CurrencyPipe} from "@angular/common";
import {CartService} from "../cart.service";

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
export class ShowProductComponent implements OnInit{
  product: any = {};

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.productService.getProduct(id).subscribe(data => {
      this.product = data;
    }, error => {
      console.error('Erro ao buscar produto:', error);
    });
  }

  addToCart(product: any): void {
    this.cartService.addToCart(product);
  }
}
