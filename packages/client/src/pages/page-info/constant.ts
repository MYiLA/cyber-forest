import game from '@images/about/game.svg'
import min from '@images/about/min.svg'
import offline from '@images/about/offline.svg'
import online from '@images/about/online.svg'
import players from '@images/about/players.svg'
import mariya from '@images/about/mariya.jpg'
import valeriya from '@images/about/valeriya.png'
import ruslan from '@images/about/ruslan.jpg'
import andrey from '@images/about/andrey.jpg'
import {
  DescriptionCardProps,
  DescriptionDevsCardProps,
} from '@pages/page-info/type'

import styles from './entities/devs-card/devs-card.module.scss'

export const infocards: DescriptionCardProps[] = [
  {
    img: min,
    alt: 'иконка минуты',
    text: 'Время одного боя не больше 30 минут',
  },
  {
    img: players,
    alt: 'иконка игроки',
    text: 'В бою может участвовать максимум 4 игрока',
  },
  {
    img: online,
    alt: 'иконка онлайн игры',
    text: 'Вы можете играть с друзьями онлайн',
  },
  {
    img: offline,
    alt: 'иконка офлайн игры',
    text: 'Поддержка офлайн игры на одном устройстве без сплитскрина',
  },
  {
    img: game,
    alt: 'иконка доступного контроллера',
    text: 'Поддержка управления с клавиатуры, мышки и джойстика',
  },
]

export const devsInfo: DescriptionDevsCardProps[] = [
  {
    img: mariya,
    name: 'Дюбанова Mария',
    subtitle: 'идейный вдохновитель',
    description:
      'Привет) Я Дюбанова Мария, киберразработчик с опытом работы 2 года. ' +
      'Немного полидила на Киберлесе. Ощущения незабываемые :-) Но спать надо было бы побольше',
  },
  {
    img: andrey,
    name: 'Андрей Суворов',
    subtitle: 'по-хардкору',
    description: 'Выполнил 100500 задач из 100 возможных',
    extraClass: styles.personal_reversed,
  },
  {
    img: valeriya,
    name: 'Сударикова Лера',
    subtitle: 'за любой кипишь',
    description:
      'Лера, разработчик в большой фарма - ЦВ Протек. ' +
      'Внесла свою лепту в этот проект (читай: много кодила, много пила кофе, мало спала). ',
  },
  {
    img: ruslan,
    name: 'Руслан Иванов',
    subtitle: 'давайте новую фичу!',
    description:
      'Фронтенд разработчик в компании МТГ Бизнес Решения. Люблю кушать и мотоциклы.',
    extraClass: styles.personal_reversed,
  },
]
