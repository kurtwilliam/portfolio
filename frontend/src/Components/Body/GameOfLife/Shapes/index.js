// import Plus from "./Plus";
// import Square from "./Square";
// import Explosion from "./Explosion";
// import BouncinBeans from "./BouncinBeans";
// import InfiniteExplosion from "./InfiniteExplosion";
// import LineyBoy from "./LineyBoy";
// import Speedy from "./Speedy";
// import Speedy from "./Speedy";

// export default {
//   Plus: [...Plus],
//   Square: [...Square],
//   Speedy: [...Speedy],
//   Explosion: [...Explosion],
//   InfiniteExplosion: [...InfiniteExplosion],
//   BouncinBeans: [...BouncinBeans],
//   LineyBoy: [...LineyBoy],
// };

// Return files object as default export
const getFiles = () => {
  var context = require.context(".", true, /\.js$/);
  const files = {};

  context.keys().forEach(function(key) {
    const regExpKey = /[\w]+/g;
    let newKey = regExpKey.exec(key);

    if (newKey[0] === "index") {
      return;
    }

    files[newKey[0]] = context(key).default;
  });

  return files;
};

export default getFiles();
