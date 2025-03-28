// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import {
  AmplifyAuthenticatorModule,
  AuthenticatorService,
} from '@aws-amplify/ui-angular';
import { fetchUserAttributes } from 'aws-amplify/auth'; // Cambiado a fetchUserAttributes
import { generateClient } from 'aws-amplify/data';
import { type Schema } from '../../amplify/data/resource';

const client = generateClient<Schema>();

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AmplifyAuthenticatorModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    public authenticator: AuthenticatorService,
    private router: Router,
  ) {}

  async ngOnInit() {
    this.checkAuthStatus();

    this.authenticator.subscribe(() => {
      this.checkAuthStatus();
    });
  }

  async checkAuthStatus() {
    const authStatus = await this.authenticator.authStatus;
    if (authStatus === 'authenticated') {
      await this.redirectBasedOnRole();
    }
  }

  async redirectBasedOnRole() {
    try {
      // Obtener el usuario actual
      const userAttributes = await fetchUserAttributes();
      const email = userAttributes.email;

      if (!email) {
        throw new Error('No email found');
      }

      // Consultar DynamoDB para obtener el rol
      const { data: profiles } = await client.models.UserProfile.list({
        filter: { email: { eq: email } },
      });

      const role = profiles[0]?.role || 'user';

      // Redirección basada en rol
      if (role === 'admin' && !this.router.url.includes('/admin')) {
        this.router.navigate(['/admin']);
      } else if (role === 'user' && !this.router.url.includes('/profile')) {
        this.router.navigate(['/profile']);
      }

      // Crear perfil si no existe (opcional)
      if (profiles.length === 0) {
        await this.createUserProfile(email);
      }
    } catch (error) {
      console.error('Error determining role:', error);
      this.router.navigate(['/profile']); // Redirección por defecto
    }
  }

  private async createUserProfile(email: string) {
    try {
      // Verificar si es el primer usuario (para hacerlo admin)
      const { data: allProfiles } = await client.models.UserProfile.list();
      const isFirstUser = allProfiles.length === 0;

      await client.models.UserProfile.create({
        email: email,
        role: isFirstUser ? 'admin' : 'user',
      });
    } catch (error) {
      console.error('Error creating user profile:', error);
    }
  }
}
