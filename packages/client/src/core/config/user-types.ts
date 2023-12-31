export type UserSettings = {
  theme: string;
};

export type User = {
  id?: number;
  first_name: string;
  second_name: string;
  display_name?: string;
  login: string;
  avatar?: string;
  email: string;
  phone: string;
  settings?: UserSettings | null;
};

export type UserLogin = {
  login: string;
  password: string;
};

export type UserRegister = {
  first_name: string;
  second_name: string;
  display_name?: string;
  login: string;
  avatar?: string;
  email: string;
  phone: string;
  settings?: UserSettings | null;
};

export type UserPassword = {
  oldPassword: string;
  newPassword: string;
};
