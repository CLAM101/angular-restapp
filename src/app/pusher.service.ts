import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import Pusher from 'pusher-js';

@Injectable({
  providedIn: 'root',
})
export class PusherService {
  pusher = new Pusher(environment.pusher.key, {
    cluster: environment.pusher.cluster,
  });

  constructor(private http: HttpClient) {}
}
