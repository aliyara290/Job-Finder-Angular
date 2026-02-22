import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FavoriteService } from '../service/favorite.service';
import * as FavoriteAction from '../store/favorite.actions';
import { mergeMap, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { inject } from '@angular/core';


@Injectable()
export class FavoriteEffects {

  private actions$ = inject(Actions);
  private favoriteService = inject(FavoriteService);

  loadFavorites$ = createEffect(() => this.actions$.pipe(
    ofType(FavoriteAction.loadFavorites),
    mergeMap(({ userId }) => this.favoriteService.getFavorites(userId)
      .pipe(
        map(response => FavoriteAction.loadFavoritesSuccess({ favorites: response })),
        catchError(err => of(FavoriteAction.loadFavoritesFailure({ error: err })))
      ))
  ))

  createFavorite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoriteAction.createFavorite),
      mergeMap(({ favorite }) =>
        this.favoriteService.createFavorite(favorite).pipe(
          map(response =>
            FavoriteAction.createFavoriteSuccess({ favorite: response })
          ),
          catchError(err =>
            of(
              FavoriteAction.createFavoriteFailure({
                error: err
              })
            )
          )
        )
      )
    )
  );

  removeFavorite$ = createEffect(() => this.actions$.pipe(
    ofType(FavoriteAction.removeFavorite),
    mergeMap(({ id }) => this.favoriteService.removeFavorite(id)
      .pipe(
        map((response) => FavoriteAction.removeFavoriteSuccess({ id: response.id })),
        catchError(() => of(FavoriteAction.removeFavoriteFailure({ error: 'Failed to remove favorite!' })))
      )
    )
  ))
}
