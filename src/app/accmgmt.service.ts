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
    const imageData = new FormData();

    console.log('passed menu item', MenuItem);

    imageData.append('imageName', MenuItem.image!.name!);
    imageData.append('image', JSON.stringify(MenuItem.image!));
    imageData.append('name', MenuItem.name!);
    imageData.append('price', MenuItem.price!);
    imageData.append('description', MenuItem.description!);
    imageData.append('categories', JSON.stringify(MenuItem.categories!));
    imageData.append('relatedSides', JSON.stringify(MenuItem.relatedsides!));
    imageData.append('addons', JSON.stringify(MenuItem.addons!));
    imageData.append('itemType', MenuItem.itemType!);
    console.log(
      'image nam and data in service',
      MenuItem.image!.name,
      MenuItem.image,
      'image data',
      imageData
    );

    return this.http.post<MenuItem>(this.restUrl + '/addmenuitem', imageData, {
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
