exports.getdata = (fs, args, filea) => {
    var data = {"img":"","todata":""}
    function writedata(dataa) {
        data.todata = data.todata + dataa
    }
    
        /*let cfg = JSON.parse(fs.readFileSync("./database/.json", "utf8"));
        var tojson = cfg
        fs.writeFileSync("./database/.json", JSON.stringify(tojson));*/
        writedata('<head><meta charset="UTF-8"><title></title></head>')
        /*let enc = require('../api/encode.js');
        let dec = require('../api/decode.js');
        let al = require('../api/alert.js')*/
        writedata(`<meta name="viewport" content="width=device-width, initial-scale=1">
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
      
      writedata(`
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
        
        }
      </style>
      </head>`)
      
        /*let ars = al.gettall()
        for (var i = 0; i < ars.length; i++) {
          let data = al.write(ars[i][0],ars[i][1])
          writedata(data)
        }*/
        var tommap = filea.split("/")
        //console.log(tommap);
        //console.log(tommap.length);
        tommap = filea.replace("/" + tommap[tommap.length-1],"")
        //console.log(tommap);
        var event = "newy"
        const dir = filea
        if (filea != ".") {
            writedata(`
            <img src="/dekstop/imgs/mappa${event}.png?data=visit" alt="text file" style="width:90px">
            <a href="/dekstop/windowloader.js?app=Searcher&file=${tommap}&usr=${args.usr}&token=${args.token}">../</a>`) 
        }
        fs.readdir(dir, (err, files) => {
            files.forEach(file => {
                if (file.includes(".txt")||file.includes(".html")||file.includes(".js")||file.includes(".wda")) {
                    //console.log("szüp");
                    if (file.includes(".txt")) {
                        let cfg = JSON.parse(fs.readFileSync("./dekstop/opew.json", "utf8"));
                        //<a href="/dekstop/windowloader.js?app=${cfg[".txt"]}&file=./dekstop/ydesk/${file}">${file}</a>
                        if (args.kiv == file) {
                            writedata(`
                            <img src="/dekstop/imgs/text${event}kiv.png?data=visit" alt="text file" style="width:90px">
                            <a href="/dekstop/windowloader.js?app=${cfg[".txt"]}&file=${filea}/${file}&usr=${args.usr}&token=${args.token}">${file}</a>`)    
                        } else {
                            writedata(`
                            <img src="/dekstop/imgs/text${event}.png?data=visit" alt="text file" style="width:90px">
                            <a href="/dekstop/windowloader.js?app=Searcher&file=${filea}&kiv=${file}&usr=${args.usr}&token=${args.token}">${file}</a>`) 
                        }
                    }
                    if (file.includes(".html")) {
                        let cfg = JSON.parse(fs.readFileSync("./dekstop/opew.json", "utf8"));
                        if (args.kiv == file) {
                            writedata(`
                            <img src="/dekstop/imgs/text${event}kiv.png?data=visit" alt="text file" style="width:90px">
                            <a href="/dekstop/windowloader.js?app=${cfg[".html"]}&file=${filea}/${file}&usr=${args.usr}&token=${args.token}">${file}</a>`)    
                        } else {
                            writedata(`
                            <img src="/dekstop/imgs/text${event}.png?data=visit" alt="text file" style="width:90px">
                            <a href="/dekstop/windowloader.js?app=Searcher&file=${filea}&kiv=${file}&usr=${args.usr}&token=${args.token}">${file}</a>`) 
                        } 
                    }
                    if (file.includes(".js")) {
                        let cfg = JSON.parse(fs.readFileSync("./dekstop/opew.json", "utf8"));
                        if (args.kiv == file) {
                            writedata(`
                            <img src="/dekstop/imgs/text${event}kiv.png?data=visit" alt="text file" style="width:90px">
                            <a href="/dekstop/windowloader.js?app=${cfg[".js"]}&file=${filea}/${file}&usr=${args.usr}&token=${args.token}">${file}</a>`)    
                        } else {
                            writedata(`
                            <img src="/dekstop/imgs/text${event}.png?data=visit" alt="text file" style="width:90px">
                            <a href="/dekstop/windowloader.js?app=Searcher&file=${filea}&kiv=${file}&usr=${args.usr}&token=${args.token}">${file}</a>`) 
                        }
                    }
                    if (file.includes(".wda")) {
                        let cfg = JSON.parse(fs.readFileSync("./dekstop/opew.json", "utf8"));
                        if (args.kiv == file) {
                            writedata(`
                            <img src="/dekstop/imgs/text${event}kiv.png?data=visit" alt="text file" style="width:90px">
                            <a href="/dekstop/windowloader.js?app=${cfg[".wda"]}&file=${filea}/${file}&usr=${args.usr}&token=${args.token}">${file}</a>`)    
                        } else {
                            writedata(`
                            <img src="/dekstop/imgs/text${event}.png?data=visit" alt="text file" style="width:90px">
                            <a href="/dekstop/windowloader.js?app=Searcher&file=${filea}&kiv=${file}&usr=${args.usr}&token=${args.token}">${file}</a>`) 
                        }
                    }
                } else {
                    if (file.includes(".png")||file.includes(".pic")||file.includes(".jpg")||file.includes(".gif")) {
                        //console.log("szüp");
                        if (file.includes(".png")) {
                            let cfg = JSON.parse(fs.readFileSync("./dekstop/opew.json", "utf8"));
                            if (args.kiv == file) {
                                writedata(`
                                <img src="/dekstop/imgs/pic${event}kiv.png?data=visit" alt="text file" style="width:90px">
                                <a href="/dekstop/windowloader.js?app=${cfg[".png"]}&file=${filea}/${file}&usr=${args.usr}&token=${args.token}">${file}</a>`)    
                            } else {
                                writedata(`
                                <img src="/dekstop/imgs/pic${event}.png?data=visit" alt="text file" style="width:90px">
                                <a href="/dekstop/windowloader.js?app=Searcher&file=${filea}&kiv=${file}&usr=${args.usr}&token=${args.token}">${file}</a>`) 
                            }
                        }
                        if (file.includes(".pic")) {
                            let cfg = JSON.parse(fs.readFileSync("./dekstop/opew.json", "utf8"));
                            if (args.kiv == file) {
                                writedata(`
                                <img src="/dekstop/imgs/pic${event}kiv.png?data=visit" alt="text file" style="width:90px">
                                <a href="/dekstop/windowloader.js?app=${cfg[".pic"]}&file=${filea}/${file}&usr=${args.usr}&token=${args.token}">${file}</a>`)    
                            } else {
                                writedata(`
                                <img src="/dekstop/imgs/pic${event}.png?data=visit" alt="text file" style="width:90px">
                                <a href="/dekstop/windowloader.js?app=Searcher&file=${filea}&kiv=${file}&usr=${args.usr}&token=${args.token}">${file}</a>`) 
                            }
                        }
                        if (file.includes(".jpg")) {
                            let cfg = JSON.parse(fs.readFileSync("./dekstop/opew.json", "utf8"));
                            if (args.kiv == file) {
                                writedata(`
                                <img src="/dekstop/imgs/pic${event}kiv.png?data=visit" alt="text file" style="width:90px">
                                <a href="/dekstop/windowloader.js?app=${cfg[".jpg"]}&file=${filea}/${file}&usr=${args.usr}&token=${args.token}">${file}</a>`)    
                            } else {
                                writedata(`
                                <img src="/dekstop/imgs/pic${event}.png?data=visit" alt="text file" style="width:90px">
                                <a href="/dekstop/windowloader.js?app=Searcher&file=${filea}&kiv=${file}&usr=${args.usr}&token=${args.token}">${file}</a>`) 
                            }
                        }
                        if (file.includes(".gif")) {
                            let cfg = JSON.parse(fs.readFileSync("./dekstop/opew.json", "utf8"));
                            if (args.kiv == file) {
                                writedata(`
                                <img src="/dekstop/imgs/pic${event}kiv.png?data=visit" alt="text file" style="width:90px">
                                <a href="/dekstop/windowloader.js?app=${cfg[".gif"]}&file=${filea}/${file}&usr=${args.usr}&token=${args.token}">${file}</a>`)    
                            } else {
                                writedata(`
                                <img src="/dekstop/imgs/pic${event}.png?data=visit" alt="text file" style="width:90px">
                                <a href="/dekstop/windowloader.js?app=Searcher&file=${filea}&kiv=${file}&usr=${args.usr}&token=${args.token}">${file}</a>`) 
                            }
                        }
                    } else {
                        if (file.includes(".zip")||file.includes(".rar")||file.includes(".exe")||file.includes(".run")) {
                            //console.log("szüp");
                            let cfg = JSON.parse(fs.readFileSync("./dekstop/opew.json", "utf8"));
                            if (file.includes(".zip")) {
                                if (args.kiv == file) {
                                    writedata(`
                                    <img src="/dekstop/imgs/closed${event}kiv.png?data=visit" alt="text file" style="width:90px">
                                    <a href="/dekstop/windowloader.js?app=${cfg[".zip"]}&file=${filea}/${file}&usr=${args.usr}&token=${args.token}">${file}</a>`)    
                                } else {
                                    writedata(`
                                    <img src="/dekstop/imgs/closed${event}.png?data=visit" alt="text file" style="width:90px">
                                    <a href="/dekstop/windowloader.js?app=Searcher&file=${filea}&kiv=${file}&usr=${args.usr}&token=${args.token}">${file}</a>`) 
                                }
                            }
                            if (file.includes(".rar")) {
                                if (args.kiv == file) {
                                    writedata(`
                                    <img src="/dekstop/imgs/closed${event}kiv.png?data=visit" alt="text file" style="width:90px">
                                    <a href="/dekstop/windowloader.js?app=${cfg[".rar"]}&file=${filea}/${file}&usr=${args.usr}&token=${args.token}">${file}</a>`)    
                                } else {
                                    writedata(`
                                    <img src="/dekstop/imgs/closed${event}.png?data=visit" alt="text file" style="width:90px">
                                    <a href="/dekstop/windowloader.js?app=Searcher&file=${filea}&kiv=${file}&usr=${args.usr}&token=${args.token}">${file}</a>`) 
                                }
                            }
                            if (file.includes(".exe")) {
                                if (args.kiv == file) {
                                    writedata(`
                                    <img src="/dekstop/imgs/closed${event}kiv.png?data=visit" alt="text file" style="width:90px">
                                    <a href="/dekstop/windowloader.js?app=${cfg[".exe"]}&file=${filea}/${file}&usr=${args.usr}&token=${args.token}">${file}</a>">${file}</a>`)    
                                } else {
                                    writedata(`
                                    <img src="/dekstop/imgs/closed${event}.png?data=visit" alt="text file" style="width:90px">
                                    <a href="/dekstop/windowloader.js?app=Searcher&file=${filea}&kiv=${file}&usr=${args.usr}&token=${args.token}">${file}</a>`) 
                                }
                            }
                            if (file.includes(".run")) {
                                if (args.kiv == file) {
                                    writedata(`
                                    <img src="/dekstop/imgs/ex${event}kiv.png?data=visit" alt="text file" style="width:90px">
                                    <a href="/dekstop/windowloader.js?app=${cfg[".run"]}&file=${filea}/${file}&usr=${args.usr}&token=${args.token}">${file}</a>`)    
                                } else {
                                    writedata(`
                                    <img src="/dekstop/imgs/ex${event}.png?data=visit" alt="text file" style="width:90px">
                                    <a href="/dekstop/windowloader.js?app=Searcher&file=${filea}&kiv=${file}&usr=${args.usr}&token=${args.token}">${file}</a>`) 
                                }
                            }
                        } else {
                            //console.log("szüp");
                            let cfg = JSON.parse(fs.readFileSync("./dekstop/opew.json", "utf8"));
                            if (args.kiv == file) {
                                writedata(`
                                <img src="/dekstop/imgs/mappa${event}kiv.png?data=visit" alt="text file" style="width:90px">
                                <a href="/dekstop/windowloader.js?app=${cfg["mapp"]}&file=${filea}/${file}&usr=${args.usr}&token=${args.token}">${file}</a>`)    
                            } else {
                                writedata(`
                                <img src="/dekstop/imgs/mappa${event}.png?data=visit" alt="text file" style="width:90px">
                                <a href="/dekstop/windowloader.js?app=Searcher&file=${filea}&kiv=${file}&usr=${args.usr}&token=${args.token}">${file}</a>`) 
                            } 
                        }
                    }
                }
            });
            writedata(`
            <a href="/dekstop/windowloader.js?app=Searcher&file=${filea}&usr=${args.usr}&token=${args.token}">ne jelölés</a>`)
            writedata(`
            <a href="/dekstop/apps/file/Searcher_Data/newfi.js?to=${filea}&usr=${args.usr}&token=${args.token}">új file</a>`)
            if (args.kiv != undefined) {
                writedata(`
                <a href="/dekstop/apps/file/Searcher_Data/delf.js?file=${args.kiv}&to=${filea}&usr=${args.usr}&token=${args.token}">file törlés</a>
                <a href="/dekstop/windowloader.js?app=easyEditor&file=${filea}/${args.kiv}&usr=${args.usr}&token=${args.token}">szerkesztés</a>
                <a href="/dekstop/windowloader.js?app=downman&file=${filea}/${args.kiv}&usr=${args.usr}&token=${args.token}">letöltés</a>
                <a href="/dekstop/windowloader.js?app=tars&file=${filea}/${args.kiv}&usr=${args.usr}&token=${args.token}">társítás</a>`)   
            }
    
          });
      
            
          
    return data
}