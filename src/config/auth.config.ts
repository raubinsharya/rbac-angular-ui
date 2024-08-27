import {
  BrowserCacheLocation,
  LogLevel,
  PublicClientApplication,
} from '@azure/msal-browser';
import { environment } from '../environments/environment';

export const msalConfig = {
  auth: {
    clientId: environment.CLIENT_ID,
    tenantId: environment.TENANT_ID,
    authority: `https://login.microsoftonline.com/${environment.TENANT_ID}`,
    redirectUri: environment.REDIRECT_URL,
    postLogoutRedirectUri: environment.REDIRECT_URL,
    navigateToLoginRequestUrl: true, // If "true", will navigate back to the original request location before processing the auth code response.
    pkce: true,
  },
  cache: {
    cacheLocation: BrowserCacheLocation.LocalStorage, // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: any, message: any, containsPii: any) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
        }
      },
    },
    piiLoggingEnabled: false,
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);
