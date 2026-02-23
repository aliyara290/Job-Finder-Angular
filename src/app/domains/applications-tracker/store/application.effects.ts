import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { ApplicationService } from '../service/application.service';
import * as ApplicationAction from './application.actions';
import { mergeMap, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ApplicationEffects {

    private actions$ = inject(Actions);
    private applicationService = inject(ApplicationService);

    loadApplications$ = createEffect(() => this.actions$.pipe(
        ofType(ApplicationAction.loadApplications),
        mergeMap(({ userId }) => this.applicationService.getApplications(userId).pipe(
            map(applications => ApplicationAction.loadApplicationsSuccess({ applications })),
            catchError(err => of(ApplicationAction.loadApplicationsFailure({ error: err })))
        ))
    ));

    createApplication$ = createEffect(() => this.actions$.pipe(
        ofType(ApplicationAction.createApplication),
        mergeMap(({ application }) => this.applicationService.createApplication(application).pipe(
            map(response => ApplicationAction.createApplicationSuccess({ application: response })),
            catchError(err => of(ApplicationAction.createApplicationFailure({ error: err })))
        ))
    ));

    removeApplication$ = createEffect(() => this.actions$.pipe(
        ofType(ApplicationAction.removeApplication),
        mergeMap(({ id }) => this.applicationService.removeApplication(id).pipe(
            map(response => ApplicationAction.removeApplicationSuccess({ id: response.id })),
            catchError(() => of(ApplicationAction.removeApplicationFailure({ error: 'Failed to remove application' })))
        ))
    ));

    updateApplicationStatus$ = createEffect(() => this.actions$.pipe(
        ofType(ApplicationAction.updateApplicationStatus),
        mergeMap(({ id, status }) => this.applicationService.updateApplicationStatus(id, status).pipe(
            map(application => ApplicationAction.updateApplicationStatusSuccess({ application })),
            catchError(err => of(ApplicationAction.updateApplicationStatusFailure({ error: err })))
        ))
    ));
}
