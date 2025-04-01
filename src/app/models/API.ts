/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type UserData = {
  __typename: "UserData",
  address: string,
  birthDate: string,
  createdAt?: string | null,
  email: string,
  firstName: string,
  gender: string,
  id: string,
  lastName: string,
  occupation: string,
  phone: string,
  updatedAt?: string | null,
};

export type UserProfile = {
  __typename: "UserProfile",
  createdAt?: string | null,
  email: string,
  id: string,
  role: string,
  updatedAt?: string | null,
};

export type ModelUserDataFilterInput = {
  address?: ModelStringInput | null,
  and?: Array< ModelUserDataFilterInput | null > | null,
  birthDate?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  email?: ModelStringInput | null,
  firstName?: ModelStringInput | null,
  gender?: ModelStringInput | null,
  id?: ModelIDInput | null,
  lastName?: ModelStringInput | null,
  not?: ModelUserDataFilterInput | null,
  occupation?: ModelStringInput | null,
  or?: Array< ModelUserDataFilterInput | null > | null,
  phone?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelStringInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  _null = "_null",
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
}


export type ModelSizeInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type ModelIDInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelUserDataConnection = {
  __typename: "ModelUserDataConnection",
  items:  Array<UserData | null >,
  nextToken?: string | null,
};

export type ModelUserProfileFilterInput = {
  and?: Array< ModelUserProfileFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  email?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelUserProfileFilterInput | null,
  or?: Array< ModelUserProfileFilterInput | null > | null,
  role?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelUserProfileConnection = {
  __typename: "ModelUserProfileConnection",
  items:  Array<UserProfile | null >,
  nextToken?: string | null,
};

export type ModelUserDataConditionInput = {
  address?: ModelStringInput | null,
  and?: Array< ModelUserDataConditionInput | null > | null,
  birthDate?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  email?: ModelStringInput | null,
  firstName?: ModelStringInput | null,
  gender?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  not?: ModelUserDataConditionInput | null,
  occupation?: ModelStringInput | null,
  or?: Array< ModelUserDataConditionInput | null > | null,
  phone?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateUserDataInput = {
  address: string,
  birthDate: string,
  createdAt?: string | null,
  email: string,
  firstName: string,
  gender: string,
  id?: string | null,
  lastName: string,
  occupation: string,
  phone: string,
  updatedAt?: string | null,
};

export type ModelUserProfileConditionInput = {
  and?: Array< ModelUserProfileConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  email?: ModelStringInput | null,
  not?: ModelUserProfileConditionInput | null,
  or?: Array< ModelUserProfileConditionInput | null > | null,
  role?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateUserProfileInput = {
  createdAt?: string | null,
  email: string,
  id?: string | null,
  role: string,
  updatedAt?: string | null,
};

export type DeleteUserDataInput = {
  id: string,
};

export type DeleteUserProfileInput = {
  id: string,
};

export type UpdateUserDataInput = {
  address?: string | null,
  birthDate?: string | null,
  createdAt?: string | null,
  email?: string | null,
  firstName?: string | null,
  gender?: string | null,
  id: string,
  lastName?: string | null,
  occupation?: string | null,
  phone?: string | null,
  updatedAt?: string | null,
};

export type UpdateUserProfileInput = {
  createdAt?: string | null,
  email?: string | null,
  id: string,
  role?: string | null,
  updatedAt?: string | null,
};

export type ModelSubscriptionUserDataFilterInput = {
  address?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserDataFilterInput | null > | null,
  birthDate?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  firstName?: ModelSubscriptionStringInput | null,
  gender?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  lastName?: ModelSubscriptionStringInput | null,
  occupation?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionUserDataFilterInput | null > | null,
  phone?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionStringInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIDInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionUserProfileFilterInput = {
  and?: Array< ModelSubscriptionUserProfileFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  email?: ModelStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionUserProfileFilterInput | null > | null,
  role?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type GetUserDataQueryVariables = {
  id: string,
};

export type GetUserDataQuery = {
  getUserData?:  {
    __typename: "UserData",
    address: string,
    birthDate: string,
    createdAt?: string | null,
    email: string,
    firstName: string,
    gender: string,
    id: string,
    lastName: string,
    occupation: string,
    phone: string,
    updatedAt?: string | null,
  } | null,
};

export type GetUserProfileQueryVariables = {
  id: string,
};

export type GetUserProfileQuery = {
  getUserProfile?:  {
    __typename: "UserProfile",
    createdAt?: string | null,
    email: string,
    id: string,
    role: string,
    updatedAt?: string | null,
  } | null,
};

export type ListUserDataQueryVariables = {
  filter?: ModelUserDataFilterInput | null,
  id?: string | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListUserDataQuery = {
  listUserData?:  {
    __typename: "ModelUserDataConnection",
    items:  Array< {
      __typename: "UserData",
      address: string,
      birthDate: string,
      createdAt?: string | null,
      email: string,
      firstName: string,
      gender: string,
      id: string,
      lastName: string,
      occupation: string,
      phone: string,
      updatedAt?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListUserProfilesQueryVariables = {
  filter?: ModelUserProfileFilterInput | null,
  id?: string | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListUserProfilesQuery = {
  listUserProfiles?:  {
    __typename: "ModelUserProfileConnection",
    items:  Array< {
      __typename: "UserProfile",
      createdAt?: string | null,
      email: string,
      id: string,
      role: string,
      updatedAt?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CreateUserDataMutationVariables = {
  condition?: ModelUserDataConditionInput | null,
  input: CreateUserDataInput,
};

export type CreateUserDataMutation = {
  createUserData?:  {
    __typename: "UserData",
    address: string,
    birthDate: string,
    createdAt?: string | null,
    email: string,
    firstName: string,
    gender: string,
    id: string,
    lastName: string,
    occupation: string,
    phone: string,
    updatedAt?: string | null,
  } | null,
};

export type CreateUserProfileMutationVariables = {
  condition?: ModelUserProfileConditionInput | null,
  input: CreateUserProfileInput,
};

export type CreateUserProfileMutation = {
  createUserProfile?:  {
    __typename: "UserProfile",
    createdAt?: string | null,
    email: string,
    id: string,
    role: string,
    updatedAt?: string | null,
  } | null,
};

export type DeleteUserDataMutationVariables = {
  condition?: ModelUserDataConditionInput | null,
  input: DeleteUserDataInput,
};

export type DeleteUserDataMutation = {
  deleteUserData?:  {
    __typename: "UserData",
    address: string,
    birthDate: string,
    createdAt?: string | null,
    email: string,
    firstName: string,
    gender: string,
    id: string,
    lastName: string,
    occupation: string,
    phone: string,
    updatedAt?: string | null,
  } | null,
};

export type DeleteUserProfileMutationVariables = {
  condition?: ModelUserProfileConditionInput | null,
  input: DeleteUserProfileInput,
};

export type DeleteUserProfileMutation = {
  deleteUserProfile?:  {
    __typename: "UserProfile",
    createdAt?: string | null,
    email: string,
    id: string,
    role: string,
    updatedAt?: string | null,
  } | null,
};

export type UpdateUserDataMutationVariables = {
  condition?: ModelUserDataConditionInput | null,
  input: UpdateUserDataInput,
};

export type UpdateUserDataMutation = {
  updateUserData?:  {
    __typename: "UserData",
    address: string,
    birthDate: string,
    createdAt?: string | null,
    email: string,
    firstName: string,
    gender: string,
    id: string,
    lastName: string,
    occupation: string,
    phone: string,
    updatedAt?: string | null,
  } | null,
};

export type UpdateUserProfileMutationVariables = {
  condition?: ModelUserProfileConditionInput | null,
  input: UpdateUserProfileInput,
};

export type UpdateUserProfileMutation = {
  updateUserProfile?:  {
    __typename: "UserProfile",
    createdAt?: string | null,
    email: string,
    id: string,
    role: string,
    updatedAt?: string | null,
  } | null,
};

export type OnCreateUserDataSubscriptionVariables = {
  filter?: ModelSubscriptionUserDataFilterInput | null,
};

export type OnCreateUserDataSubscription = {
  onCreateUserData?:  {
    __typename: "UserData",
    address: string,
    birthDate: string,
    createdAt?: string | null,
    email: string,
    firstName: string,
    gender: string,
    id: string,
    lastName: string,
    occupation: string,
    phone: string,
    updatedAt?: string | null,
  } | null,
};

export type OnCreateUserProfileSubscriptionVariables = {
  email?: string | null,
  filter?: ModelSubscriptionUserProfileFilterInput | null,
};

export type OnCreateUserProfileSubscription = {
  onCreateUserProfile?:  {
    __typename: "UserProfile",
    createdAt?: string | null,
    email: string,
    id: string,
    role: string,
    updatedAt?: string | null,
  } | null,
};

export type OnDeleteUserDataSubscriptionVariables = {
  filter?: ModelSubscriptionUserDataFilterInput | null,
};

export type OnDeleteUserDataSubscription = {
  onDeleteUserData?:  {
    __typename: "UserData",
    address: string,
    birthDate: string,
    createdAt?: string | null,
    email: string,
    firstName: string,
    gender: string,
    id: string,
    lastName: string,
    occupation: string,
    phone: string,
    updatedAt?: string | null,
  } | null,
};

export type OnDeleteUserProfileSubscriptionVariables = {
  email?: string | null,
  filter?: ModelSubscriptionUserProfileFilterInput | null,
};

export type OnDeleteUserProfileSubscription = {
  onDeleteUserProfile?:  {
    __typename: "UserProfile",
    createdAt?: string | null,
    email: string,
    id: string,
    role: string,
    updatedAt?: string | null,
  } | null,
};

export type OnUpdateUserDataSubscriptionVariables = {
  filter?: ModelSubscriptionUserDataFilterInput | null,
};

export type OnUpdateUserDataSubscription = {
  onUpdateUserData?:  {
    __typename: "UserData",
    address: string,
    birthDate: string,
    createdAt?: string | null,
    email: string,
    firstName: string,
    gender: string,
    id: string,
    lastName: string,
    occupation: string,
    phone: string,
    updatedAt?: string | null,
  } | null,
};

export type OnUpdateUserProfileSubscriptionVariables = {
  email?: string | null,
  filter?: ModelSubscriptionUserProfileFilterInput | null,
};

export type OnUpdateUserProfileSubscription = {
  onUpdateUserProfile?:  {
    __typename: "UserProfile",
    createdAt?: string | null,
    email: string,
    id: string,
    role: string,
    updatedAt?: string | null,
  } | null,
};
