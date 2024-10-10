export const environment = {
  production: false,
  serverUrl: '/api',
  keycloak: {
    // Url of the Identity Provider
    server: 'http://localhost:9001',
    // Realm
    realm: 'shopshop',
    clientId: 'shopshop-front',
    redirectUri : 'http://localhost:4200/home',
    responseType : 'code',
    scope : 'openid email profile',
    kcIdpHint : 'google'
  },
};
