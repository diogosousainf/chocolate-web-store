import {Component, OnInit} from '@angular/core';
import {CurrencyPipe, NgForOf} from "@angular/common";
import {ProductService} from "../product.service";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    CurrencyPipe
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
  export class ProductListComponent implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  showProduct(id: number): void {
    this.router.navigate([`/show/${id}`]);
  }

  editProduct(id: number): void {
    this.router.navigate([`/edit/${id}`]);
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(() => {
      this.products = this.products.filter(product => product.id !== id);
    });
  }
}
