import { createAction, props } from '@ngrx/store';
import { Application, ApplicationStatus } from '../types/application.types';

export const loadApplications = createAction('[Applications] Load Applications', props<{ userId: string }>());
export const loadApplicationsSuccess = createAction('[Applications] Load Applications Success', props<{ applications: Application[] }>());
export const loadApplicationsFailure = createAction('[Applications] Load Applications Failure', props<{ error: any }>());

export const createApplication = createAction('[Applications] Create Application', props<{ application: Application }>());
export const createApplicationSuccess = createAction('[Applications] Create Application Success', props<{ application: Application }>());
export const createApplicationFailure = createAction('[Applications] Create Application Failure', props<{ error: any }>());

export const removeApplication = createAction('[Applications] Remove Application', props<{ id: string }>());
export const removeApplicationSuccess = createAction('[Applications] Remove Application Success', props<{ id: string }>());
export const removeApplicationFailure = createAction('[Applications] Remove Application Failure', props<{ error: any }>());

export const updateApplicationStatus = createAction('[Applications] Update Status', props<{ id: string; status: ApplicationStatus }>());
export const updateApplicationStatusSuccess = createAction('[Applications] Update Status Success', props<{ application: Application }>());
export const updateApplicationStatusFailure = createAction('[Applications] Update Status Failure', props<{ error: any }>());
