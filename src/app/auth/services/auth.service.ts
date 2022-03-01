import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Auth } from '../Interfaces/auth.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.endPoint;
  private _auth: Auth | undefined;

  get auth(): Auth {
    return { ...this._auth! };
  }

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<Auth> {
    return this.http.get<Auth>(this.baseUrl +`/usuarios?email=${email}&password=${password}`);
  }

  logout() {
    localStorage.removeItem('token');
    this._auth = undefined;
  }

  verifyAuthentication(): Observable<boolean> {
    if (!localStorage.getItem('token')) {
      return of(false);
    }

    return this.http.get<Auth>(this.baseUrl + `/usuarios/`).pipe(
      map(auth => {
        console.log('map', auth);
        this._auth = auth;
        return true;
      })
    );
  }

  getUsuarioById(id:string): Observable<Auth> {
    return this.http.get<Auth>(this.baseUrl +`/usuarios/${id}`);
  }

}
