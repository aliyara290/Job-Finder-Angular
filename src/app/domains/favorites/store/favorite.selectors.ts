import {createFeatureSelector, createSelector} from '@ngrx/store';
import {FavoriteState} from './favorite.reducers';


export const selectFavoriteState = createFeatureSelector<FavoriteState>("favorite");

export const selectAllFavorites = createSelector(
  selectFavoriteState,
  state => state.favorites
)

export const selectLoading = createSelector(
  selectFavoriteState,
  state => state.loading
)


export const selectError = createSelector(
  selectFavoriteState,
  state => state.error
)
