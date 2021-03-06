exports.run = (request, response, args, fs) => {
    /*let cfg = JSON.parse(fs.readFileSync("./database/.json", "utf8"));
    var tojson = cfg
    fs.writeFileSync("./database/.json", JSON.stringify(tojson));*/
    response.write('<head><meta charset="UTF-8"><title>AccMan</title></head>')
    let enc = require('../api/encode.js');
    let dec = require('../api/decode.js');
    let al = require('../api/alert.js')
    let mappa = "./dekstop/"
    response.write(`<meta name="viewport" content="width=device-width, initial-scale=1">
  <head>
  <style>
  .alert {
    padding: 20px;
    background-color: #ff9800;
    color: white;
    opacity: 0.83;
    transition: opacity 0.6s;
    margin-bottom: 15px;
  }
  .alert.err {
    background-color: #f44336;
  }
  .alert.inf {
    background-color: #2196F3
  }
  .closebtn {
  margin-left: 15px;
  color: white;
  font-weight: bold;
  float: right;
  font-size: 22px;
  line-height: 20px;
  cursor: pointer;
  transition: 0.3s;
  }

  .closebtn:hover {
  color: black;
  }`)

  response.write(`
  .bb {
  background-color: #008CBA; /* Green */
  border: none;
  color: white;
  padding: 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
  }
  img {
    padding: 5px;
    width: 120px;
  }
  .windowa {
    position: absolute;
    z-index: 9;
    background-color: #f1f1f1;
    text-align: center;
    border: 1px solid #d3d3d3;
  }
  .windowaup {
    padding: 10px;
    cursor: move;
    z-index: 10;
    background-color: #2196F3;
    color: #fff;
  }
  </style>
  </head>`)

    let ars = al.gettall()
    for (var i = 0; i < ars.length; i++) {
      let data = al.write(ars[i][0],ars[i][1])
      response.write(data)
    }

    let dvms = true
    let msgs = {"stat":"alert", "message":"Restartok folyamatosan!"}
    if (dvms == true) {
        let datale = al.write(msgs.stat,msgs.message)
        response.write(datale)
    }
    if (args.usr == undefined) {
      response.write(`<a href="login.html">Nem vagy bel??pve, L??pj be!</a>`)
    } else {
      let cfg = JSON.parse(fs.readFileSync(`./${mappa}bent.json`, "utf8"));
      if (cfg.users.includes(args.usr)) {
        let nyam = false
        for (let ida = 0; ida < cfg.users.length; ida++) {
          if (nyam == false) {
            if (cfg.users[ida] == args.usr) {
              if (cfg.tokens[ida] == args.token) {
                nyam = true
                var event = "havas"
    const dir = "./dekstop/dats/" + args.usr + "/ydesk/"
    fs.readdir(dir, (err, files) => {
        //console.log("asd");
        files.forEach(file => {
            if (file.includes(".txt")||file.includes(".html")||file.includes(".js")||file.includes(".wda")) {
                //console.log("sz??p");
                if (file.includes(".txt")) {
                    let cfg = JSON.parse(fs.readFileSync("./dekstop/opew.json", "utf8"));
                    //<a href="/dekstop/windowloader.js?app=${cfg[".txt"]}&file=./dekstop/ydesk/${file}">${file}</a>
                    if (args.kiv == file) {
                        //120,120
                        response.write(`
                        <img src="/dekstop/imgs/text${event}kiv.png?data=visit" alt="text file" style="width:90px">
                        <a href="/dekstop/windowloader.js?app=${cfg[".txt"]}&file=./dekstop/dats/${args.usr}/ydesk/${file}&usr=${args.usr}&token=${args.token}">${file}</a>`)
                    } else {
                        response.write(`
                        <img src="/dekstop/imgs/text${event}.png?data=visit" alt="text file" style="width:90px">
                        <a href="/dekstop/windowloader.js?kiv=${file}&usr=${args.usr}&token=${args.token}&file=${args.file}&app=${args.app}">${file}</a>`)
                    }
                }
                if (file.includes(".html")) {
                    let cfg = JSON.parse(fs.readFileSync("./dekstop/opew.json", "utf8"));
                    if (args.kiv == file) {
                        response.write(`
                        <img src="/dekstop/imgs/text${event}kiv.png?data=visit" alt="text file" style="width:90px">
                        <a href="/dekstop/windowloader.js?app=${cfg[".html"]}&file=./dekstop/dats/${args.usr}/ydesk/${file}&usr=${args.usr}&token=${args.token}">${file}</a>`)
                    } else {
                        response.write(`
                        <img src="/dekstop/imgs/text${event}.png?data=visit" alt="text file" style="width:90px">
                        <a href="/dekstop/windowloader.js?kiv=${file}&usr=${args.usr}&token=${args.token}&file=${args.file}&app=${args.app}">${file}</a>`)
                    }
                }
                if (file.includes(".js")) {
                    let cfg = JSON.parse(fs.readFileSync("./dekstop/opew.json", "utf8"));
                    if (args.kiv == file) {
                        response.write(`
                        <img src="/dekstop/imgs/text${event}kiv.png?data=visit" alt="text file" style="width:90px">
                        <a href="/dekstop/windowloader.js?app=${cfg[".js"]}&file=./dekstop/dats/${args.usr}/ydesk/${file}&usr=${args.usr}&token=${args.token}">${file}</a>`)
                    } else {
                        response.write(`
                        <img src="/dekstop/imgs/text${event}.png?data=visit" alt="text file" style="width:90px">
                        <a href="/dekstop/windowloader.js?kiv=${file}&usr=${args.usr}&token=${args.token}&file=${args.file}&app=${args.app}">${file}</a>`)
                    }
                }
                if (file.includes(".wda")) {
                    let cfg = JSON.parse(fs.readFileSync("./dekstop/opew.json", "utf8"));
                    if (args.kiv == file) {
                        response.write(`
                        <img src="/dekstop/imgs/text${event}kiv.png?data=visit" alt="text file" style="width:90px">
                        <a href="/dekstop/windowloader.js?app=${cfg[".wda"]}&file=./dekstop/dats/${args.usr}/ydesk/${file}&usr=${args.usr}&token=${args.token}">${file}</a>`)
                    } else {
                        response.write(`
                        <img src="/dekstop/imgs/text${event}.png?data=visit" alt="text file" style="width:90px">
                        <a href="/dekstop/windowloader.js?kiv=${file}&usr=${args.usr}&token=${args.token}&file=${args.file}&app=${args.app}">${file}</a>`)
                    }
                }
            } else {
                if (file.includes(".png")||file.includes(".pic")||file.includes(".jpg")||file.includes(".gif")) {
                    //console.log("sz??p");
                    if (file.includes(".png")) {
                        let cfg = JSON.parse(fs.readFileSync("./dekstop/opew.json", "utf8"));
                        if (args.kiv == file) {
                            response.write(`
                            <img src="/dekstop/imgs/pic${event}kiv.png?data=visit" alt="text file" style="width:90px">
                            <a href="/dekstop/windowloader.js?app=${cfg[".png"]}&file=./dekstop/dats/${args.usr}/ydesk/${file}&usr=${args.usr}&token=${args.token}">${file}</a>`)
                        } else {
                            response.write(`
                            <img src="/dekstop/imgs/pic${event}.png?data=visit" alt="text file" style="width:90px">
                            <a href="/dekstop/windowloader.js?kiv=${file}&usr=${args.usr}&token=${args.token}&file=${args.file}&app=${args.app}">${file}</a>`)
                        }
                    }
                    if (file.includes(".pic")) {
                        let cfg = JSON.parse(fs.readFileSync("./dekstop/opew.json", "utf8"));
                        if (args.kiv == file) {
                            response.write(`
                            <img src="/dekstop/imgs/pic${event}kiv.png?data=visit" alt="text file" style="width:90px">
                            <a href="/dekstop/windowloader.js?app=${cfg[".pic"]}&file=./dekstop/dats/${args.usr}/ydesk/${file}&usr=${args.usr}&token=${args.token}">${file}</a>`)
                        } else {
                            response.write(`
                            <img src="/dekstop/imgs/pic${event}.png?data=visit" alt="text file" style="width:90px">
                            <a href="/dekstop/windowloader.js?kiv=${file}&usr=${args.usr}&token=${args.token}&file=${args.file}&app=${args.app}">${file}</a>`)
                        }
                    }
                    if (file.includes(".jpg")) {
                        let cfg = JSON.parse(fs.readFileSync("./dekstop/opew.json", "utf8"));
                        if (args.kiv == file) {
                            response.write(`
                            <img src="/dekstop/imgs/pic${event}kiv.png?data=visit" alt="text file" style="width:90px">
                            <a href="/dekstop/windowloader.js?app=${cfg[".jpg"]}&file=./dekstop/dats/${args.usr}/ydesk/${file}&usr=${args.usr}&token=${args.token}">${file}</a>`)
                        } else {
                            response.write(`
                            <img src="/dekstop/imgs/pic${event}.png?data=visit" alt="text file" style="width:90px">
                            <a href="/dekstop/windowloader.js?kiv=${file}&usr=${args.usr}&token=${args.token}&file=${args.file}&app=${args.app}">${file}</a>`)
                        }
                    }
                    if (file.includes(".gif")) {
                        let cfg = JSON.parse(fs.readFileSync("./dekstop/opew.json", "utf8"));
                        if (args.kiv == file) {
                            response.write(`
                            <img src="/dekstop/imgs/pic${event}kiv.png?data=visit" alt="text file" style="width:90px">
                            <a href="/dekstop/windowloader.js?app=${cfg[".gif"]}&file=./dekstop/dats/${args.usr}/ydesk/${file}&usr=${args.usr}&token=${args.token}">${file}</a>`)
                        } else {
                            response.write(`
                            <img src="/dekstop/imgs/pic${event}.png?data=visit" alt="text file" style="width:90px">
                            <a href="/dekstop/windowloader.js?kiv=${file}&usr=${args.usr}&token=${args.token}&file=${args.file}&app=${args.app}">${file}</a>`)
                        }
                    }
                } else {
                    if (file.includes(".zip")||file.includes(".rar")||file.includes(".exe")||file.includes(".run")) {
                        //console.log("sz??p");
                        let cfg = JSON.parse(fs.readFileSync("./dekstop/opew.json", "utf8"));
                        if (file.includes(".zip")) {
                            if (args.kiv == file) {
                                response.write(`
                                <img src="/dekstop/imgs/closed${event}kiv.png?data=visit" alt="text file" style="width:90px">
                                <a href="/dekstop/windowloader.js?app=${cfg[".zip"]}&file=./dekstop/dats/${args.usr}/ydesk/${file}&usr=${args.usr}&token=${args.token}">${file}</a>`)
                            } else {
                                response.write(`
                                <img src="/dekstop/imgs/closed${event}.png?data=visit" alt="text file" style="width:90px">
                                <a href="/dekstop/windowloader.js?kiv=${file}&usr=${args.usr}&token=${args.token}&file=${args.file}&app=${args.app}">${file}</a>`)
                            }
                        }
                        if (file.includes(".rar")) {
                            if (args.kiv == file) {
                                response.write(`
                                <img src="/dekstop/imgs/closed${event}kiv.png?data=visit" alt="text file" style="width:90px">
                                <a href="/dekstop/windowloader.js?app=${cfg[".rar"]}&file=./dekstop/dats/${args.usr}/ydesk/${file}&usr=${args.usr}&token=${args.token}">${file}</a>`)
                            } else {
                                response.write(`
                                <img src="/dekstop/imgs/closed${event}.png?data=visit" alt="text file" style="width:90px">
                                <a href="/dekstop/windowloader.js?kiv=${file}&usr=${args.usr}&token=${args.token}&file=${args.file}&app=${args.app}">${file}</a>`)
                            }
                        }
                        if (file.includes(".exe")) {
                            if (args.kiv == file) {
                                response.write(`
                                <img src="/dekstop/imgs/closed${event}kiv.png?data=visit" alt="text file" style="width:90px">
                                <a href="/dekstop/windowloader.js?app=${cfg[".exe"]}&file=./dekstop/dats/${args.usr}/ydesk/${file}&usr=${args.usr}&token=${args.token}">${file}</a>`)
                            } else {
                                response.write(`
                                <img src="/dekstop/imgs/closed${event}.png?data=visit" alt="text file" style="width:90px">
                                <a href="/dekstop/windowloader.js?kiv=${file}&usr=${args.usr}&token=${args.token}&file=${args.file}&app=${args.app}">${file}</a>`)
                            }
                        }
                        if (file.includes(".run")) {
                            if (args.kiv == file) {
                                response.write(`
                                <img src="/dekstop/imgs/ex${event}kiv.png?data=visit" alt="text file" style="width:90px">
                                <a href="/dekstop/windowloader.js?app=${cfg[".run"]}&file=./dekstop/dats/${args.usr}/ydesk/${file}&usr=${args.usr}&token=${args.token}">${file}</a>`)
                            } else {
                                response.write(`
                                <img src="/dekstop/imgs/ex${event}.png?data=visit" alt="text file" style="width:90px">
                                <a href="/dekstop/windowloader.js?kiv=${file}&usr=${args.usr}&token=${args.token}&file=${args.file}&app=${args.app}">${file}</a>`)
                            }
                        }
                    } else {
                        //console.log("sz??p");
                        let cfg = JSON.parse(fs.readFileSync("./dekstop/opew.json", "utf8"));
                        if (args.kiv == file) {
                            response.write(`
                            <img src="/dekstop/imgs/mappa${event}kiv.png?data=visit" alt="text file" style="width:90px">
                            <a href="/dekstop/windowloader.js?app=${cfg["mapp"]}&file=./dekstop/dats/${args.usr}/ydesk/${file}&usr=${args.usr}&token=${args.token}">${file}</a>`)
                        } else {
                            response.write(`
                            <img src="/dekstop/imgs/mappa${event}.png?data=visit" alt="text file" style="width:90px">
                            <a href="/dekstop/windowloader.js?kiv=${file}&usr=${args.usr}&token=${args.token}&file=${args.file}&app=${args.app}">${file}</a>`)
                        }
                    }
                }
            }
        });
        response.write(`
        <a href="/dekstop/windowloader.js?usr=${args.usr}&token=${args.token}&file=${args.file}&app=${args.app}">ne jel??l??s</a>`)
        response.write(`
        <a href="/dekstop/newfi.js?usr=${args.usr}&token=${args.token}">??j file</a>`)
        if (args.kiv != undefined) {
            response.write(`
            <a href="/dekstop/renami.js?kiv=${args.kiv}&usr=${args.usr}&token=${args.token}">??tnevez??s</a>
            <a href="/dekstop/delf.js?file=${args.kiv}&usr=${args.usr}&token=${args.token}">file t??rl??s</a>
            <a href="/dekstop/windowloader.js?app=easyEditor&file=./dekstop/dats/${args.usr}/ydesk/${args.kiv}&usr=${args.usr}&token=${args.token}">szerkeszt??s</a>
            <a href="/dekstop/windowloader.js?app=downman&file=./dekstop/dats/${args.usr}/ydesk/${args.kiv}&usr=${args.usr}&token=${args.token}">let??lt??s</a>
            <a href="/dekstop/windowloader.js?app=tars&file=./dekstop/dats/${args.usr}/ydesk/${args.kiv}&usr=${args.usr}&token=${args.token}">t??rs??t??s</a>`)
        }
        });
        if (args.app == "undefined") {
            ditaa = {"img":"","todata":"Fatal error! Az app nem tal??lhat??!","title":"Fatal!"}
        } else {
            try {
                let fi = require("./apps/file/" + args.app + ".js")
                var ditaa = fi.getdata(fs, args, args.file, request)
            } catch(e) {
                ditaa = {"img":"","todata":"Fatal error! error: " + e,"title":"Fatal!"}
            }
        }
        /*console.log(ditaa.img);
        console.log(ditaa.todata);*/
        if (ditaa.img == "") {
            ditaa.img = "../../imgs/nof.png"
        }
        if (ditaa.title == undefined || ditaa.title == "") {
            ditaa.title = args.app
        }
        if (ditaa.scroll == undefined || ditaa.scroll == "") {
            ditaa.scroll = "nop"
        }
        setTimeout(function() {
            if (ditaa.scroll == "yep") {
                response.write(`<head>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <style>
                /* width */
                ::-webkit-scrollbar {
                  width: 10px;
                }

                /* Track */
                ::-webkit-scrollbar-track {
                  background: #f1f1f1;
                }

                /* Handle */
                ::-webkit-scrollbar-thumb {
                  background: #888;
                }

                /* Handle on hover */
                ::-webkit-scrollbar-thumb:hover {
                  background: #555;
                }
                </style>
                </head>`)
            }
            response.write(`
            <div class="windowa">
            <div class="windowaup"><img src="/dekstop/apps/imgs/${ditaa.img}?data=visit" alt="immage" style="width:30px">${ditaa.title} <a href="/dekstop/desk.js?usr=${args.usr}&token=${args.token}">X</a></div>
            ${ditaa.todata}
            </div>`)
            response.end()
        }, 1000)
    }
}
}
}
        if (nyam == false) {
            response.write(`<p>Lej??rt a bel??p??si id??/Ez a fi??k nincs haszn??latban!</a>`)
            response.write('<p>??t??r??nyit??s...</p>')
            response.write(`<meta http-equiv="refresh" content="2;url=./login.html" />`)
            response.end()
          }
        } else {
          response.write(`<p>Lej??rt a bel??p??si id??/Ez a fi??k nincs haszn??latban!</a>`)
          response.write('<p>??t??r??nyit??s...</p>')
          response.write(`<meta http-equiv="refresh" content="2;url=./login.html" />`)
          response.end()
          
        }
    }
  }
