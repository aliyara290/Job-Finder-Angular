import { Component, Input } from '@angular/core';
import { JobCard, JobDetails } from '../../../domains/jobs/types/job.types';
import { DecimalPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { createFavorite, removeFavorite } from '../../../domains/favorites/store/favorite.actions';
import { Favorite } from '../../../domains/favorites/types/favorites.types';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-job-item',
  imports: [
    DecimalPipe
  ],
  templateUrl: './job-item.component.html',
})
export class JobItemComponent {

  @Input() job!: JobCard & { id?: string };
  @Input() isFavorited: boolean = false;
  @Input() favoriteId: string | null = null;

  constructor(
    private store: Store,
    private authService: AuthService
  ) {
  }

  toggleFavorite(event: Event): void {
    event.stopPropagation();
    if (this.isFavorited && this.favoriteId) {
      this.store.dispatch(removeFavorite({ id: this.favoriteId }));
    } else {
      const currentUser = this.authService.getCurrentUser();
      const favorite: Favorite = {
        id: crypto.randomUUID(),
        userId: currentUser?.id ?? 'guest',
        jobId: (this.job as JobDetails).id ?? '',
        title: this.job.title,
        employmentType: this.job.employmentType ?? '',
        company: this.job.company,
        location: this.job.location,
        salaryMin: this.job.salaryMin ?? 0,
        salaryMax: this.job.salaryMax ?? 0,
        salaryInterval: this.job.salaryInterval ?? '',
        applyUrl: this.job.applyUrl
      };
      this.store.dispatch(createFavorite({ favorite }));
    }
  }
}
