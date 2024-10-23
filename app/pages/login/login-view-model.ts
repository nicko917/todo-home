import { Observable } from '@nativescript/core';
import { AuthService } from '../../services/auth.service';
import { Frame } from '@nativescript/core'; // Frame es lo correcto para la navegación

export class LoginViewModel extends Observable {
  private authService: AuthService;
  email: string = '';
  password: string = '';

  constructor() {
    super();
    this.authService = AuthService.getInstance();
  }

  async onSignIn() {
    try {
      await this.authService.signIn(this.email, this.password);
      Frame.topmost().navigate({
        moduleName: 'pages/home/home-page',
        clearHistory: true, // Esto limpiará el historial
      });
    } catch (error) {
      console.error('Login error:', error);
      // Manejo de error aquí (por ejemplo, mostrar un mensaje al usuario)
    }
  }

  onNavigateToSignUp() {
    Frame.topmost().navigate({
      moduleName: 'pages/signup/signup-page',
    });
  }
}
