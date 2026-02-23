import {Favorite} from '../types/favorites.types';
import {createReducer, on} from '@ngrx/store';
import * as FavoriteAction from './favorite.actions';


export interface FavoriteState {
  favorites: Favorite[];
  loading: boolean;
  error: any;
}

const initialState: FavoriteState = {
  favorites: [],
  loading: false,
  error: null
}

export const favoriteReducer = createReducer(
  initialState,
  on(FavoriteAction.loadFavorites, (state) => ({...state, loading: true, error: null})),
  on(FavoriteAction.loadFavoritesSuccess, (state, {favorites}) => ({favorites, loading: false, error: null})),
  on(FavoriteAction.loadFavoritesFailure, (state, {error}) => ({...state, loading: false, error: error})),

  on(FavoriteAction.createFavorite, (state) => ({...state, loading: true, error: null})),
  on(FavoriteAction.createFavoriteSuccess, (state, {favorite}) => ({
    ...state,
    favorites: [...state.favorites, favorite],
    loading: false,
    error: null
  })),
  on(FavoriteAction.createFavoriteFailure, (state, {error}) => ({...state, loading: false, error: error})),

  on(FavoriteAction.removeFavorite, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(FavoriteAction.removeFavoriteSuccess, (state, {id}) => ({
    ...state,
    favorites: state.favorites.filter(f => f.id !== id),
    loading: false,
    error: null
  })),
  on(FavoriteAction.removeFavoriteFailure, (state, {error}) => ({...state, loading: false, error: error}))
)
