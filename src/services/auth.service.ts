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
    const formData = new FormData();

    formData.append('name', user.name);
    formData.append('email', user.email);
    formData.append('password', user.password);

    const defaultAvatar =
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-png%2Favatar&psig=AOvVaw2kyq-Ih132RtCXTdK_qeeq&ust=1759373554721000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCOIv7a__gZADFQAAAAAdAAAAABAE';

    formData.append('avatarUrl', user.avatarUrl || defaultAvatar);

    const res = await api.post('/auth/register', formData);
    return res.data;
  },

  getMe: async (): Promise<MeResponse> => {
    const res = await api.get('/me');
    return res.data;
  },
  updateMe: async () => {},
};
