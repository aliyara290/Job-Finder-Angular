import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login-from',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login-from.component.html',
  styleUrl: './login-from.component.css',
})
export class LoginFromComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    // Clear previous error message
    this.errorMessage = '';

    // Check if form is valid
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    // Set loading state
    this.isLoading = true;

    // Get form values
    const credentials = this.loginForm.value;

    // Call auth service to login
    this.authService.login(credentials).subscribe({
      next: (authUser) => {
        console.log('Login successful:', authUser);
        this.isLoading = false;
        // Navigate to home page after successful login
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.errorMessage = error.message || 'Login failed. Please try again.';
        this.isLoading = false;
      },
    });
  }

  // Helper methods for template
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
