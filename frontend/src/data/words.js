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
  },
  あめ: {
    eng: "rain",
    content: "☔️🌧",
    sound: null
  },
  かさ: {
    eng: "umbrella",
    content: "☂",
    sound: null
  },

  さかな: {
    eng: "fish",
    content: "🐟🐡",
    sound: null
  },
  きもの: {
    eng: "kimono",
    content: "👘",
    sound: null
  },
  うち: {
    eng: "home",
    content: "🏡",
    sound: null
  },
  くすり: {
    eng: "medicine",
    content: "💊😷",
    sound: null
  },
  えんぴつ: {
    eng: "pencil",
    content: "✏️",
    sound: null
  },
  おかね: {
    eng: "money",
    content: " 💰💵",
    sound: null
  },
  けーき: {
    eng: "cake",
    content: "🍰",
    sound: null
  },
  ぱそこん: {
    eng: "personal computer",
    content: "💻🖥",
    sound: null
  },
  はさみ: {
    eng: "scissors",
    content: "✂",
    sound: null
  },
  ちず: {
    eng: "map",
    content: "🗺🗾",
    sound: null
  },
  にほん: {
    eng: "Japan",
    content: "🇯🇵",
    sound: null
  },
  ひこうき: {
    eng: "airplane",
    content: "✈️",
    sound: null
  },
  いぬ: {
    eng: "dog",
    content: "🐕🐶",
    sound: null
  },
  ねこ: {
    eng: "cat",
    content: "🐈",
    sound: null
  },
  へりこぷたー: {
    eng: "helicopter",
    content: "🚁",
    sound: null
  },
  ふろ: {
    eng: "bath",
    content: "🛀",
    sound: null
  },
  てがい: {
    eng: "letter",
    content: "💌📬",
    sound: null
  },
  のーと: {
    eng: "note",
    content: "📓🗒",
    sound: null
  },
  ほん: {
    eng: "book",
    content: "📖📚",
    sound: null
  },
  やま: {
    eng: "mountain",
    content: "🏔🗻",
    sound: null
  },
  りんご: {
    eng: "apple",
    content: "🍎🍏",
    sound: null
  },
  らじお: {
    eng: "radio",
    content: "📻",
    sound: null
  },
  みず: {
    eng: "water",
    content: "🚰💧",
    sound: null
  },
  ゆき: {
    eng: "snow",
    content: "☃️🌨",
    sound: null
  },
  めがね: {
    eng: "glasses",
    content: "👓",
    sound: null
  },
  わいん: {
    eng: "wine",
    content: "🍷",
    sound: null
  },
  ぎたー: {
    eng: "guitar",
    content: "🎸",
    sound: null
  },
  しんぶん: {
    eng: "newspaper",
    content: "📰🗞️",
    sound: null
  },
  ずぼん: {
    eng: "pants",
    content: "👖",
    sound: null
  },
  かぜ: {
    eng: "wind",
    content: "💨🍃",
    sound: null
  },
  ごはん: {
    eng: "rice",
    content: "🍚",
    sound: null
  },
  ぞう: {
    eng: "elephant",
    content: "🐘",
    sound: null
  },
  かなだ: {
    eng: "Canada",
    content: "🇨🇦🍁",
    sound: null
  },
  ぶす: {
    eng: "bus",
    content: "🚌🚍",
    sound: null
  },
  ぱん: {
    eng: "bread",
    content: "🍞🥖",
    sound: null
  },
  びーる: {
    eng: "beer",
    content: "🍺🍻",
    sound: null
  },
  ぴあの: {
    eng: "piano",
    content: "🎹",
    sound: null
  },
  てぶくろ: {
    eng: "gloves",
    content: "🧤",
    sound: null
  },
  きつぷ: {
    eng: "ticket",
    content: "🎫🎟️",
    sound: null
  },
  でんわ: {
    eng: "telephone",
    content: "☎️📱",
    sound: null
  },
  べんとう: {
    eng: "bento",
    content: "🍱",
    sound: null
  },
  ぺん: {
    eng: "pen",
    content: "🖊️🖋️",
    sound: null
  },
  どあ: {
    eng: "door",
    content: "🚪",
    sound: null
  },
  ばうし: {
    eng: "hat",
    content: "🧢🎩",
    sound: null
  },
  ぽすよ: {
    eng: "post",
    content: "📮📫",
    sound: null
  },
  じゃーす: {
    eng: "juice",
    content: "🧃🥤",
    sound: null
  },
  ちょこれーと: {
    eng: "chocolate",
    content: "🍫",
    sound: null
  },
  じてんしゃ: {
    eng: "bicycle",
    content: "🚲🚴",
    sound: null
  },
  ひゃく: {
    eng: "one hundred",
    content: "💯",
    sound: null
  },
  おちゃ: {
    eng: "tea",
    content: "🍵",
    sound: null
  },
  にんぎょう: {
    eng: "dolls",
    content: "🎎",
    sound: null
  }
};

export default words;
