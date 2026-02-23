import { Application } from '../types/application.types';
import { createReducer, on } from '@ngrx/store';
import * as ApplicationAction from './application.actions';

export interface ApplicationState {
    applications: Application[];
    loading: boolean;
    error: any;
}

const initialState: ApplicationState = {
    applications: [],
    loading: false,
    error: null
};

export const applicationReducer = createReducer(
    initialState,

    on(ApplicationAction.loadApplications, state => ({ ...state, loading: true, error: null })),
    on(ApplicationAction.loadApplicationsSuccess, (state, { applications }) => ({ applications, loading: false, error: null })),
    on(ApplicationAction.loadApplicationsFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(ApplicationAction.createApplication, state => ({ ...state, loading: true, error: null })),
    on(ApplicationAction.createApplicationSuccess, (state, { application }) => ({
        ...state,
        applications: [...state.applications, application],
        loading: false,
        error: null
    })),
    on(ApplicationAction.createApplicationFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(ApplicationAction.removeApplication, state => ({ ...state, loading: true, error: null })),
    on(ApplicationAction.removeApplicationSuccess, (state, { id }) => ({
        ...state,
        applications: state.applications.filter(a => a.id !== id),
        loading: false,
        error: null
    })),
    on(ApplicationAction.removeApplicationFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(ApplicationAction.updateApplicationStatus, state => ({ ...state, loading: true, error: null })),
    on(ApplicationAction.updateApplicationStatusSuccess, (state, { application }) => ({
        ...state,
        applications: state.applications.map(a => a.id === application.id ? application : a),
        loading: false,
        error: null
    })),
    on(ApplicationAction.updateApplicationStatusFailure, (state, { error }) => ({ ...state, loading: false, error }))
);
