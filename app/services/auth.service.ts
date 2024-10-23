import { firebase } from '@nativescript/firebase-core';
import '@nativescript/firebase-auth';
import { Observable } from '@nativescript/core';
import { BehaviorSubject } from 'rxjs'; // Correcta importación

export class AuthService extends Observable {
  private static instance: AuthService;
  private currentUserSubject = new BehaviorSubject<any>(null);

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  constructor() {
    super();
    // Firebase se inicializa automáticamente, no necesitas hacerlo manualmente.
  }

  async signUp(email: string, password: string): Promise<void> {
    try {
      const userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      this.currentUserSubject.next(userCredential.user);
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  }

  async signIn(email: string, password: string): Promise<void> {
    try {
      const userCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      this.currentUserSubject.next(userCredential.user);
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  }

  async signOut(): Promise<void> {
    try {
      await firebase.auth().signOut();
      this.currentUserSubject.next(null);
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  }

  getCurrentUser() {
    return this.currentUserSubject.value;
  }

  get isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }
}
