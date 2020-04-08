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
