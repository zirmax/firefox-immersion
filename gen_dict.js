const fs = require("fs");
const path = require("path");
const parseString = require("xml2js").parseString;

let dictionary = new Map();

parseString(
  fs.readFileSync(path.join(__dirname, "en-es-en-Dic","src","main","resources","dic", "en-es.xml"), "utf-8"),
  function (err, result) {
    if (err) console.error(err);
    result.dic.l.forEach(list => {
      list.w.forEach(element => {
      english = element.c
      spanish = element.d
      description = element.t
      if (!dictionary.has(english) && spanish) {
        dictionary.set(english, spanish)
      }
    })
    });
  }
);

fs.writeFileSync('dict.json', JSON.stringify(Object.fromEntries(dictionary)), 'utf8');