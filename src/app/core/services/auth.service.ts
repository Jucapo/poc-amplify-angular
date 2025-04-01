import { Injectable } from '@angular/core';
import {
  fetchUserAttributes,
  fetchAuthSession,
  signOut as amplifySignOut,
} from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/data';
import { type Schema } from '../../../../amplify/data/resource';
import { Router } from '@angular/router';
import { UserProfile } from '../../models/API';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private client = generateClient<Schema>();
  private currentProfile: UserProfile | null = null;
  private readonly DEFAULT_ROLE = 'user';

  constructor(private router: Router) {
    // Inicializa el cliente solo después de asegurar que Amplify está configurado
    try {
      this.client = generateClient<Schema>();
      console.log('GraphQL client initialized successfully');
    } catch (error) {
      console.error('Error initializing GraphQL client:', error);
      throw new Error('Failed to initialize GraphQL client');
    }
  }

  /**
   * Verifica si el usuario está autenticado
   */
  async isAuthenticated(): Promise<boolean> {
    try {
      const { tokens } = await fetchAuthSession();
      return !!tokens?.accessToken;
    } catch (error) {
      console.error('Error verificando autenticación:', error);
      return false;
    }
  }

  /**
   * Limpia la caché del perfil
   */
  clearCache(): void {
    this.currentProfile = null;
    console.log('Cache de usuario limpiado');
  }

  /**
   * Obtiene el rol del usuario actual con manejo de errores mejorado
   */
  async getCurrentUserRole(): Promise<string> {
    try {
      const profile = await this.getCurrentUserProfile();
      return profile?.role || this.DEFAULT_ROLE;
    } catch (error) {
      console.error('Error obteniendo rol:', error);
      return this.DEFAULT_ROLE;
    }
  }

  /**
   * Obtiene el perfil completo del usuario con caché y reintentos
   */

  async getCurrentUserProfile() {
    try {
      const { email } = await fetchUserAttributes();
      if (!email) throw new Error('Email no disponible');

      // Verificar que el cliente esté definido
      if (!this.client) {
        throw new Error('GraphQL client no está inicializado');
      }

      const { data: profiles, errors } =
        await this.client.models.UserProfile.list({
          filter: { email: { eq: email } },
        });

      if (errors) {
        console.error('Errors fetching profile:', errors);
        throw new Error(errors.map((e) => e.message).join(', '));
      }

      return profiles?.[0] || null;
    } catch (error) {
      console.error('Error obteniendo perfil:', error);
      throw error;
    }
  }

  /**
   * Obtiene el email del usuario actual
   */
  async getCurrentUserEmail(): Promise<string | null> {
    try {
      const { email } = await fetchUserAttributes();
      return email || null;
    } catch (error) {
      console.error('Error obteniendo email:', error);
      return null;
    }
  }

  /**
   * Cierra la sesión del usuario con manejo de estado limpio
   */
  async signOut(): Promise<void> {
    try {
      await amplifySignOut();
      this.clearCache();
      this.router.navigate(['/sign-in']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      // Forzamos limpieza incluso si falla el signOut
      this.clearCache();
      this.router.navigate(['/sign-in']);
      throw error;
    }
  }
}
