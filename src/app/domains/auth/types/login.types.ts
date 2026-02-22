export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    user: User;
}

export interface AuthUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}
