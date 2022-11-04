import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, firstValueFrom } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Applicant, Res } from './interfaces';
import { Profile } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private restUrl = 'http://localhost:3000/restaurants';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  // for login and logout and logstatuscheck methods
  public validate(
    endpoint: string,
    username?: String,
    password?: String
  ): Observable<Res> {
    return this.http.post<Res>(
      this.restUrl + endpoint,
      {
        username: username,
        password: password,
      },
      { withCredentials: true }
    );
  }

  public getProfile(): Observable<Profile> {
    return this.http.get<Profile>(
      this.restUrl + '/getprofile',

      { withCredentials: true }
    );
  }

  addImage(name: string, image: File): Observable<Profile> {
    const imageData = new FormData();
    imageData.append('name', name);
    imageData.append('image', image, name);
    // imageData.append('name', name);
    // imageData.append('image', image, name);
    console.log('image data', imageData);
    return this.http.post<Profile>(this.restUrl + '/updateimage', imageData, {
      withCredentials: true,
    });
  }

  restApply(
    storename: string,
    storeaddress: string,
    firstname: string,
    lastname: string,
    email: string,
    phone: string,
    floorsuite?: string
  ): Observable<Applicant> {
    return this.http.post<Applicant>(this.restUrl + '/apply', {
      storename: storename,
      storeaddress: storeaddress,
      firstname: firstname,
      lastname: lastname,
      email: email,
      phone: phone,
      floorsuite: floorsuite,
    });
  }

  // logged status check for authguard injected into routing module on home componenet
  public isAuthenticated() {
    return this.validate('/logStatusCheck').subscribe((response): boolean => {
      console.log('response on isAutheticated', response.response);
      if (response.response === true) {
        return true;
      } else {
        return false;
      }
    });
  }

  public async setUserInfo(user: string): Promise<void> {
    console.log('user in set user info', JSON.stringify(user));
    localStorage.setItem('userinfo', JSON.stringify(user));
  }
}
