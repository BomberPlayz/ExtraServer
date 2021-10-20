exports.dec = (code) => {
  var fs = require('fs');
  var asd = []
  for (var i = 0; i < code.length; i++) {
    asd.push(code[i])
  }
  var ia = 0
  var cfg = JSON.parse(fs.readFileSync("./database/szoveg.json"));
  let puf = ""
  for (var i = 0; i < asd.length/2; i++) {
    let kecs = String(asd[ia]) + String(asd[ia+1])
    let fu = Number(kecs)
    puf = puf + cfg[fu]
    ia++
    ia++
  }
  return puf
}
