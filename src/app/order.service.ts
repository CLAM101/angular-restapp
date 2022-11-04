import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, firstValueFrom, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Res } from './interfaces';
import { ActiveOrderItem } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private restURL = 'http://localhost:3000/restaurants';

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  public getActiveOrders(): Observable<ActiveOrderItem[]> {
    return this.http.get<ActiveOrderItem[]>(this.restURL + '/getactiveorders', {
      withCredentials: true,
    });
  }
  public getOrderHistory(): Observable<ActiveOrderItem[]> {
    return this.http.get<ActiveOrderItem[]>(this.restURL + '/getorderhistory', {
      withCredentials: true,
    });
  }

  public adjustOrderStatus(
    endpoint: string,
    orderId: string
  ): Observable<ActiveOrderItem> {
    console.log('order ID in order service', orderId);
    return this.http.post<ActiveOrderItem>(
      this.restURL + endpoint,
      {
        orderId: orderId,
      },
      { withCredentials: true }
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log('log message', message);
  }
}
