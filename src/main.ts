import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { Amplify } from 'aws-amplify';
import outputs from '../amplify_outputs.json';

Amplify.configure(outputs);

// Verify configuration
console.log('Amplify configured with:', {
  endpoint: outputs.data.url,
  region: outputs.data.aws_region,
});

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error('Error al iniciar la aplicación:', err),
);
