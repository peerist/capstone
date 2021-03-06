import { initAuth0 } from '@auth0/nextjs-auth0';

export default initAuth0({
  domain: 'peerist-capstone.auth0.com',
  clientId: 'oXGxBeJWGHRv1rAMsi73GPWvxcr0voxQ',
  clientSecret: '0OaoZoq2MuxqzL1TpcpkiLX-PHyZdGhh5878jgB97F-P5MQw4uOLGTabSXyNpKcE',
  scope: 'openid profile',
  redirectUri: 'http://localhost:3000/',
  postLogoutRedirectUri: 'http://localhost:3000/',
  session: {
    // The secret used to encrypt the cookie.
    cookieSecret: '<RANDOMLY_GENERATED_SECRET><RANDOMLY_GENERATED_SECRET>',
    // The cookie lifetime (expiration) in seconds. Set to 8 hours by default.
    cookieLifetime: 60 * 60 * 8,
    // (Optional) The cookie domain this should run on. Leave it blank to restrict it to your domain.
    //cookieDomain: 'your-domain.com',
    // (Optional) SameSite configuration for the session cookie. Defaults to 'lax', but can be changed to 'strict' or 'none'. Set it to false if you want to disable the SameSite setting.
    cookieSameSite: 'lax',
    // (Optional) Store the id_token in the session. Defaults to false.
    storeIdToken: true,
    // (Optional) Store the access_token in the session. Defaults to false.
    storeAccessToken: true,
    // (Optional) Store the refresh_token in the session. Defaults to false.
    storeRefreshToken: true
  },
  oidcClient: {
    // (Optional) Configure the timeout in milliseconds for HTTP requests to Auth0.
    httpTimeout: 2500,
    // (Optional) Configure the clock tolerance in milliseconds, if the time on your server is running behind.
    clockTolerance: 10000
  }
});
