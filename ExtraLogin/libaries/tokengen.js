exports.token = (dat) => {
    var fs = require('fs');
    var cfg = JSON.parse(fs.readFileSync("./database/szoveg.json"));
    let puf = ""
    for (let i = 0; i < dat; i++) {
        let asd = Math.floor((Math.random() * 10) + 1)
        if (asd > 5) {
            puf = puf + String(Math.floor((Math.random() * 9) + 1))
        }
        if (asd == 5) {
            puf = puf + cfg[Math.floor((Math.random() * cfg.length) + 1)-1]
        }
        if (asd < 5) {
            puf = puf + cfg[Math.floor((Math.random() * cfg.length) + 1)-1]
        }
    }
    while (puf.includes(" ")) {
        puf = puf.replace(" ",cfg[Math.floor((Math.random() * cfg.length) + 1)-1])
    }
    for (let aa = 0; aa < cfg.length; aa++) {
        puf = puf.replace(" ","")
    }
    return puf
  }
  