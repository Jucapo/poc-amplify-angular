/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createUserData = /* GraphQL */ `mutation CreateUserData(
  $condition: ModelUserDataConditionInput
  $input: CreateUserDataInput!
) {
  createUserData(condition: $condition, input: $input) {
    address
    birthDate
    createdAt
    email
    firstName
    gender
    id
    lastName
    occupation
    phone
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateUserDataMutationVariables,
  APITypes.CreateUserDataMutation
>;
export const createUserProfile = /* GraphQL */ `mutation CreateUserProfile(
  $condition: ModelUserProfileConditionInput
  $input: CreateUserProfileInput!
) {
  createUserProfile(condition: $condition, input: $input) {
    createdAt
    email
    id
    role
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateUserProfileMutationVariables,
  APITypes.CreateUserProfileMutation
>;
export const deleteUserData = /* GraphQL */ `mutation DeleteUserData(
  $condition: ModelUserDataConditionInput
  $input: DeleteUserDataInput!
) {
  deleteUserData(condition: $condition, input: $input) {
    address
    birthDate
    createdAt
    email
    firstName
    gender
    id
    lastName
    occupation
    phone
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteUserDataMutationVariables,
  APITypes.DeleteUserDataMutation
>;
export const deleteUserProfile = /* GraphQL */ `mutation DeleteUserProfile(
  $condition: ModelUserProfileConditionInput
  $input: DeleteUserProfileInput!
) {
  deleteUserProfile(condition: $condition, input: $input) {
    createdAt
    email
    id
    role
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteUserProfileMutationVariables,
  APITypes.DeleteUserProfileMutation
>;
export const updateUserData = /* GraphQL */ `mutation UpdateUserData(
  $condition: ModelUserDataConditionInput
  $input: UpdateUserDataInput!
) {
  updateUserData(condition: $condition, input: $input) {
    address
    birthDate
    createdAt
    email
    firstName
    gender
    id
    lastName
    occupation
    phone
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateUserDataMutationVariables,
  APITypes.UpdateUserDataMutation
>;
export const updateUserProfile = /* GraphQL */ `mutation UpdateUserProfile(
  $condition: ModelUserProfileConditionInput
  $input: UpdateUserProfileInput!
) {
  updateUserProfile(condition: $condition, input: $input) {
    createdAt
    email
    id
    role
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateUserProfileMutationVariables,
  APITypes.UpdateUserProfileMutation
>;
