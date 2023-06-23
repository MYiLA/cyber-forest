export type TUser = {
  id?: number
  first_name: string
  second_name: string
  display_name?: string
  login: string
  avatar?: string
  email: string
  phone: string
}

export type TUserLogin = {
  login: string
  password: string
}

export type TUserRegister = {
  first_name: string
  second_name: string
  display_name?: string
  login: string
  avatar?: string
  email: string
  phone: string
}
