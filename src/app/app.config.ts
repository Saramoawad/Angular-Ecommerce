import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import{BrowserAnimationsModule, provideAnimations} from '@angular/platform-browser/animations'
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers:
   [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes, withViewTransitions()),
      provideClientHydration(withEventReplay()),
        provideHttpClient(withFetch()),
      importProvidersFrom(BrowserAnimationsModule) //way1
      // provideAnimations() //way2 prefered
      ]
};
