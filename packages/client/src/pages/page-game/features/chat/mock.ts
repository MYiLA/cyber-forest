import { ChatMessage } from './type'
import avatar1 from '@images/warriors/duck.png'
import avatar2 from '@images/warriors/bear.png'

export const MESSAGES: ChatMessage[] = [
  {
    id: '1',
    userId: '1',
    avatar: avatar1,
    userName: 'УмнаУутка',
    time: '12.30',

    text: 'Как играть-то? :(',
  },
  {
    id: '2',
    userId: '2',
    avatar: avatar2,
    userName: 'Миша',
    time: '12.30',
    text: `
      Да просто нажми на кубик с вопросиками под кнопкой "Сдаться" и почитай.
      Только таймер не профилонь, там всего минута на раздумья есть.
      Ещё вариант есть в лобби уже спокойно почитать + в бестиарии можно ознакомиться с видами воинов,
      которые могут тебе встретиться в киберлесе
    `,
  },
]
