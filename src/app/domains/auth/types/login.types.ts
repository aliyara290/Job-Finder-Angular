// Complete profile object from database (including password)
export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

// Login request credentials
export interface LoginRequest {
    email: string;
    password: string;
}

// Login response
export interface LoginResponse {
    user: User;
}

// User object for localStorage (excluding password)
export interface AuthUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}
