import { UserProfile } from '@prisma/client';
import useSWR from 'swr';
import api from '../../fetch';

async function fetcher() {
  const { data } = await api.get<UserProfile>('/api/profile');
  return data;
}

export function useProfile() {
  return useSWR('/api/profile', fetcher);
}

type ProfileUpdate = Pick<UserProfile, 'bio' | 'avatarUrl' | 'preferences' | 'dietaryRestrictions' | 'notificationSettings'>;

export function useMutateProfile() {
  const { mutate } = useProfile();

  const mutateProfile = async (profileData: Partial<ProfileUpdate>) => {
    const { data: updatedProfile } = await api.patch<UserProfile>('/api/profile', profileData);
    await mutate(updatedProfile, false);
  };

  return { mutateProfile };
} 