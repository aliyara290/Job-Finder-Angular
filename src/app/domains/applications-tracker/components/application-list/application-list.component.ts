import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Application, ApplicationStatus } from '../../types/application.types';
import { selectAllApplications, selectApplicationsLoading } from '../../store/application.selectors';
import { removeApplication, updateApplicationStatus } from '../../store/application.actions';
import { AsyncPipe, TitleCasePipe } from '@angular/common';

@Component({
    selector: 'app-application-list',
    imports: [AsyncPipe, TitleCasePipe],
    templateUrl: './application-list.component.html',
})
export class ApplicationListComponent {
    applications$: Observable<Application[]>;
    loading$: Observable<boolean>;

    readonly statuses: ApplicationStatus[] = ['pending', 'accepted', 'rejected'];

    constructor(private store: Store) {
        this.applications$ = this.store.select(selectAllApplications);
        this.loading$ = this.store.select(selectApplicationsLoading);
    }

    changeStatus(id: string, status: ApplicationStatus): void {
        this.store.dispatch(updateApplicationStatus({ id, status }));
    }

    remove(id: string): void {
        this.store.dispatch(removeApplication({ id }));
    }

    statusClass(status: ApplicationStatus): string {
        return {
            pending: 'bg-yellow-100 text-yellow-800',
            accepted: 'bg-green-100 text-green-800',
            rejected: 'bg-red-100 text-red-800'
        }[status];
    }

    statusDot(status: ApplicationStatus): string {
        return {
            pending: 'bg-yellow-400',
            accepted: 'bg-green-400',
            rejected: 'bg-red-400'
        }[status];
    }
}
