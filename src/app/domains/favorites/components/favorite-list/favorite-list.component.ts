import { Component } from '@angular/core';
import { JobItemComponent } from '../../../../shared/components/job-item/job-item.component';
import { Store } from '@ngrx/store';
import { selectAllFavorites, selectLoading } from '../../store/favorite.selectors';
import { removeFavorite } from '../../store/favorite.actions';
import { Favorite } from '../../types/favorites.types';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { JobCard } from '../../../jobs/types/job.types';

@Component({
  selector: 'app-favorite-list',
  imports: [
    JobItemComponent,
    AsyncPipe
  ],
  templateUrl: './favorite-list.component.html',
})
export class FavoriteListComponent {
  favorites$: Observable<Favorite[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store) {
    this.favorites$ = this.store.select(selectAllFavorites);
    this.loading$ = this.store.select(selectLoading);
  }

  toJobCard(fav: Favorite): JobCard & { id: string } {
    return {
      id: fav.jobId,
      title: fav.title,
      company: fav.company,
      location: fav.location,
      employmentType: fav.employmentType,
      salaryMin: fav.salaryMin,
      salaryMax: fav.salaryMax,
      salaryInterval: fav.salaryInterval,
      applyUrl: fav.applyUrl,
    };
  }

  removeFav(id: string): void {
    this.store.dispatch(removeFavorite({ id }));
  }
}
