import { createStore } from "@store/store";

export const store = createStore({
  user: {
    authorized: true,
    loading: false,
    error: null,
    authChecked: true,
    user: {
      id: 1,
      first_name: "Andrey",
      second_name: "Suvorov",
      display_name: null,
      login: "AndreyS",
      email: "mail@mail.ru",
      phone: "+79532344567",
      avatar: "/236675d1826375cab820d9513da74fb0.png",
      settings: null,
    },
  },
  players: {
    Red: {
      gloryCount: 0,
      Attack: [],
      Preparation: [],
      Rest: [],
      Stock: [
        {
          id: "468c058a-5425-4d4a-9f4a-b1a325ada23c",
          type: "Cat",
          sides: [
            {
              color: "213, 150, 37",
              textColor: "42, 46, 56",
              energyCount: 1,
            },
            {
              color: "213, 150, 37",
              textColor: "42, 46, 56",
              energyCount: 1,
            },
            {
              color: "213, 150, 37",
              textColor: "42, 46, 56",
              energyCount: 1,
            },
            {
              color: "213, 150, 37",
              textColor: "42, 46, 56",
              specialAbilitySymbol: "?",
            },
            {
              image: "/src/assets/images/warriors/cat.png",
              attack: 1,
              defense: 2,
              level: 1,
            },
            {
              image: "/src/assets/images/warriors/cat.png",
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
          img: "/src/assets/images/warriors/cat.png",
          bgImg: "213, 150, 37",
          title: "Кот",
        },
        {
          id: "e45299ca-4e87-49d7-97aa-1e8b59bcf19c",
          type: "Cat",
          sides: [
            {
              color: "213, 150, 37",
              textColor: "42, 46, 56",
              energyCount: 1,
            },
            {
              color: "213, 150, 37",
              textColor: "42, 46, 56",
              energyCount: 1,
            },
            {
              color: "213, 150, 37",
              textColor: "42, 46, 56",
              energyCount: 1,
            },
            {
              color: "213, 150, 37",
              textColor: "42, 46, 56",
              specialAbilitySymbol: "?",
            },
            {
              image: "/src/assets/images/warriors/cat.png",
              attack: 1,
              defense: 2,
              level: 1,
            },
            {
              image: "/src/assets/images/warriors/cat.png",
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
          img: "/src/assets/images/warriors/cat.png",
          bgImg: "213, 150, 37",
          title: "Кот",
        },
        {
          id: "41497788-698e-42c4-83e3-1243ddb4e558",
          type: "Cat",
          sides: [
            {
              color: "213, 150, 37",
              textColor: "42, 46, 56",
              energyCount: 1,
            },
            {
              color: "213, 150, 37",
              textColor: "42, 46, 56",
              energyCount: 1,
            },
            {
              color: "213, 150, 37",
              textColor: "42, 46, 56",
              energyCount: 1,
            },
            {
              color: "213, 150, 37",
              textColor: "42, 46, 56",
              specialAbilitySymbol: "?",
            },
            {
              image: "/src/assets/images/warriors/cat.png",
              attack: 1,
              defense: 2,
              level: 1,
            },
            {
              image: "/src/assets/images/warriors/cat.png",
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
          img: "/src/assets/images/warriors/cat.png",
          bgImg: "213, 150, 37",
          title: "Кот",
        },
        {
          id: "d5d0a1e9-e2ee-4c88-aff8-5d98c7d0115e",
          type: "Cat",
          sides: [
            {
              color: "213, 150, 37",
              textColor: "42, 46, 56",
              energyCount: 1,
            },
            {
              color: "213, 150, 37",
              textColor: "42, 46, 56",
              energyCount: 1,
            },
            {
              color: "213, 150, 37",
              textColor: "42, 46, 56",
              energyCount: 1,
            },
            {
              color: "213, 150, 37",
              textColor: "42, 46, 56",
              specialAbilitySymbol: "?",
            },
            {
              image: "/src/assets/images/warriors/cat.png",
              attack: 1,
              defense: 2,
              level: 1,
            },
            {
              image: "/src/assets/images/warriors/cat.png",
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
          img: "/src/assets/images/warriors/cat.png",
          bgImg: "213, 150, 37",
          title: "Кот",
        },
      ],
      movesCount: 1,
      name: "фывфыв",
      type: "Red",
    },
    Blue: {
      gloryCount: 0,
      Attack: [],
      Preparation: [],
      Rest: [],
      Stock: [
        {
          id: "87daa4a4-025c-4a51-8231-1df58c946814",
          type: "Cat",
          sides: [
            {
              color: "213, 150, 37",
              textColor: "42, 46, 56",
              energyCount: 1,
            },
            {
              color: "213, 150, 37",
              textColor: "42, 46, 56",
              energyCount: 1,
            },
            {
              color: "213, 150, 37",
              textColor: "42, 46, 56",
              energyCount: 1,
            },
            {
              color: "213, 150, 37",
              textColor: "42, 46, 56",
              specialAbilitySymbol: "?",
            },
            {
              image: "/src/assets/images/warriors/cat.png",
              attack: 1,
              defense: 2,
              level: 1,
            },
            {
              image: "/src/assets/images/warriors/cat.png",
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
          img: "/src/assets/images/warriors/cat.png",
          bgImg: "213, 150, 37",
          title: "Кот",
        },
        {
          id: "1601b694-06c7-4e86-be0a-25998e0ef514",
          type: "Cat",
          sides: [
            {
              color: "213, 150, 37",
              textColor: "42, 46, 56",
              energyCount: 1,
            },
            {
              color: "213, 150, 37",
              textColor: "42, 46, 56",
              energyCount: 1,
            },
            {
              color: "213, 150, 37",
              textColor: "42, 46, 56",
              energyCount: 1,
            },
            {
              color: "213, 150, 37",
              textColor: "42, 46, 56",
              specialAbilitySymbol: "?",
            },
            {
              image: "/src/assets/images/warriors/cat.png",
              attack: 1,
              defense: 2,
              level: 1,
            },
            {
              image: "/src/assets/images/warriors/cat.png",
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
          img: "/src/assets/images/warriors/cat.png",
          bgImg: "213, 150, 37",
          title: "Кот",
        },
        {
          id: "78d1f7cc-fa5d-4f8c-8b86-a1627eee8c7f",
          type: "Cat",
          sides: [
            {
              color: "213, 150, 37",
              textColor: "42, 46, 56",
              energyCount: 1,
            },
            {
              color: "213, 150, 37",
              textColor: "42, 46, 56",
              energyCount: 1,
            },
            {
              color: "213, 150, 37",
              textColor: "42, 46, 56",
              energyCount: 1,
            },
            {
              color: "213, 150, 37",
              textColor: "42, 46, 56",
              specialAbilitySymbol: "?",
            },
            {
              image: "/src/assets/images/warriors/cat.png",
              attack: 1,
              defense: 2,
              level: 1,
            },
            {
              image: "/src/assets/images/warriors/cat.png",
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
          img: "/src/assets/images/warriors/cat.png",
          bgImg: "213, 150, 37",
          title: "Кот",
        },
        {
          id: "1e4778db-803c-47fc-995e-7ef8779c432a",
          type: "Cat",
          sides: [
            {
              color: "213, 150, 37",
              textColor: "42, 46, 56",
              energyCount: 1,
            },
            {
              color: "213, 150, 37",
              textColor: "42, 46, 56",
              energyCount: 1,
            },
            {
              color: "213, 150, 37",
              textColor: "42, 46, 56",
              energyCount: 1,
            },
            {
              color: "213, 150, 37",
              textColor: "42, 46, 56",
              specialAbilitySymbol: "?",
            },
            {
              image: "/src/assets/images/warriors/cat.png",
              attack: 1,
              defense: 2,
              level: 1,
            },
            {
              image: "/src/assets/images/warriors/cat.png",
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
          img: "/src/assets/images/warriors/cat.png",
          bgImg: "213, 150, 37",
          title: "Кот",
        },
      ],
      movesCount: 0,
      name: "ывфаыва",
      type: "Blue",
    },
    Yellow: {
      gloryCount: 0,
      Attack: [],
      Preparation: [],
      Rest: [],
      Stock: [
        {
          id: "704021f1-70de-4b5b-95b6-a7cc01671539",
          type: "Cat",
          sides: [
            {
              color: "213, 150, 37",
              textColor: "42, 46, 56",
              energyCount: 1,
            },
            {
              color: "213, 150, 37",
              textColor: "42, 46, 56",
              energyCount: 1,
            },
            {
              color: "213, 150, 37",
              textColor: "42, 46, 56",
              energyCount: 1,
            },
            {
              color: "213, 150, 37",
              textColor: "42, 46, 56",
              specialAbilitySymbol: "?",
            },
            {
              image: "/src/assets/images/warriors/cat.png",
              attack: 1,
              defense: 2,
              level: 1,
            },
            {
              image: "/src/assets/images/warriors/cat.png",
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
          img: "/src/assets/images/warriors/cat.png",
          bgImg: "213, 150, 37",
          title: "Кот",
        },
        {
          id: "2a9a4959-b4c7-4cfe-a610-214b12868bed",
          type: "Cat",
          sides: [
            {
              color: "213, 150, 37",
              textColor: "42, 46, 56",
              energyCount: 1,
            },
            {
              color: "213, 150, 37",
              textColor: "42, 46, 56",
              energyCount: 1,
            },
            {
              color: "213, 150, 37",
              textColor: "42, 46, 56",
              energyCount: 1,
            },
            {
              color: "213, 150, 37",
              textColor: "42, 46, 56",
              specialAbilitySymbol: "?",
            },
            {
              image: "/src/assets/images/warriors/cat.png",
              attack: 1,
              defense: 2,
              level: 1,
            },
            {
              image: "/src/assets/images/warriors/cat.png",
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
          img: "/src/assets/images/warriors/cat.png",
          bgImg: "213, 150, 37",
          title: "Кот",
        },
        {
          id: "a1117082-73e6-43d4-b6e1-4409384b5b85",
          type: "Cat",
          sides: [
            {
              color: "213, 150, 37",
              textColor: "42, 46, 56",
              energyCount: 1,
            },
            {
              color: "213, 150, 37",
              textColor: "42, 46, 56",
              energyCount: 1,
            },
            {
              color: "213, 150, 37",
              textColor: "42, 46, 56",
              energyCount: 1,
            },
            {
              color: "213, 150, 37",
              textColor: "42, 46, 56",
              specialAbilitySymbol: "?",
            },
            {
              image: "/src/assets/images/warriors/cat.png",
              attack: 1,
              defense: 2,
              level: 1,
            },
            {
              image: "/src/assets/images/warriors/cat.png",
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
          img: "/src/assets/images/warriors/cat.png",
          bgImg: "213, 150, 37",
          title: "Кот",
        },
        {
          id: "7536a705-5dfb-481f-bd5d-5175b593dccb",
          type: "Cat",
          sides: [
            {
              color: "213, 150, 37",
              textColor: "42, 46, 56",
              energyCount: 1,
            },
            {
              color: "213, 150, 37",
              textColor: "42, 46, 56",
              energyCount: 1,
            },
            {
              color: "213, 150, 37",
              textColor: "42, 46, 56",
              energyCount: 1,
            },
            {
              color: "213, 150, 37",
              textColor: "42, 46, 56",
              specialAbilitySymbol: "?",
            },
            {
              image: "/src/assets/images/warriors/cat.png",
              attack: 1,
              defense: 2,
              level: 1,
            },
            {
              image: "/src/assets/images/warriors/cat.png",
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
          img: "/src/assets/images/warriors/cat.png",
          bgImg: "213, 150, 37",
          title: "Кот",
        },
      ],
      movesCount: 0,
      name: "вапвапывап",
      type: "Yellow",
    },
    Green: {
      gloryCount: 0,
      Attack: [],
      Preparation: [],
      Rest: [],
      Stock: [
        {
          id: "8089ec6b-d272-4b2f-a3bb-3cff959808e8",
          type: "Cat",
          sides: [
            {
              color: "213, 150, 37",
              textColor: "42, 46, 56",
              energyCount: 1,
            },
            {
              color: "213, 150, 37",
              textColor: "42, 46, 56",
              energyCount: 1,
            },
            {
              color: "213, 150, 37",
              textColor: "42, 46, 56",
              energyCount: 1,
            },
            {
              color: "213, 150, 37",
              textColor: "42, 46, 56",
              specialAbilitySymbol: "?",
            },
            {
              image: "/src/assets/images/warriors/cat.png",
              attack: 1,
              defense: 2,
              level: 1,
            },
            {
              image: "/src/assets/images/warriors/cat.png",
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
          img: "/src/assets/images/warriors/cat.png",
          bgImg: "213, 150, 37",
          title: "Кот",
        },
        {
          id: "ffd75321-f7c2-4207-8f7b-b532a4e02a2d",
          type: "Cat",
          sides: [
            {
              color: "213, 150, 37",
              textColor: "42, 46, 56",
              energyCount: 1,
            },
            {
              color: "213, 150, 37",
              textColor: "42, 46, 56",
              energyCount: 1,
            },
            {
              color: "213, 150, 37",
              textColor: "42, 46, 56",
              energyCount: 1,
            },
            {
              color: "213, 150, 37",
              textColor: "42, 46, 56",
              specialAbilitySymbol: "?",
            },
            {
              image: "/src/assets/images/warriors/cat.png",
              attack: 1,
              defense: 2,
              level: 1,
            },
            {
              image: "/src/assets/images/warriors/cat.png",
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
          img: "/src/assets/images/warriors/cat.png",
          bgImg: "213, 150, 37",
          title: "Кот",
        },
        {
          id: "c4453a66-a2f8-4e76-be25-e6cebde8ebed",
          type: "Cat",
          sides: [
            {
              color: "213, 150, 37",
              textColor: "42, 46, 56",
              energyCount: 1,
            },
            {
              color: "213, 150, 37",
              textColor: "42, 46, 56",
              energyCount: 1,
            },
            {
              color: "213, 150, 37",
              textColor: "42, 46, 56",
              energyCount: 1,
            },
            {
              color: "213, 150, 37",
              textColor: "42, 46, 56",
              specialAbilitySymbol: "?",
            },
            {
              image: "/src/assets/images/warriors/cat.png",
              attack: 1,
              defense: 2,
              level: 1,
            },
            {
              image: "/src/assets/images/warriors/cat.png",
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
          img: "/src/assets/images/warriors/cat.png",
          bgImg: "213, 150, 37",
          title: "Кот",
        },
        {
          id: "4a8b1f41-0ce2-4bac-a416-3c9e08f135ff",
          type: "Cat",
          sides: [
            {
              color: "213, 150, 37",
              textColor: "42, 46, 56",
              energyCount: 1,
            },
            {
              color: "213, 150, 37",
              textColor: "42, 46, 56",
              energyCount: 1,
            },
            {
              color: "213, 150, 37",
              textColor: "42, 46, 56",
              energyCount: 1,
            },
            {
              color: "213, 150, 37",
              textColor: "42, 46, 56",
              specialAbilitySymbol: "?",
            },
            {
              image: "/src/assets/images/warriors/cat.png",
              attack: 1,
              defense: 2,
              level: 1,
            },
            {
              image: "/src/assets/images/warriors/cat.png",
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
          img: "/src/assets/images/warriors/cat.png",
          bgImg: "213, 150, 37",
          title: "Кот",
        },
      ],
      movesCount: 0,
      name: "ываыфваывап",
      type: "Green",
    },
  },
  theme: {
    themeName: "purple",
  },
  game: {
    currentPlayerType: "Red",
    currentPlayerEnergy: 6,
    currentPhase: "Stock",
    accessHireWarriors: [
      {
        type: "Cat",
        count: 0,
      },
      {
        type: "Owl",
        count: 5,
      },
      {
        type: "Hare",
        count: 5,
      },
      {
        type: "Bear",
        count: 5,
      },
      {
        type: "Fox",
        count: 5,
      },
      {
        type: "Wolf",
        count: 5,
      },
      {
        type: "Duck",
        count: 5,
      },
    ],
    maxGlory: 25,
    loading: false,
    chronicleMessages: [],
  },
  chat: {},
  forum: {},
});
