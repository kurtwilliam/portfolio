import ao from "../assets/japaneseWords/ao.mp3";
import iro from "../assets/japaneseWords/iro.mp3";
import orenji from "../assets/japaneseWords/orenji.mp3";
import kiiro from "../assets/japaneseWords/ki-iro.mp3";
import aka from "../assets/japaneseWords/aka.mp3";
import midori from "../assets/japaneseWords/midori.mp3";
import kuro from "../assets/japaneseWords/kuro.mp3";
import pinku from "../assets/japaneseWords/pinku.mp3";
import shiro from "../assets/japaneseWords/shiro.mp3";
import niku from "../assets/japaneseWords/niku.mp3";
import tamago from "../assets/japaneseWords/tamago.mp3";
import gyunyu from "../assets/japaneseWords/gyunyu.mp3";
import shio from "../assets/japaneseWords/shio.mp3";
import kudamono from "../assets/japaneseWords/kudamono.mp3";
import yasai from "../assets/japaneseWords/yasai.mp3";
import tabemono from "../assets/japaneseWords/tabemono.mp3";

const words = {
  いえ: {
    eng: "house",
    content: "🏠"
  },
  とけい: {
    eng: "watch/clock",
    content: "⌚🕰️"
  },
  すし: {
    eng: "sushi",
    content: "🍣"
  },
  はい: {
    eng: "yes",
    content: "👍"
  },
  いいえ: {
    eng: "no",
    content: "👎"
  },
  しお: {
    eng: "salt",
    content: "🧂",
    sound: shio
  },

  いろ: {
    eng: "color",
    content: "🎨",
    sound: iro
  },
  オレンジ: {
    eng: "orange",
    content: "🧡🎨",
    sound: orenji
  },
  きいろ: {
    eng: "yellow",
    content: "💛🎨",
    sound: kiiro
  },
  あお: {
    eng: "blue",
    content: "💙🎨",
    sound: ao
  },
  あか: {
    eng: "red",
    content: "❤️🎨",
    sound: aka
  },
  みどり: {
    eng: "green",
    content: "💚🎨",
    sound: midori
  },
  くろ: {
    eng: "black",
    content: "🖤🎨",
    sound: kuro
  },
  ピンク: {
    eng: "pink",
    content: "🐖🎨",
    sound: pinku
  },
  しろ: {
    eng: "white",
    content: "⚪🎨",
    sound: shiro
  },
  にく: {
    eng: "meat",
    content: "🥩🍖",
    sound: niku
  },
  たまご: {
    eng: "egg",
    content: "🥚",
    sound: tamago
  },
  ぎゅうにゅう: {
    eng: "milk",
    content: "🥛",
    sound: gyunyu
  },
  くだもの: {
    eng: "fruit",
    content: "🍎🍇🍊",
    sound: kudamono
  },
  やさい: {
    eng: "vegetables",
    content: "🥕🥔🥬",
    sound: yasai
  },
  たべもの: {
    eng: "food",
    content: "🥕🥘🍛",
    sound: tabemono
  }
};

export default words;
