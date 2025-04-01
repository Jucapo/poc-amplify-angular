// src/app/app.config.ts
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { generateClient } from 'aws-amplify/data';
import { type Schema } from '../../amplify/data/resource';
import { provideAnimations } from '@angular/platform-browser/animations';

const client = generateClient<Schema>();

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    importProvidersFrom(AmplifyAuthenticatorModule),
    { provide: 'amplifyClient', useValue: client },
  ],
};
