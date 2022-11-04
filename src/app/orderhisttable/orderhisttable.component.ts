import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { PusherService } from '../pusher.service';
import { ActiveOrderItem } from '../interfaces';

@Component({
  selector: 'app-orderhisttable',
  templateUrl: './orderhisttable.component.html',
  styleUrls: ['./orderhisttable.component.scss'],
})
export class OrderhisttableComponent implements OnInit {
  displayedColumns: string[] = ['status', 'id', 'total', 'order-data'];
  dataSource: ActiveOrderItem[] = [];
  constructor(
    private orderService: OrderService,
    private pusherService: PusherService
  ) {}

  getOrderHistory(): void {
    this.orderService.getOrderHistory().subscribe((result) => {
      console.log('result on get active orders', result);

      this.dataSource = result;
    });
  }

  ngOnInit(): void {
    this.getOrderHistory();
  }
}
