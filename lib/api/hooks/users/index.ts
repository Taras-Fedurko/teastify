import { User, UserProfile } from '@prisma/client';
import useSWR from 'swr';
import api from '../../fetch';

type UserWithProfile = User & {
  profile: UserProfile | null;
};

async function fetcher() {
  const { data } = await api.get<UserWithProfile[]>('/api/users');
  return data;
}

export function useUsers() {
  return useSWR('/api/users', fetcher);
}

export function useUserById(userId: string) {
  const { data, ...rest } = useUsers();

  return {
    ...rest,
    data: data ? data.find((user: UserWithProfile) => user.id === userId) : null,
  };
} 