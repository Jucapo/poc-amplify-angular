import { defineAuth } from '@aws-amplify/backend';

export const auth = defineAuth({
  loginWith: {
    email: {
      verificationEmailSubject: 'Verifica tu email',
    },
  },
  userAttributes: {
    email: {
      required: true,
    },
  },
});
