import { createAction, props } from '@ngrx/store';
import { Favorite } from '../types/favorites.types';

export const loadFavorites = createAction('[Favorites] Load Favorites', props<{ userId: string }>());
export const loadFavoritesSuccess = createAction('[Favorites] Load Favorites Success', props<{ favorites: Favorite[] }>());
export const loadFavoritesFailure = createAction('[Favorites] Load Favorites Failure', props<{ error: any }>());

export const createFavorite = createAction('[Favorite] Create Favorite', props<{ favorite: Favorite }>());
export const createFavoriteSuccess = createAction('[Favorite] Create Favorite Success', props<{ favorite: Favorite }>());
export const createFavoriteFailure = createAction('[Favorite] Create Favorite Failure', props<{ error: any }>());

export const removeFavorite = createAction('[Favorite] Remove Favorite', props<{ id: string }>());
export const removeFavoriteSuccess = createAction('[Favorite] Remove Favorite Success', props<{ id: string }>());
export const removeFavoriteFailure = createAction('[Favorite] Remove Favorite Failure', props<{ error: any }>());
