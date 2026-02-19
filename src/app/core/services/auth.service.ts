  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { environments } from '../../../environments/environement.dev';
  import {BehaviorSubject, Observable, throwError} from 'rxjs';
  import { map, catchError, tap } from 'rxjs/operators';
  import {
    User,
    LoginRequest,
    AuthUser,
  } from '../../domains/auth/types/login.types';
  import { RegisterRequest } from '../../domains/auth/types/register.types';

  @Injectable({
    providedIn: 'root',
  })
  export class AuthService {
    private LocalAPI: string = environments.LOCAL_BACKEND_API;
    private readonly STORAGE_KEY = 'currentUser';

    private currentUserSubject = new BehaviorSubject<AuthUser | null>(this.getCurrentUser());
    public currentUser$ = this.currentUserSubject.asObservable();

    public isAuthenticated$ = this.currentUser$.pipe(map(user => !!user));

    constructor(private http: HttpClient) { }

    login(credentials: LoginRequest): Observable<AuthUser> {
      return this.http
        .get<User>(`${this.LocalAPI}/users`, {
          params: {
            email: credentials.email,
            password: credentials.password,
          },
        })
        .pipe(
          map((user: User) => {
            if (user) {
              const authUser = this.createAuthUser(user);
              this.storeUser(user);
              this.currentUserSubject.next(authUser);
              return authUser;
            } else {
              throw new Error('Invalid email or password');
            }
          }),
          catchError((error) => {
            console.error('Login error:', error);
            return throwError(
              () => new Error('Login failed. Please check your credentials.')
            );
          })
        );
    }

    register(userData: RegisterRequest): Observable<User> {
      const newUser: Omit<User, 'id'> = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
      };

      return this.http.post<User>(`${this.LocalAPI}/users`, newUser).pipe(
        tap((user: User) => {
          console.log('User registered successfully:', user.email);
        }),
        catchError((error) => {
          return throwError(
            () => new Error('Registration failed. Please try again.')
          );
        })
      );
    }

    getCurrentUser(): AuthUser | null {
      const userJson = localStorage.getItem(this.STORAGE_KEY);
      if (userJson) {
        try {
          return JSON.parse(userJson) as AuthUser;
        } catch (error) {
          this.clearUser();
          return null;
        }
      }
      return null;
    }

    isAuthenticated(): boolean {
      return this.getCurrentUser() !== null;
    }

    logout(): void {
      this.clearUser();
      this.currentUserSubject.next(null);
    }

    private storeUser(user: User): void {
      const authUser = this.createAuthUser(user);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(authUser));
    }

    private createAuthUser(user: User): AuthUser {
      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };
    }

    private clearUser(): void {
      localStorage.removeItem(this.STORAGE_KEY);
    }
  }
