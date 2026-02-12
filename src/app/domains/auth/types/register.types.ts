import { User } from './login.types';

// Registration request data
export interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

// Registration response
export interface RegisterResponse {
    user: User;
}
