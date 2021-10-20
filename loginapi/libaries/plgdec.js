exports.enc = (szoveg) => {
    var fs = require('fs');
    var asd = []
    for (var i = 0; i < szoveg.length; i++) {
        asd.push(szoveg[i])
    }
    var cfg = JSON.parse(fs.readFileSync("./database/szovegki.json"));
    var ia = 0
    let puf = ""
    for (var i = 0; i < asd.length; i++) {
        if (cfg["1"].includes(asd[ia])) {
            puf = puf + "1x" + cfg["1"].indexOf(asd[ia]);
        }
        if (cfg["2"].includes(asd[ia])) {
            puf = puf + "2x" + cfg["2"].indexOf(asd[ia]);
        }
        if (cfg["3"].includes(asd[ia])) {
            puf = puf + "3x" + cfg["3"].indexOf(asd[ia]);
        }
        if (cfg["4"].includes(asd[ia])) {
            puf = puf + "4x" + cfg["4"].indexOf(asd[ia]);
        }
        if (cfg["5"].includes(asd[ia])) {
            puf = puf + "5x" + cfg["5"].indexOf(asd[ia]);
        }
        ia++
    }
    return puf
}
exports.dec = (code) => {
    var fs = require('fs');
    var asd = []
    let rio = 0
    for (var i = 0; i < code.length/4; i++) {
        asd.push(code[rio] + code[rio+1] + code[rio+2] + code[rio+3])
        rio++
        rio++
        rio++
        rio++
    }
    var cfg = JSON.parse(fs.readFileSync("./database/szovegki.json"));
    var ia = 0
    let puf = ""
    //console.log(asd);
    for (var i = 0; i < asd.length; i++) {
        if (asd[ia].includes("1x")) {
            let raty = asd[ia].split("1x")[1]
            let fu = Number(raty)
            puf = puf + cfg["1"][fu]
        }
        if (asd[ia].includes("2x")) {
            let raty = asd[ia].split("2x")[1]
            let fu = Number(raty)
            puf = puf + cfg["2"][fu]
        }
        if (asd[ia].includes("3x")) {
            let raty = asd[ia].split("3x")[1]
            let fu = Number(raty)
            puf = puf + cfg["3"][fu]
        }
        if (asd[ia].includes("4x")) {
            let raty = asd[ia].split("4x")[1]
            let fu = Number(raty)
            puf = puf + cfg["4"][fu]
        }
        if (asd[ia].includes("5x")) {
            let raty = asd[ia].split("5x")[1]
            let fu = Number(raty)
            puf = puf + cfg["5"][fu]
        }
        ia++
    }
    if (puf.includes(undefined)) {
        for (let index = 0; index < 101; index++) {
          puf = puf.replace(undefined,"")
        }
      }
    return puf
}