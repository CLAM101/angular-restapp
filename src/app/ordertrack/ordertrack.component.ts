import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { ActiveOrderItem } from '../interfaces';
import { Observable, throwError, firstValueFrom } from 'rxjs';
import { PusherService } from '../pusher.service';

@Component({
  selector: 'app-ordertrack',
  templateUrl: './ordertrack.component.html',
  styleUrls: ['./ordertrack.component.scss'],
})
export class OrdertrackComponent implements OnInit {
  constructor(
    private orderService: OrderService,
    private pusherService: PusherService
  ) {}

  // GetOrders(): void {
  //   this.orderService.GetActiveOrders().subscribe((result) => {
  //     console.log('result on get active orders', result);
  //   });
  // }

  // pusher() {
  //   let data;
  //   let channel = this.pusherService.pusher.subscribe('rests');
  //   channel.bind('updated', (data: any) => {
  //     this.GetOrders();
  //   });

  //   console.log('data outside', data);
  // }

  ngOnInit() {
    // this.pusher();
    // // this.pusherService.pusher();
    // this.GetOrders();
  }
}
