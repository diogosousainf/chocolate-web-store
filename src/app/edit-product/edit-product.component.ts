import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../product.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent {
  product: any = {};

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.productService.getProduct(id).subscribe(data => {
      this.product = data;
    });
  }

  onSubmit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.productService.updateProduct(id, this.product).subscribe(() => {
      this.router.navigate(['/products']);
    });
  }
}
