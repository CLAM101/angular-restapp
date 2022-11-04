import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { PusherService } from '../pusher.service';
import { ActiveOrderItem } from '../interfaces';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['button', 'id', 'total', 'order-data'];
  dataSource: ActiveOrderItem[] = [];
  constructor(
    private orderService: OrderService,
    private pusherService: PusherService
  ) {}

  GetOrders(): void {
    this.orderService.GetActiveOrders().subscribe((result) => {
      console.log('result on get active orders', result);

      this.dataSource = result;
    });
  }

  AdjsutOrderStatus(orderId: string) {
    console.log('order ID passed to table componenet', orderId);
    this.orderService
      .AdjustOrderStatus('/rest-adj-order-status', orderId)
      .subscribe((result) => {
        console.log('adjsuted order in table componenet', result);
      });
  }

  pusher() {
    let channel = this.pusherService.pusher.subscribe('rests');
    channel.bind('updated', (data: any) => {
      this.GetOrders();
      alert('New Order!');
    });

    return () => {
      this.pusherService.pusher.unsubscribe('rests');
    };
  }

  ngOnInit(): void {
    this.pusher();
    this.GetOrders();
  }
}
