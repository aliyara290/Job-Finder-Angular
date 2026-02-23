import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Application, ApplicationStatus } from '../types/application.types';
import { environments } from '../../../../environments/environement.dev';

@Injectable({
    providedIn: 'root'
})
export class ApplicationService {
    private readonly LOCAL_API = environments.LOCAL_BACKEND_API;

    constructor(private http: HttpClient) { }

    getApplications(userId: string): Observable<Application[]> {
        return this.http.get<Application[]>(`${this.LOCAL_API}/userApplications`, { params: { userId } });
    }

    createApplication(application: Application): Observable<Application> {
        return this.http.post<Application>(`${this.LOCAL_API}/userApplications`, application);
    }

    removeApplication(id: string): Observable<Application> {
        return this.http.delete<Application>(`${this.LOCAL_API}/userApplications/${id}`);
    }

    updateApplicationStatus(id: string, status: ApplicationStatus): Observable<Application> {
        return this.http.patch<Application>(`${this.LOCAL_API}/userApplications/${id}`, { status });
    }
}
