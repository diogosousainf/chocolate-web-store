import {Component, OnInit} from '@angular/core';
import {OrderService} from "../order.service";
import {CurrencyPipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [
    NgForOf,
    CurrencyPipe
  ],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent implements OnInit {
  orders: any[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(data => {
      this.orders = data;
    });
  }
}
