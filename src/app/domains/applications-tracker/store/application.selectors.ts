import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ApplicationState } from './application.reducers';

export const selectApplicationState = createFeatureSelector<ApplicationState>('applications');

export const selectAllApplications = createSelector(
    selectApplicationState,
    state => state.applications
);

export const selectApplicationsLoading = createSelector(
    selectApplicationState,
    state => state.loading
);

export const selectApplicationsCount = createSelector(
    selectAllApplications,
    apps => apps.length
);
