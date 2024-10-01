export const environment = {
  production: false,
  serverUrl: '/api',
  keycloak: {
    // Url of the Identity Provider
    issuer: 'http://localhost:9001',
    // Realm
    realm: 'shopshop',
    clientId: 'shopshop',
  },
};
