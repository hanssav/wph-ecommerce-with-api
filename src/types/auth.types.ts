type TokenType = string;

type UserType = {
  id: number;
  name: string;
  password: string;
  email: string;
  avatarUrl?: string;
  avatar?: string;
};

type LoginResponseType = {
  success: string;
  message: string;
  data: {
    token: TokenType;
    user: UserType;
  };
};

export type { TokenType, UserType, LoginResponseType };
