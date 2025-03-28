// src/app/app.config.ts
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/data';
import { type Schema } from '../../amplify/data/resource';

// Configuración automática de Gen2
const client = generateClient<Schema>();

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    { provide: 'amplifyClient', useValue: client },
  ],
};
