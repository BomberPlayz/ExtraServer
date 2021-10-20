exports.enc = (szoveg) => {
  var fs = require('fs');
  var asd = []
  for (var i = 0; i < szoveg.length; i++) {
    asd.push(szoveg[i])
  }
  var ia = 0
  var cfg = JSON.parse(fs.readFileSync("./database/szoveg.json"));
  let puf = ""
  for (var i = 0; i < asd.length; i++) {
    puf = puf + cfg.indexOf(asd[ia]);
    ia++
  }
  return puf
}
