function numericalSortObjectOfObjects(data, attr) {
  var arr = [];
  for (var prop in data) {
    if (data.hasOwnProperty(prop)) {
      var obj = {};
      obj[prop] = data[prop];
      obj.tempSortName =
        typeof data[prop][attr] === "number"
          ? data[prop][attr]
          : data[prop][attr].toLowerCase();
      arr.push(obj);
    }
  }

  arr.sort(function(a, b) {
    var at = a.tempSortName,
      bt = b.tempSortName;
    return at > bt ? 1 : at < bt ? -1 : 0;
  });

  var result = [];
  for (var i = 0, l = arr.length; i < l; i++) {
    var obj = arr[i];
    delete obj.tempSortName;
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        var id = prop;
      }
    }
    var item = obj[id];
    result.push(item);
  }
  return result;
}

// Aggregate all patterns into an object
const getFiles = () => {
  let context = require.context(".", true, /\.js$/);
  const files = {};

  context.keys().forEach(function(key) {
    const regExpKey = /[\w]+/g;
    let newKey = regExpKey.exec(key);

    if (newKey[0] === "index") {
      return;
    }

    files[newKey[0]] = context(key).default;
    files[newKey[0]].dimensionSize =
      files[newKey[0]].config[0].length + files[newKey[0]].config.length;
  });

  const sortedFileObj = numericalSortObjectOfObjects(files, "dimensionSize");

  return sortedFileObj;
};

export default getFiles();
