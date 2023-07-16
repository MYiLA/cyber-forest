import { DiceSide } from '@pages/page-game/widgets/game/type'
import snakeImg from '@images/warriors/snake.png'
import hareImg from '@images/warriors/hare.png'
import owlImg from '@images/warriors/owl.png'
import foxImg from '@images/warriors/fox.png'
import duckImg from '@images/warriors/duck.png'
import catImg from '@images/warriors/cat.png'
import bearImg from '@images/warriors/bear.png'

export const allSides: DiceSide[] = [
  { color: '0,0,0', textColor: '164,151,0', energyCount: 3 },
  { image: snakeImg, attack: 4, defense: 2, level: 4 },
  { color: '210, 104, 69', textColor: '0,0,0', energyCount: 3 },
  { image: hareImg, attack: 9, defense: 3, level: 7 },
  { color: '50, 26, 48', textColor: '31, 255, 248', energyCount: 2 },
  { image: owlImg, attack: 5, defense: 1, level: 2 },
  { color: '0,0,0', textColor: '164,151,0', energyCount: 3 },
  { image: foxImg, attack: 1, defense: 6, level: 1 },
  { color: '210, 104, 69', textColor: '0,0,0', energyCount: 3 },
  { image: duckImg, attack: 2, defense: 5, level: 6 },
  { color: '50, 26, 48', textColor: '31, 255, 248', energyCount: 2 },
  { image: catImg, attack: 5, defense: 7, level: 2 },
  { color: '0,0,0', textColor: '164,151,0', energyCount: 3 },
  { image: bearImg, attack: 4, defense: 9, level: 1 },
  { color: '210, 104, 69', textColor: '0,0,0', energyCount: 3 },
]
