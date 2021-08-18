import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Heroe } from '../interfaces/heroe.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private endPoint: string = environment.endPoint;

  constructor(private http: HttpClient) { }

  getHeroes(): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(this.endPoint + '/heroes');
  }

  getHeroeById(id: string): Observable<Heroe> {
    return this.http.get<Heroe>(this.endPoint + `/heroes/${id}`);
  }

  getSuggestions(query: string): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(this.endPoint + `/heroes?q=${query}&_limit=6`);

  }
}
