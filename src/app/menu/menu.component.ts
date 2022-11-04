import { Component, OnInit } from '@angular/core';
import { AccmgmtService } from '../accmgmt.service';

import { Store } from '@ngrx/store';
import { routeSwitchMain } from '../state.actions';
import { routeSwitchSide } from '../state.actions';
import { Observable, of } from 'rxjs';
import { SideItem } from '../interfaces';
import { MenuItem } from '../interfaces';

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

  menuItems!: MenuItem[];
  sidesmenu!: SideItem[];
  itemTypes!: [
    {
      type: string;
      items: [MenuItem];
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
    });
  }

  ngOnInit(): void {
    this.getMenu();
  }
}
