import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, firstValueFrom } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Applicant, Res } from './interfaces';
import { Profile } from './interfaces';
import { Menu } from './interfaces';
import { MenuComponent } from './menu/menu.component';
import { MenuItem } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class AccmgmtService {
  private restUrl = 'http://localhost:3000/restaurants';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  createMenuItem(MenuItem: MenuItem): Observable<object> {
    const formData = new FormData();

    console.log('passed menu item addons in acc mgmt service', MenuItem.image);

    for (let img of MenuItem.image!) {
      formData.append('image', img);
    }

    formData.append('imageName', MenuItem.imageName!);
    formData.append('name', MenuItem.name!);
    formData.append('price', MenuItem.price!);
    formData.append('description', MenuItem.description!);
    formData.append('categories', JSON.stringify(MenuItem.categories!));
    formData.append('relatedSides', JSON.stringify(MenuItem.relatedsides!));
    formData.append('addons', JSON.stringify(MenuItem.addons!));
    formData.append('itemType', MenuItem.itemType!);
    console.log(
      'image nam and data in service',
      // MenuItem.image!.name,
      MenuItem.image,
      'image data',
      formData
    );

    return this.http.post<MenuItem>(this.restUrl + '/addmenuitem', formData, {
      withCredentials: true,
    });
  }

  getRest(): Observable<object> {
    return this.http.get<object>(this.restUrl + '/getrestdetail', {
      withCredentials: true,
    });
  }

  public getMenu(): Observable<Menu> {
    return this.http.get<Menu>(
      this.restUrl + '/getmenu',

      { withCredentials: true }
    );
  }
}
