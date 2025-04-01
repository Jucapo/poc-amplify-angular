import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  UserProfile: a
    .model({
      id: a.id().required(),
      email: a.string().required(),
      role: a.string().required(),
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
    })
    .authorization((allow) => [
      allow.authenticated().to(['read', 'create']),
      allow.ownerDefinedIn('email').to(['read', 'update', 'delete']),
      allow.groups(['admin']).to(['read', 'create', 'update', 'delete']),
    ]),
  UserData: a
    .model({
      id: a.id().required(),
      email: a.string().required(),
      firstName: a.string().required(),
      lastName: a.string().required(),
      phone: a.string().required(),
      address: a.string().required(),
      birthDate: a.string().required(),
      gender: a.string().required(),
      occupation: a.string().required(),
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
    })
    .authorization((allow) => [
      allow.authenticated().to(['read', 'create', 'update', 'delete']),
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
