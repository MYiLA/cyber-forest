import ThumbsUp from "@images/emoji-packs/dice/thumbs-up.svg";
import Frowning from "@images/emoji-packs/dice/frowning.svg";
import Smiling from "@images/emoji-packs/dice/smiling.svg";
import ThumbsDown from "@images/emoji-packs/dice/thumbs-down.svg";
import AngryWithHorns from "@images/emoji-packs/dice/angry-with-horns.svg";
import BlueHeart from "@images/emoji-packs/dice/blue-heart.svg";
import PurpleHeart from "@images/emoji-packs/dice/purple-heart.svg";
import BlackHeart from "@images/emoji-packs/dice/black-heart.svg";
import Hugging from "@images/emoji-packs/dice/hugging.svg";
import RollingOnTheFloorLaughing from "@images/emoji-packs/dice/rolling-on-the-floor-laughing.svg";
import WithHandOverMouth from "@images/emoji-packs/dice/with-hand-over-mouth.svg";
import SmilingHearts from "@images/emoji-packs/dice/smiling-hearts.svg";
import Hot from "@images/emoji-packs/dice/hot.svg";
import Grinning from "@images/emoji-packs/dice/grinning.svg";
import BeamingSmilingEyes from "@images/emoji-packs/dice/beaming-smiling-eyes.svg";
import TearsOfJoy from "@images/emoji-packs/dice/tears-of-joy.svg";
import GrinningBigEyes from "@images/emoji-packs/dice/grinning-big-eyes.svg";
import GrinningSweat from "@images/emoji-packs/dice/grinning-sweat.svg";
import SmilingHalo from "@images/emoji-packs/dice/smiling-halo.svg";
import SmilingHorns from "@images/emoji-packs/dice/smiling-horns.svg";
import Winking from "@images/emoji-packs/dice/winking.svg";
import SavoringFood from "@images/emoji-packs/dice/savoring-food.svg";
import SmilingHeartEyes from "@images/emoji-packs/dice/smiling-heart-eyes.svg";
import SmilingSunglasses from "@images/emoji-packs/dice/smiling-sunglasses.svg";
import Neutral from "@images/emoji-packs/dice/neutral.svg";
import Expressionless from "@images/emoji-packs/dice/expressionless.svg";
import Downcast from "@images/emoji-packs/dice/downcast.svg";
import Confused from "@images/emoji-packs/dice/confused.svg";
import Confounded from "@images/emoji-packs/dice/confounded.svg";
import Kissing from "@images/emoji-packs/dice/kissing.svg";
import BlowingKiss from "@images/emoji-packs/dice/blowing-kiss.svg";
import KissingSmilingEyes from "@images/emoji-packs/dice/kissing-smiling-eyes.svg";
import Tongue from "@images/emoji-packs/dice/tongue.svg";
import WinkingTongue from "@images/emoji-packs/dice/winking-tongue.svg";
import Disappointed from "@images/emoji-packs/dice/disappointed.svg";
import Angry from "@images/emoji-packs/dice/angry.svg";
import Persevering from "@images/emoji-packs/dice/persevering.svg";
import SadButRelieved from "@images/emoji-packs/dice/sad-but-relieved.svg";
import Fearful from "@images/emoji-packs/dice/fearful.svg";
import Sleepy from "@images/emoji-packs/dice/sleepy.svg";
import Tired from "@images/emoji-packs/dice/tired.svg";
import LoudlyCrying from "@images/emoji-packs/dice/loudly-crying.svg";
import AnxiousSweat from "@images/emoji-packs/dice/anxious-sweat.svg";
import ScreamingInFear from "@images/emoji-packs/dice/screaming-in-fear.svg";
import Astonished from "@images/emoji-packs/dice/astonished.svg";
import Flushed from "@images/emoji-packs/dice/flushed.svg";
import Sleeping from "@images/emoji-packs/dice/sleeping.svg";
import WithoutMouth from "@images/emoji-packs/dice/without-mouth.svg";
import MedicalMask from "@images/emoji-packs/dice/medical-mask.svg";
import SlightlyFrowning from "@images/emoji-packs/dice/slightly-frowning.svg";
import SlightlySmiling from "@images/emoji-packs/dice/slightly-smiling.svg";

// TODO: Добавить выбор и покупку пакетов смайлов в настройках игрока
/** Типы доступных пакетов смайлов */
export enum EmojiPack {
  /** Пак с эмоциями в виде киберкубика */
  Dice = "dice",
}

/** Типы доступных смайликов */
export const Emoji: Record<string, unknown> = {
  Frowning,
  Smiling,
  ThumbsUp,
  ThumbsDown,
  AngryWithHorns,
  BlueHeart,
  PurpleHeart,
  BlackHeart,
  Hugging,
  RollingOnTheFloorLaughing,
  WithHandOverMouth,
  SmilingHearts,
  Hot,
  Grinning,
  BeamingSmilingEyes,
  TearsOfJoy,
  GrinningBigEyes,
  GrinningSweat,
  SmilingHalo,
  SmilingHorns,
  Winking,
  SavoringFood,
  SmilingHeartEyes,
  SmilingSunglasses,
  Neutral,
  Expressionless,
  Downcast,
  Confused,
  Confounded,
  Kissing,
  BlowingKiss,
  KissingSmilingEyes,
  Tongue,
  WinkingTongue,
  Disappointed,
  Angry,
  Persevering,
  SadButRelieved,
  Fearful,
  Sleepy,
  Tired,
  LoudlyCrying,
  AnxiousSweat,
  ScreamingInFear,
  Astonished,
  Flushed,
  Sleeping,
  WithoutMouth,
  MedicalMask,
  SlightlyFrowning,
  SlightlySmiling,
};
