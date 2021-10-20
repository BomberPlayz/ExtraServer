const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
var fs = require("fs")
var url = require('url');

global.ipban = []

let bannedIPS = []

function newlisten(prc, run) {
    app.get(prc, (req, res) => {
        bannedIPS = global.ipban
        let ip = req.connection.remoteAddress.replace("::ffff:", "")
        let ti = false
        for (let i = 0; i < bannedIPS.length; i++) {
            if (ip == bannedIPS[i]) {
                ti = true
            }
        }
        if (ti == true) {
            return res.end("Your ip has ben banned")
        }
        run(req, res, ip)
    });
}

tas("./")
let sizze = 0
function tas(dir) {
    fs.readdir(dir, (err, files) => {
        files.forEach(file => {
            if(!fs.lstatSync(dir + "/" + file).isDirectory()) {
                sizze = sizze + fs.lstatSync(dir + "/" + file).size
            } else {
                tas(dir + "/" + file + "/")
            }
        })    
    });
}

var maxsize = 47625376523476527

setTimeout(function () {
    sizze = sizze/1024/1024
    console.log("\x1b[32m[fs] All files size: " + Math.floor(sizze/maxsize*100) + "%(" + Math.floor(sizze*100)/100 + "MB/" + maxsize + "MB)");
    console.log("\x1b[0m");   
    if (Math.floor(sizze/maxsize*100) > 75) {
        console.log("\x1b[33mYour disk usage upper 75%");
        console.log("\x1b[0m");
    }  
    if (Math.floor(sizze/maxsize*100) >= 90&&Math.floor(sizze/maxsize*100) <= 99) {
        console.log("\x1b[31mYour disk is full!!!");
        console.log("\x1b[0m");
    }
    if (Math.floor(sizze/maxsize*100) > 99) {
        console.log("\x1b[31mYour disk is upper full!!!");
        console.log("\x1b[0m");
        process.exit(1)
    }
}, 1000)

newlisten("/", function(req, res, ip) {
    console.log("REQUEST TO / ::: "+req.connection.remoteAddress)
    let file = "/public/panel.jsx"
    let synt = file.split(".")[1]
    if (synt == "jsx") {
        var fullurl = req.protocol + '://' + req.get('host') + req.originalUrl
        var quka = url.parse(fullurl, true).query;
        let fi = require(__dirname + file)
        try {
            fi.run(req, res, ip, quka, fs)
        } catch (error) {
            throw error
        }
    } else {
        res.sendFile(__dirname + file);
    }
})

newlisten("/api", function(req, res, ip) {
    console.log("REQUEST TO /api ::: "+req.connection.remoteAddress)
    let file = "/public/api.jsx"
    let synt = file.split(".")[1]
    if (synt == "jsx") {
        var fullurl = req.protocol + '://' + req.get('host') + req.originalUrl
        var quka = url.parse(fullurl, true).query;
        let fi = require(__dirname + file)
        try {
            fi.run(req, res, ip, quka, fs)
        } catch (error) {
            throw error
        }
    } else {
        res.sendFile(__dirname + file);
    }
})



/*var maxfile = 1000

let fiff = 0
let lat = false
list("")
function list(dir) {
    let dira = "./public/" + dir
    fs.readdir(dira, (err, files) => {
        files.forEach(file => {
            if(!fs.lstatSync(dira + "/" + file).isDirectory()) {
                let synt = file.split(".")[1]
                fiff++
                if (fiff >= maxfile&&lat == false) {
                    lat = true
                    return console.log("\x1b[31mMax files reached");
                }
                if (lat == true) {
                    return
                }
                newlisten("/" + dir + file, function(req, res, ip) {
                    if (synt == "jsx") {
                        var fullurl = req.protocol + '://' + req.get('host') + req.originalUrl
                        var quka = url.parse(fullurl, true).query;
                        let fi = require(dira + "/" + file)
                        try {
                            fi.run(req, res, ip, quka, fs)
                        } catch (error) {
                            res.end(error.stack)
                            console.log(error.stack);
                        }
                    } else {
                        //res.writeHeader(200, {"Content-Type": "text/html"});
                        let fi = fs.readFileSync(dira + "/" + file);
                        //res.sendFile(dira + file);
                        res.write(fi)
                        res.end()
                    }
                });
            } else {
                list(dir + file + "/")
            }
        })
    });
}*/

http.listen(1026, () => {
    console.log("\x1b[32m[web] Web elindult");
    console.log("[web] Listening on: http://*:1026");
    console.log("\x1b[0m");
});