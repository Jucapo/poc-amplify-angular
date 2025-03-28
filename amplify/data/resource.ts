import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  UserProfile: a
    .model({
      email: a.string().required(),
      role: a.string().required().default('user'),
    })
    .authorization((allow) => [
      allow.authenticated(),
      allow.ownerDefinedIn('email'), // Dueño basado en email
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({ schema });
