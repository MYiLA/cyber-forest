import cat from "@images/warriors/cat.png";
import wolf from "@images/warriors/wolf.png";
import snake from "@images/warriors/snake.png";
import fox from "@images/warriors/fox.png";
import bear from "@images/warriors/bear.png";
import owl from "@images/warriors/owl.png";
import duck from "@images/warriors/duck.png";
import hare from "@images/warriors/hare.png";
import toad from "@images/warriors/toad.png";
import { DiceType } from "@shared/type";
import { Dice } from "./type";

export const COLOR = {
  [DiceType.Cat]: {
    color: "213, 150, 37",
    textColor: "42, 46, 56",
  },
  [DiceType.Wolf]: {
    color: "41, 36, 52",
    textColor: "247, 112, 126",
  },
  [DiceType.Snake]: {
    color: "32, 32, 47",
    textColor: "197, 167, 28",
  },
  [DiceType.Fox]: {
    color: "210, 105, 69",
    textColor: "37, 48, 63",
  },
  [DiceType.Bear]: {
    color: "50, 26, 48",
    textColor: "31, 255, 248",
  },
  [DiceType.Owl]: {
    color: "202, 138, 113",
    textColor: "47, 46, 64",
  },
  [DiceType.Duck]: {
    color: "82, 104, 116",
    textColor: "202, 179, 40",
  },
  [DiceType.Hare]: {
    color: "46, 68, 86",
    textColor: "145, 145, 137",
  },
  [DiceType.Toad]: {
    color: "65, 168, 120",
    textColor: "50, 43, 75",
  },
};

// Библиотека видов воинов. Индекс играет роль порядкового номера добавления нового типа воина.
export const DICES_LIB: Record<string, Dice> = {
  [DiceType.Cat]: {
    id: "1",
    type: DiceType.Cat,
    sides: [
      {
        ...COLOR[DiceType.Cat],
        energyCount: 1,
      },
      {
        ...COLOR[DiceType.Cat],
        energyCount: 1,
      },
      {
        ...COLOR[DiceType.Cat],
        energyCount: 1,
      },
      {
        ...COLOR[DiceType.Cat],
        specialAbilitySymbol: "?",
      },
      {
        image: cat,
        attack: 1,
        defense: 2,
        level: 1,
      },
      {
        image: cat,
        attack: 1,
        defense: 2,
        level: 1,
      },
    ],
    abilities: [
      {
        desc: "Перебросьте этот кубик + 1 кубик на ваш выбор из зоны подготовки",
        abilitySymbol: "?",
      },
    ],
    cost: 1,
    glory: 1,
    activeSide: null,
    img: cat,
    bgImg: COLOR[DiceType.Cat].color,
    title: "Кот",
  },
  [DiceType.Duck]: {
    id: "2",
    type: DiceType.Duck,
    sides: [
      {
        ...COLOR[DiceType.Duck],
        energyCount: 1,
      },
      {
        ...COLOR[DiceType.Duck],
        energyCount: 1,
      },
      {
        ...COLOR[DiceType.Duck],
        energyCount: 2,
      },
      {
        image: duck,
        attack: 2,
        defense: 2,
        level: 1,
      },
      {
        image: duck,
        attack: 2,
        defense: 2,
        level: 1,
        abilitySymbol: "*",
      },
      {
        image: duck,
        attack: 3,
        defense: 3,
        level: 2,
      },
    ],
    abilities: [
      {
        desc: "Когда утку ранили и она отправилась на отдых, вы можете сразу её переместить в зону подготовки",
        abilitySymbol: "*",
      },
    ],
    cost: 3,
    glory: 2,
    activeSide: null,
    img: duck,
    bgImg: COLOR[DiceType.Duck].color,
    title: "Утка",
  },
  [DiceType.Hare]: {
    id: "3",
    type: DiceType.Hare,
    sides: [
      {
        ...COLOR[DiceType.Hare],
        energyCount: 1,
      },
      {
        ...COLOR[DiceType.Hare],
        energyCount: 2,
      },
      {
        image: hare,
        attack: 1,
        defense: 3,
        level: 1,
        abilitySymbol: "*",
      },
      {
        image: hare,
        attack: 1,
        defense: 3,
        level: 1,
        abilitySymbol: "*",
      },
      {
        image: hare,
        attack: 2,
        defense: 4,
        level: 2,
      },
      {
        image: hare,
        attack: 2,
        defense: 4,
        level: 2,
      },
    ],
    abilities: [
      {
        desc: `
          Если заяц отправлен в зону отдыха из за атаки противника, 
          в которой учавствовал  зверь 2 уровня или выше, переместите зайца в зону подготовки
        `,
      },
      {
        desc: `
          Если заяц отправлен в зону отдыха из за атаки противника, 
          то воин самого высокого уровня, который учавствовал в атаке 
          на зайца так же отправляется в зону отдыха. 
          Если таких зверей несколько, атакующий игрок выбирает, 
          кого именно отправить на отдых.
        `,
        abilitySymbol: "*",
      },
    ],
    cost: 5,
    glory: 2,
    activeSide: null,
    img: hare,
    bgImg: COLOR[DiceType.Hare].color,
    title: "Заяц",
  },
  [DiceType.Toad]: {
    id: "4",
    type: DiceType.Toad,
    sides: [
      {
        ...COLOR[DiceType.Toad],
        energyCount: 2,
      },
      {
        ...COLOR[DiceType.Toad],
        energyCount: 2,
      },
      {
        image: toad,
        attack: 2,
        defense: 2,
        level: 1,
      },
      {
        image: toad,
        attack: 4,
        defense: 3,
        level: 2,
      },
      {
        image: toad,
        attack: 4,
        defense: 3,
        level: 2,
        abilitySymbol: "*",
      },
      {
        image: toad,
        attack: 4,
        defense: 3,
        level: 2,
        abilitySymbol: "**",
      },
    ],
    abilities: [
      {
        desc: "Каждый раз, когда вас атакуют, вы можете переместить любого вашего одного воина из зоны отдыха в инвентарь",
        abilitySymbol: "*",
      },
      {
        desc: "Каждый раз, когда вас атакуют, ваши противники могут переместить любого своего одного воина из зоны отдыха в инвентарь",
        abilitySymbol: "**",
      },
    ],
    cost: 2,
    glory: 4,
    activeSide: null,
    img: toad,
    bgImg: COLOR[DiceType.Toad].color,
    title: "Жаба",
  },
  [DiceType.Snake]: {
    id: "5",
    type: DiceType.Snake,
    sides: [
      {
        ...COLOR[DiceType.Snake],
        energyCount: 1,
      },
      {
        ...COLOR[DiceType.Snake],
        energyCount: 2,
      },
      {
        ...COLOR[DiceType.Snake],
        energyCount: 2,
      },
      {
        image: snake,
        attack: 3,
        defense: 2,
        level: 1,
      },
      {
        image: snake,
        attack: 4,
        defense: 3,
        level: 2,
        abilitySymbol: "*",
      },
      {
        image: snake,
        attack: 6,
        defense: 4,
        level: 3,
        abilitySymbol: "*",
      },
    ],
    abilities: [
      {
        desc: "Если змея отправлена на отдых из-за ранения,  сила атаки противника снижается до 0",
      },
      {
        desc: "У этой змеи нет усиленного умения",
        abilitySymbol: "*",
      },
    ],
    cost: 6,
    glory: 3,
    activeSide: null,
    img: snake,
    bgImg: COLOR[DiceType.Snake].color,
    title: "Змея",
  },
  [DiceType.Fox]: {
    id: "6",
    type: DiceType.Fox,
    sides: [
      {
        ...COLOR[DiceType.Fox],
        energyCount: 1,
      },
      {
        ...COLOR[DiceType.Fox],
        energyCount: 2,
      },
      {
        ...COLOR[DiceType.Fox],
        energyCount: 2,
      },
      {
        image: fox,
        attack: 2,
        defense: 4,
        level: 1,
      },
      {
        image: fox,
        attack: 3,
        defense: 5,
        level: 1,
        abilitySymbol: "*",
      },
      {
        image: fox,
        attack: 4,
        defense: 6,
        level: 2,
      },
    ],
    abilities: [
      {
        desc: "Когда лис вызван на поле боя, вы можете немедленно перебросить 1 воина в вашей зоне подготовки. Если у вас выпадет воин, то вы можете его вызвать на поле боя бесплатно",
      },
      {
        desc: "У этого лиса нет усиленного умения",
        abilitySymbol: "*",
      },
    ],
    cost: 5,
    glory: 2,
    activeSide: null,
    img: fox,
    bgImg: COLOR[DiceType.Fox].color,
    title: "Лис",
  },
  [DiceType.Owl]: {
    id: "7",
    type: DiceType.Owl,
    sides: [
      {
        ...COLOR[DiceType.Owl],
        energyCount: 1,
      },
      {
        ...COLOR[DiceType.Owl],
        energyCount: 2,
      },
      {
        ...COLOR[DiceType.Owl],
        energyCount: 2,
      },
      {
        image: owl,
        attack: 4,
        defense: 2,
        level: 1,
      },
      {
        image: owl,
        attack: 4,
        defense: 4,
        level: 1,
        abilitySymbol: "*",
      },
      {
        image: owl,
        attack: 6,
        defense: 4,
        level: 2,
      },
    ],
    abilities: [
      {
        desc: "Если филин остался в зоне атаки до конца боя, вы можете перебросить один кубик воина в вашей зоне подготовки  или попытаться увеличить вашу силу",
      },
      {
        desc: "Вместо вышеуказанного вы можете перебросить двух воинов в вашей зоне подготовки или попытаться увеличить силу",
        abilitySymbol: "*",
      },
    ],
    cost: 5,
    glory: 2,
    activeSide: null,
    img: owl,
    bgImg: COLOR[DiceType.Owl].color,
    title: "Филин",
  },
  [DiceType.Wolf]: {
    id: "8",
    type: DiceType.Wolf,
    sides: [
      {
        ...COLOR[DiceType.Wolf],
        energyCount: 1,
      },
      {
        ...COLOR[DiceType.Wolf],
        energyCount: 2,
      },
      {
        image: wolf,
        attack: 3,
        defense: 3,
        level: 1,
      },
      {
        image: wolf,
        attack: 3,
        defense: 3,
        level: 1,
        abilitySymbol: "*",
      },
      {
        image: wolf,
        attack: 4,
        defense: 4,
        level: 2,
        abilitySymbol: "*",
      },
      {
        image: wolf,
        attack: 8,
        defense: 6,
        level: 3,
        abilitySymbol: "*",
      },
    ],
    abilities: [
      {
        desc: "Все ваши воины 1 уровня получают +2 к атаке и +2 к защите, пока волк сражается рядом с ними",
      },
      {
        desc: "Дополнительно ВСЕ ваши воины получают + 2 к атаке, +2 к защите",
        abilitySymbol: "*",
      },
    ],
    cost: 7,
    glory: 3,
    activeSide: null,
    img: wolf,
    bgImg: COLOR[DiceType.Wolf].color,
    title: "Волк",
  },
  [DiceType.Bear]: {
    id: "9",
    type: DiceType.Bear,
    sides: [
      {
        ...COLOR[DiceType.Bear],
        energyCount: 1,
      },
      {
        ...COLOR[DiceType.Bear],
        energyCount: 2,
      },
      {
        image: bear,
        attack: 3,
        defense: 5,
        level: 1,
      },
      {
        image: bear,
        attack: 3,
        defense: 5,
        level: 1,
        abilitySymbol: "*",
      },
      {
        image: bear,
        attack: 4,
        defense: 7,
        level: 2,
      },
      {
        image: bear,
        attack: 5,
        defense: 8,
        level: 3,
      },
    ],
    abilities: [
      {
        desc: `
          Усиленный медведь получает +1 к атаке. 
          Даёт игрогу на 1 славу больше, если он остаётся в зоне атаки до конца боя
        `,
        abilitySymbol: "*",
      },
    ],
    cost: 7,
    glory: 3,
    activeSide: null,
    img: bear,
    bgImg: COLOR[DiceType.Bear].color,
    title: "Медведь",
  },
};
