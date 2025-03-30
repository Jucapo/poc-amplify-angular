import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { Amplify } from 'aws-amplify';
import outputs from './amplify_outputs.json';

// Configuración CORRECTA para Amplify Gen 2:
Amplify.configure(outputs); // Solo esto es necesario

console.log('Current Auth Config:', Amplify.getConfig().Auth);

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err),
);
