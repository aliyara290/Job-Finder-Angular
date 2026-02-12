import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-register-from',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register-from.component.html',
  styleUrl: './register-from.component.css',
})
export class RegisterFromComponent implements OnInit {
  registerForm!: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  // Custom validator to check if passwords match
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword) {
      return null;
    }

    return password.value === confirmPassword.value
      ? null
      : { passwordMismatch: true };
  }

  onSubmit(): void {
    // Clear previous messages
    this.errorMessage = '';
    this.successMessage = '';

    // Check if form is valid
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    // Set loading state
    this.isLoading = true;

    // Get form values (exclude confirmPassword)
    const { confirmPassword, ...registerData } = this.registerForm.value;

    // Call auth service to register
    this.authService.register(registerData).subscribe({
      next: (user) => {
        console.log('Registration successful:', user);
        this.isLoading = false;
        this.successMessage = 'Registration successful! Redirecting to login...';

        // Navigate to login page after 2 seconds
        setTimeout(() => {
          this.router.navigate(['/auth/login']);
        }, 2000);
      },
      error: (error) => {
        console.error('Registration failed:', error);
        this.errorMessage =
          error.message || 'Registration failed. Please try again.';
        this.isLoading = false;
      },
    });
  }

  // Helper methods for template
  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  get passwordMismatch() {
    return (
      this.registerForm.errors?.['passwordMismatch'] &&
      this.confirmPassword?.touched
    );
  }
}
