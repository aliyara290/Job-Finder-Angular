import { User } from './login.types';

export interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface RegisterResponse {
    user: User;
}
