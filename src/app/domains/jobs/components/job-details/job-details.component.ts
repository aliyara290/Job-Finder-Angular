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
import { selectAllApplications } from '../../../applications-tracker/store/application.selectors';
import { createApplication, removeApplication } from '../../../applications-tracker/store/application.actions';
import { Application } from '../../../applications-tracker/types/application.types';

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
  private applicationsSnapshot: Application[] = [];

  constructor(
    private jobService: JobsService,
    private store: Store,
    private authService: AuthService
  ) {
    this.jobDetails$ = this.jobService.jobDetails$;
    this.favorites$ = this.store.select(selectAllFavorites);
    this.favorites$.subscribe(favs => this.favoritesSnapshot = favs);
    this.store.select(selectAllApplications).subscribe(apps => this.applicationsSnapshot = apps);
  }

  // ─── Favorites ───────────────────────────────────────────
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

  // ─── Application Tracking ────────────────────────────────
  getApplicationForJob(offerId: string): Application | undefined {
    return this.applicationsSnapshot.find(a => a.offerId === offerId);
  }

  isTracked(offerId: string): boolean {
    return !!this.getApplicationForJob(offerId);
  }

  toggleTracking(job: JobDetails): void {
    const existing = this.getApplicationForJob(job.id);
    if (existing) {
      this.store.dispatch(removeApplication({ id: existing.id }));
    } else {
      const currentUser = this.authService.getCurrentUser();
      const now = new Date();
      const dateAdded = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()}`;
      const application: Application = {
        id: crypto.randomUUID(),
        userId: currentUser?.id ?? '',
        offerId: job.id,
        title: job.title,
        company: job.company,
        location: job.location,
        url: job.applyUrl,
        status: 'pending',
        notes: '',
        dateAdded
      };
      this.store.dispatch(createApplication({ application }));
    }
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}
