import { Routes } from '@angular/router';
import {ProductListComponent} from "./product-list/product-list.component";
import {ProductFormComponent} from "./product-form/product-form.component";
import {ShowProductComponent} from "./show-product/show-product.component";
import {EditProductComponent} from "./edit-product/edit-product.component";
import {CouponListComponent} from "./coupon-list/coupon-list.component";
import {CouponFormComponent} from "./coupon-form/coupon-form.component";
import {CouponEditComponent} from "./coupon-edit/coupon-edit.component";
import {OrderListComponent} from "./order-list/order-list.component";
import {CompanyInfoComponent} from "./company-info/company-info.component";

export const routes: Routes = [
  {path : '', redirectTo: 'products', pathMatch: 'full'},
  { path: 'products', component: ProductListComponent },
  { path: 'add', component: ProductFormComponent },
  { path: 'edit/:id', component: EditProductComponent },
  {path : 'show/:id' , component: ShowProductComponent},
  { path: 'coupons', component: CouponListComponent },
  { path: 'coupons/add', component: CouponFormComponent },
  { path: 'coupons/edit/:code', component: CouponEditComponent },
  { path: 'orders', component: OrderListComponent },
  { path: 'about', component: CompanyInfoComponent },


];


