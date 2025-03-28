// src/app/core/auth.service.ts
import { Injectable } from '@angular/core';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/data';
import { type Schema } from '../../../amplify/data/resource';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private client = generateClient<Schema>();

  async getCurrentUserWithRole() {
    try {
      const { email } = await fetchUserAttributes();
      if (!email) throw new Error('Email no disponible');

      const { data: profiles } = await this.client.models.UserProfile.list({
        filter: { email: { eq: email } },
      });

      return profiles[0] || (await this.createUserProfile(email));
    } catch (error) {
      console.error('Error en AuthService:', error);
      return null;
    }
  }

  private async createUserProfile(email: string) {
    const { data: newProfile } = await this.client.models.UserProfile.create({
      email,
      role: (await this.isFirstUser()) ? 'admin' : 'user',
    });
    return newProfile;
  }

  private async isFirstUser() {
    const { data: profiles } = await this.client.models.UserProfile.list();
    return profiles.length === 0;
  }
}
