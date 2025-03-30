export const environment = {
  production: false,
  amplifyConfig: {
    Auth: {
      Cognito: {
        userPoolId: 'us-east-1_MBb6bu3Y7',
        userPoolClientId: '1rj7b7j2mifa8bbbr4pc1ptka5',
        identityPoolId: 'us-east-1:2e61131b-1d6f-4714-9c8d-63a871e30a09',
        loginWith: {
          email: true, // o username: true según tu configuración
        },
      },
    },
    region: 'us-east-1', // Esta propiedad va al nivel superior
  },
};
