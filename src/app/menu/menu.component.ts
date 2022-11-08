import { Component, OnInit } from '@angular/core';
import { AccmgmtService } from '../accmgmt.service';

import { Store } from '@ngrx/store';
import { routeSwitchMain } from '../state.actions';
import { routeSwitchSide } from '../state.actions';
import { Observable, of } from 'rxjs';
import { SideItem } from '../interfaces';
import { FetchedMenuItem } from '../interfaces';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  route$: Observable<boolean>;

  nav!: string;

  constructor(
    private accmgmtService: AccmgmtService,
    private store: Store<{ route: boolean }>
  ) {
    this.route$ = store.select('route');
  }

  menuItems!: FetchedMenuItem[];
  sidesmenu!: SideItem[];
  itemTypes!: [
    {
      type: string;
      items: [FetchedMenuItem];
    }
  ];
  items!: [string];

  //mainMenus: Menu['menu'] = this.menus.menu;

  routeSwitchMain() {
    this.store.dispatch(routeSwitchMain());
  }
  routeSwitchSide() {
    this.store.dispatch(routeSwitchSide());
  }

  getMenu() {
    this.accmgmtService.getMenu().subscribe((menu) => {
      console.log('fetched menu', menu);

      this.itemTypes = menu.menuByItemType;
      this.items = menu.itemTypes;
      this.sidesmenu = menu.sidesmenu;

      console.log('set item types', this.itemTypes);
    });
  }

  ngOnInit(): void {
    this.getMenu();
  }
}
