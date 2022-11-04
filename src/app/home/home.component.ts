import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { routeSwitchMain } from '../state.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  route$: Observable<boolean>;

  constructor(
    private store: Store<{ route: boolean }>,
    private router: Router
  ) {
    this.route$ = store.select('route');
  }

  routeSwitch() {
    this.store.dispatch(routeSwitchMain());
  }

  ngOnInit(): void {
    this.router.navigate(['./home/menuadd']);
    console.log('route state', this.route$);
  }
}
