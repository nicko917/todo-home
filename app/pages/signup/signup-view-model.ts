import { Observable } from '@nativescript/core';
import { AuthService } from '../../services/auth.service';
import { Frame } from '@nativescript/core';

export class SignupViewModel extends Observable {
  private authService: AuthService;
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor() {
    super();
    this.authService = AuthService.getInstance();
  }

  async onSignUp() {
    if (this.password !== this.confirmPassword) {
      // Show error dialog
      return;
    }

    try {
      await this.authService.signUp(this.email, this.password);
      Frame.topmost().navigate({
        moduleName: 'pages/login/login-page',
        clearHistory: true, // Limpia el historial de navegación
      });
    } catch (error) {
      console.error('Signup error:', error);
      // Show error dialog
    }
  }

  onNavigateToLogin() {
    Frame.topmost().navigate({
      moduleName: 'pages/login/login-page',
      clearHistory: true,
    });
  }
}
