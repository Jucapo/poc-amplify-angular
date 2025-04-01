import { Injectable } from '@angular/core';
import { generateClient } from 'aws-amplify/data';
import { Schema } from '../../../../amplify/data/resource';
import {
  CreateUserDataInput,
  UpdateUserDataInput,
  UpdateUserProfileInput,
  UserData,
  UserProfile,
} from '../../models/API';
import { AuthService } from './auth.service';

const client = generateClient<Schema>();

@Injectable({ providedIn: 'root' })
export class UserDataService {
  constructor(private authService: AuthService) {}

  async createUserProfile(email: string, role = 'user'): Promise<UserProfile> {
    console.log(
      '🚀 ~ UserDataService ~ createUserProfile ~ createUserProfile:',
      email,
      role,
    );
    const input = {
      email: email ?? '',
      role: role,
    };

    const { data, errors } = await client.models.UserProfile.create(input);
    if (errors) {
      console.log('🚀 ~ UserDataService ~ createUserProfile ~ errors:', errors);
      throw new Error(errors.map((e) => e.message).join(', '));
    }

    return {
      __typename: 'UserProfile',
      id: data!.id,
      email: data!.email ?? '',
      role: data!.role || 'user',
      createdAt: data!.createdAt ?? new Date().toISOString(),
      updatedAt: data!.updatedAt ?? new Date().toISOString(),
    };
  }

  async updateUserProfile(input: UpdateUserProfileInput): Promise<UserProfile> {
    const fixedInput = {
      ...input,
      email: input.email ?? '',
      role: input.role ?? 'user',
    };

    const { data, errors } = await client.models.UserProfile.update(fixedInput);
    if (errors) throw new Error(errors.map((e) => e.message).join(', '));

    return {
      __typename: 'UserProfile',
      id: data!.id,
      email: data!.email ?? '',
      role: data!.role ?? 'user',
      createdAt: data!.createdAt ?? new Date().toISOString(),
      updatedAt: data!.updatedAt ?? new Date().toISOString(),
    };
  }

  async saveUserData(userData: CreateUserDataInput): Promise<UserData> {
    const input = {
      email: userData.email ?? '',
      firstName: userData.firstName ?? '',
      lastName: userData.lastName ?? '',
      phone: userData.phone ?? '',
      address: userData.address ?? '',
      birthDate: userData.birthDate ?? '',
      gender: userData.gender ?? '',
      occupation: userData.occupation ?? '',
    };
    console.log('🚀 ~ UserDataService ~ saveUserData ~ input:', userData);

    const { data, errors } = await client.models.UserData.create(input);
    console.log('Response:', { data, errors });
    if (errors) {
      console.log('🚀 ~ UserDataService ~ saveUserData ~ errors:', errors);
      throw new Error(errors.map((e) => e.message).join(', '));
    }

    return {
      __typename: 'UserData',
      id: data!.id,
      email: data!.email ?? '',
      firstName: data!.firstName ?? '',
      lastName: data!.lastName ?? '',
      phone: data!.phone ?? '',
      address: data!.address ?? '',
      birthDate: data!.birthDate ?? '',
      gender: data!.gender ?? '',
      occupation: data!.occupation ?? '',
      createdAt: data!.createdAt ?? new Date().toISOString(),
      updatedAt: data!.updatedAt ?? new Date().toISOString(),
    };
  }

  async updateUserData(
    id: string,
    updatedData: UpdateUserDataInput,
  ): Promise<UserData> {
    // First check if the item exists
    const existingItem = await client.models.UserData.get({ id });
    if (!existingItem.data) {
      throw new Error(`UserData with id ${id} not found`);
    }

    // Then proceed with update
    const input = {
      id,
      email: updatedData.email ?? existingItem.data.email ?? '',
      firstName: updatedData.firstName ?? existingItem.data.firstName ?? '',
      lastName: updatedData.lastName ?? existingItem.data.lastName ?? '',
      phone: updatedData.phone ?? existingItem.data.phone ?? '',
      address: updatedData.address ?? existingItem.data.address ?? '',
      birthDate: updatedData.birthDate ?? existingItem.data.birthDate ?? '',
      gender: updatedData.gender ?? existingItem.data.gender ?? '',
      occupation: updatedData.occupation ?? existingItem.data.occupation ?? '',
      createdAt: existingItem.data.createdAt ?? new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const { data, errors } = await client.models.UserData.update(input);
    if (errors) throw new Error(errors.map((e) => e.message).join(', '));

    return data as UserData;
  }

  async getCompleteUserProfile(): Promise<{
    profile: UserProfile;
    data: UserData;
  } | null> {
    const email = await this.authService.getCurrentUserEmail();
    if (!email) return null;

    const profileResult = await client.models.UserProfile?.list({
      filter: { email: { eq: email } },
    });
    console.log(
      '🚀 ~ UserDataService ~ getCompleteUserProfile ~ client.models:',
      client.models,
    );

    const dataResult = await client.models.UserData?.list({
      filter: { email: { eq: email } },
    });

    // Initialize with default values if not found
    let profile: UserProfile = profileResult?.data?.length
      ? {
          __typename: 'UserProfile',
          id: profileResult.data[0].id,
          email: profileResult.data[0].email ?? email,

          role: profileResult.data[0].role ?? 'user',
          createdAt:
            profileResult.data[0].createdAt ?? new Date().toISOString(),
          updatedAt:
            profileResult.data[0].updatedAt ?? new Date().toISOString(),
        }
      : await this.createUserProfile(email);
    console.log(
      '🚀 ~ UserDataService ~ getCompleteUserProfile ~ profile:',
      profile,
    );
    let data: UserData = dataResult?.data?.length
      ? {
          __typename: 'UserData',
          id: dataResult.data[0].id,
          email: dataResult.data[0].email ?? email,
          firstName: dataResult.data[0].firstName ?? '',
          lastName: dataResult.data[0].lastName ?? '',
          phone: dataResult.data[0].phone ?? '',
          address: dataResult.data[0].address ?? '',
          birthDate: dataResult.data[0].birthDate ?? '',
          gender: dataResult.data[0].gender ?? '',
          occupation: dataResult.data[0].occupation ?? '',
          createdAt: dataResult.data[0].createdAt ?? new Date().toISOString(),
          updatedAt: dataResult.data[0].updatedAt ?? new Date().toISOString(),
        }
      : await this.saveUserData(this.createEmptyUserData(email));
    console.log('🚀 ~ UserDataService ~ getCompleteUserProfile ~ data:', data);
    return {
      profile,
      data,
    };
  }

  async getAllUsers(): Promise<UserAdminProfileWithUsersData | null> {
    const email = await this.authService.getCurrentUserEmail();
    if (!email) return null;

    const profilesResult = await client.models.UserProfile.list();

    const dataResult = await client.models.UserData.list();

    return {
      profiles:
        profilesResult.data.map((userData) => ({
          __typename: 'UserProfile',
          id: userData.id,
          email: userData.email,
          role: userData.role ?? 'user',
          createdAt: userData.createdAt ?? new Date().toISOString(),
          updatedAt: userData.updatedAt ?? new Date().toISOString(),
        })) ?? [],
      data:
        dataResult.data.map((userData) => ({
          __typename: 'UserData',
          id: userData.id,
          email: userData.email ?? '',
          firstName: userData.firstName ?? '',
          lastName: userData.lastName ?? '',
          phone: userData.phone ?? '',
          address: userData.address ?? '',
          birthDate: userData.birthDate ?? '',
          gender: userData.gender ?? '',
          occupation: userData.occupation ?? '',
          createdAt: userData.createdAt ?? new Date().toISOString(),
          updatedAt: userData.updatedAt ?? new Date().toISOString(),
        })) ?? [],
    };
  }

  private createEmptyUserData(email: string): UserData {
    return {
      __typename: 'UserData',
      id: 'temp-id',
      email,
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      birthDate: '',
      gender: '',
      occupation: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }
}

export interface UserAdminProfileWithUsersData {
  profiles: UserProfile[];
  data: UserData[];
}
