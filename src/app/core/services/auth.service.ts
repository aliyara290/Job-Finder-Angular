import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../../environments/environement.dev';
import { Observable, throwError } from 'rxjs';
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

  constructor(private http: HttpClient) { }

  /**
   * Login user with email and password
   * Searches for user in JSON-Server database and stores session in localStorage
   */
  login(credentials: LoginRequest): Observable<AuthUser> {
    // JSON-Server GET with query parameters to find matching user
    return this.http
      .get<User[]>(`${this.LocalAPI}/users`, {
        params: {
          email: credentials.email,
          password: credentials.password,
        },
      })
      .pipe(
        map((users: User[]) => {
          if (users && users.length > 0) {
            const user = users[0];
            // Store user in localStorage (without password)
            this.storeUser(user);
            // Return AuthUser (without password)
            return this.createAuthUser(user);
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

  /**
   * Register a new user
   * Creates a new user in JSON-Server database
   */
  register(userData: RegisterRequest): Observable<User> {
    // Create user object with a generated ID
    const newUser: Omit<User, 'id'> = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password,
    };

    // JSON-Server POST automatically generates an ID
    return this.http.post<User>(`${this.LocalAPI}/users`, newUser).pipe(
      tap((user: User) => {
        console.log('User registered successfully:', user.email);
      }),
      catchError((error) => {
        console.error('Registration error:', error);
        return throwError(
          () => new Error('Registration failed. Please try again.')
        );
      })
    );
  }

  /**
   * Get current authenticated user from localStorage
   */
  getCurrentUser(): AuthUser | null {
    const userJson = localStorage.getItem(this.STORAGE_KEY);
    if (userJson) {
      try {
        return JSON.parse(userJson) as AuthUser;
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
        this.clearUser();
        return null;
      }
    }
    return null;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  /**
   * Logout user and clear session
   */
  logout(): void {
    this.clearUser();
  }

  /**
   * Store user in localStorage (private helper method)
   * Excludes password field for security
   */
  private storeUser(user: User): void {
    const authUser = this.createAuthUser(user);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(authUser));
  }

  /**
   * Create AuthUser object from User (excluding password)
   */
  private createAuthUser(user: User): AuthUser {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
  }

  /**
   * Clear user from localStorage (private helper method)
   */
  private clearUser(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
