import { api } from '@/api';
import { LoginResponseType, MeResponse, UserType } from '@/types';

type LoginPayload = Pick<UserType, 'email' | 'password'>;
type RegisterType = Omit<UserType, 'id'>;

export const userService = {
  login: async (user: LoginPayload): Promise<LoginResponseType> => {
    const res = await api.post('/auth/login', user);
    return res.data;
  },
  register: async (user: RegisterType) => {
    const res = await api.post('/auth/register', user);
    return res.data;
  },
  getMe: async (): Promise<MeResponse> => {
    const res = await api.get('/me');
    return res.data;
  },
  updateMe: async () => {},
};
