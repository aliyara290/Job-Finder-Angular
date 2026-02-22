import { Component } from '@angular/core';
import { JobsService } from '../../service/jobs.service';
import { AsyncPipe, DatePipe, DecimalPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectAllFavorites } from '../../../favorites/store/favorite.selectors';
import { createFavorite, removeFavorite } from '../../../favorites/store/favorite.actions';
import { Favorite } from '../../../favorites/types/favorites.types';
import { JobDetails } from '../../types/job.types';
import { AuthService } from '../../../../core/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-job-details',
  imports: [
    AsyncPipe,
    DatePipe,
    DecimalPipe
  ],
  templateUrl: './job-details.component.html',
})
export class JobDetailsComponent {
  jobDetails$: Observable<JobDetails | null>;
  favorites$: Observable<Favorite[]>;
  private favoritesSnapshot: Favorite[] = [];

  constructor(
    private jobService: JobsService,
    private store: Store,
    private authService: AuthService
  ) {
    this.jobDetails$ = this.jobService.jobDetails$;
    this.favorites$ = this.store.select(selectAllFavorites);
    this.favorites$.subscribe(favs => this.favoritesSnapshot = favs);
  }

  getFavoriteForJob(jobId: string): Favorite | undefined {
    return this.favoritesSnapshot.find(f => f.jobId === jobId);
  }

  isFavorited(jobId: string): boolean {
    return !!this.getFavoriteForJob(jobId);
  }

  toggleFavorite(job: JobDetails): void {
    const existing = this.getFavoriteForJob(job.id);
    if (existing) {
      this.store.dispatch(removeFavorite({ id: existing.id }));
    } else {
      const currentUser = this.authService.getCurrentUser();
      const favorite: Favorite = {
        id: crypto.randomUUID(),
        userId: currentUser?.id ?? 'guest',
        jobId: job.id,
        title: job.title,
        employmentType: job.employmentType ?? '',
        company: job.company,
        location: job.location,
        salaryMin: job.salaryMin ?? 0,
        salaryMax: job.salaryMax ?? 0,
        salaryInterval: job.salaryInterval ?? '',
        applyUrl: job.applyUrl
      };
      this.store.dispatch(createFavorite({ favorite }));
    }
  }
}
