import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { selectAllApplications } from '../../store/application.selectors';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-application-stats',
    imports: [AsyncPipe],
    template: `
    @if (stats$ | async; as stats) {
      <div class="flex items-center gap-3 flex-wrap">
        <div class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-5 py-3 text-center min-w-[80px]">
          <p class="text-2xl font-bold text-white">{{ stats.total }}</p>
          <p class="text-purple-300 text-xs mt-0.5">Total</p>
        </div>
        <div class="bg-yellow-400/10 border border-yellow-400/30 rounded-2xl px-5 py-3 text-center min-w-[80px]">
          <p class="text-2xl font-bold text-yellow-300">{{ stats.pending }}</p>
          <p class="text-yellow-300/70 text-xs mt-0.5">Pending</p>
        </div>
        <div class="bg-green-400/10 border border-green-400/30 rounded-2xl px-5 py-3 text-center min-w-[80px]">
          <p class="text-2xl font-bold text-green-300">{{ stats.accepted }}</p>
          <p class="text-green-300/70 text-xs mt-0.5">Accepted</p>
        </div>
        <div class="bg-red-400/10 border border-red-400/30 rounded-2xl px-5 py-3 text-center min-w-[80px]">
          <p class="text-2xl font-bold text-red-300">{{ stats.rejected }}</p>
          <p class="text-red-300/70 text-xs mt-0.5">Rejected</p>
        </div>
      </div>
    }
  `
})
export class ApplicationStatsComponent {
    stats$: Observable<{ total: number; pending: number; accepted: number; rejected: number }>;

    constructor(private store: Store) {
        this.stats$ = this.store.select(selectAllApplications).pipe(
            map(apps => ({
                total: apps.length,
                pending: apps.filter(a => a.status === 'pending').length,
                accepted: apps.filter(a => a.status === 'accepted').length,
                rejected: apps.filter(a => a.status === 'rejected').length,
            }))
        );
    }
}
