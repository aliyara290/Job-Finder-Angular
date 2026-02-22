import { Injectable } from '@angular/core';
import { environments } from '../../../../environments/environement.dev';
import { HttpClient } from '@angular/common/http';
import { Favorite } from '../types/favorites.types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private readonly LOCAL_API: string = environments.LOCAL_BACKEND_API;

  constructor(
    private http: HttpClient
  ) {
  }

  getFavorites(userId: string): Observable<Favorite[]> {
    return this.http.get<Favorite[]>(`${this.LOCAL_API}/userFavorites`, { params: { userId } });
  }

  createFavorite(favorite: Favorite): Observable<Favorite> {
    return this.http.post<Favorite>(`${this.LOCAL_API}/userFavorites`, favorite)
  }

  removeFavorite(id: string): Observable<Favorite> {
    return this.http.delete<Favorite>(`${this.LOCAL_API}/userFavorites/${id}`)
  }
}
