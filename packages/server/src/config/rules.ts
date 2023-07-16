import { Rules } from './types-constants'

export const signupRules: Rules = {
  first_name: {
    rule: /^[A-ZА-Я][a-zA-Zа-яА-Я-]+$/,
    message: 'Некорректное имя. Только буквы или -, первая заглавная',
  },
  second_name: {
    rule: /^[A-ZА-Я][a-zA-Zа-яА-Я-]+$/,
    message: 'Некорректная фамилия. Только буквы или -, первая заглавная',
  },
  login: {
    rule: /^(?![\d+]+$)[a-zа-я0-9+_-]{3,20}$/gi,
    message:
      'Некорректный логин. 3-20 символов без пробелов, буквы обязательно',
  },
  email: {
    rule: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    message: 'Некорректный email. Email в формате ivan@mail.ru',
  },
  phone: {
    rule: /^(?:\+|\d)[0-9]{10,15}$/,
    message: 'Некорректный телефон. 10-15 цифр, можно в начале +',
  },
  password: {
    rule: /^(?=.*\d)(?=.*[A-Z])\S{8,40}$/g,
    message:
      'Некорректный пароль. 8-40 символов, обязательны цифры и заглавные буквы',
  },
}

export const signinRules: Rules = {
  login: signupRules.login,
  password: signupRules.password,
}

export const updateProfileRules: Rules = {
  first_name: signupRules.first_name,
  second_name: signupRules.second_name,
  login: signupRules.login,
  phone: signupRules.phone,
  email: signupRules.email,
  display_name: {
    rule: /^(?![\d+]+$)[a-zа-я0-9+_-]{3,20}$/gi,
    message: 'Некорректный ник. 3-20 символов без пробелов, буквы обязательно',
  },
}
