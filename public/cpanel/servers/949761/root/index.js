const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
var fs = require("fs")
var url = require('url');

let bannedIPS = []
app.get('/', (req, res) => {
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
    res.sendFile(__dirname + '/index.html');
});
app.get('/shutdown', (req, res) => {
    var fullurl = req.protocol + '://' + req.get('host') + req.originalUrl
    var args = url.parse(fullurl, true).query;
    res.write(`<script>window.location.href = window.location.protocol + "//" + window.location.host.split(":")[0] + ":1012/?user=${args.user}&fold=."</script>`)
    setTimeout(function () {
        process.exit(0)
    }, 1000)
});
list("")
function list(dir) {
    console.log("DIRTESSE: "+__dirname + "\\" + dir)
    let dira = __dirname + "\\" + dir
    fs.readdir(dira, (err, files) => {
        console.log(files)
        files.forEach(file => {
            if(!fs.lstatSync(dira + "/" + file).isDirectory()) {
                let synt = file.split(".")[1]
                app.get("/" + dir + file, (req, res) => {
                    try {
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
                        var fullurl = req.protocol + '://' + req.get('host') + req.originalUrl
                        if (synt == "jsx") {
                            var quka = url.parse(fullurl, true).query;
                            let fi = require('/' + dir + file)
                            fi.run(req, res, quka, fs, server)
                        } else {
                            res.sendFile(__dirname + '/' + dir + file);
                        }
                    } catch(e) {
                        res.end("<head><meta charset='UTF-8'><title></title></head>" + e + " error történt(automatán logolva!)")
                    }
                });
            } else {
                list(dir + file + "/")
            }
        })
    });
}

http.listen(1013, () => {
    console.log("\x1b[32m[web] Web elindult");
    console.log("\x1b[0m");
});