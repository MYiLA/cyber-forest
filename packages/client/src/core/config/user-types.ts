/** Это временное решение для SSR пока не будет нормальной авторизации */
export const fakeUser: User = {
  id: 234234,
  first_name: 'John',
  second_name: 'Doe',
  display_name: 'JohnDoe',
  login: 'johndoe',
  avatar:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl3egGxdmwBDHw1LA4M6nACi5EujtohHiM7j3R1DpVOJ26D81M5Ru1bFYFqmcavzS_XR4&usqp=CAU',
  email: 'john@doe.com',
  phone: '+7961234534',
}

export type User = {
  id?: number
  first_name: string
  second_name: string
  display_name?: string
  login: string
  avatar?: string
  email: string
  phone: string
}

export type UserLogin = {
  login: string
  password: string
}

export type UserRegister = {
  first_name: string
  second_name: string
  display_name?: string
  login: string
  avatar?: string
  email: string
  phone: string
}
