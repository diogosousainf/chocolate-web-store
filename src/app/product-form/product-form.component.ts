import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ProductService} from "../product.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  product: any = {};
  id: number | null = null;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.productService.getProduct(this.id).subscribe(data => {
        this.product = data;
      });
    }
  }

  onSubmit(): void {
    if (this.id) {
      this.productService.updateProduct(this.id, this.product).subscribe(() => {
        this.router.navigate(['/admin/products']);
      });
    } else {
      this.productService.addProduct(this.product).subscribe(() => {
        this.router.navigate(['/admin/products']);
      });
    }
  }
}
