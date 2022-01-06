export const API_URL = process.env.REACT_APP_API_URL as string;
export const JWT_SECRET = 'CLERK CLERK' as string;
import { LogLevel } from '@azure/msal-browser';
export const msalConfig = {
  auth: {
    clientId: '165f5133-3de9-44d4-9518-f0463ac9bcaf',
    authority: 'https://login.microsoftonline.com/organizations',
    redirectUri: 'http://localhost:3000/',
  },
  cache: {
    cacheLocation: 'sessionStorage', // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: LogLevel, message: string, containsPii: boolean) => {
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
  },
};
