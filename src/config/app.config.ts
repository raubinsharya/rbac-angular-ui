import { isDevMode } from '@angular/core';

interface AppConfig {
  enableMockServiceWorker: boolean;
  disablePageReloadOnSubmit: boolean;
  disableLogoutOnFailure: boolean;
  disableSimulateMockService: boolean;
  disableUpdateSimulateMockService: boolean;
  disableSubmitQuoteMockService: boolean;
  disableUpdateSubmitQuoteMockService: boolean;
  [key: string]: boolean;
}

const isDevelopment = isDevMode();

const manualConfig: Partial<AppConfig> = {
  enableMockServiceWorker: false,
  disablePageReloadOnSubmit: false,
  disableLogoutOnFailure: false,
};

export const AppConfig: AppConfig = Object.keys(manualConfig).reduce(
  (acc, key) => {
    acc[key] = isDevelopment && (manualConfig[key] ?? false);
    return acc;
  },
  {} as AppConfig
);
