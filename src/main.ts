import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { AppConfig } from './config/app.config';
import { worker } from './mocks/browser';
import { isDevMode } from '@angular/core';

if (isDevMode() && AppConfig.enableMockServiceWorker) {
  worker.start().then(() => {
    platformBrowserDynamic()
      .bootstrapModule(AppModule)
      .catch((err) => console.error(err));
  });
} else
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
