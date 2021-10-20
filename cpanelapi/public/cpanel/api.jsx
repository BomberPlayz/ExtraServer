const fs = require("fs")
const path = require("path")
var uniqid = require('uniqid');

const getAllFiles = function(dirPath, arrayOfFiles) {
    files = fs.readdirSync(dirPath)

    arrayOfFiles = arrayOfFiles || []

    files.forEach(function(file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
        } else {
            arrayOfFiles.push(path.join(dirPath, file))
        }
    })

    return arrayOfFiles
}

const getTotalSize = function(directoryPath) {
    const arrayOfFiles = getAllFiles(directoryPath)

    let totalSize = 0

    arrayOfFiles.forEach(function(filePath) {
        totalSize += fs.statSync(filePath).size
    })

    return totalSize
}


exports.run = async function(request, response, args, fs) {
    response.setHeader("Access-Control-Allow-Origin","*")
    server.rateLimited[request.connection.remoteAddress] = server.rateLimited[request.connection.remoteAddress] + 0.9
    let http = require('http');
    let fetch = require("node-fetch")
    console.log("verify user...")
    let reta = await fetch("http://win.crackpixel.hu:7777/token_login/api.jsx?token=" + args.token + "&mode=verify",{
        headers: { 'origin': 'http://win.crackpixel.hu:1234' }
    })

    let ret = await reta.text()
    console.log(ret)





    if (ret == "true") {
        await fetch("http://win.crackpixel.hu:7777/token_login/api.jsx?token=" + args.token + "&webtoken=ghjdfsagozdsafgihdsafbhdsafhljbgdsafgdsafhgdsafgdaf&mode=protData&key=cpanel_owned_servers",{
            headers: { 'origin': 'http://win.crackpixel.hu:1234' }
        })
        if (args.mode == "new") {

            if (typeof args.type == "undefined") {
                return response.end("err_type_not_defined")
            }

            reta = await fetch("http://win.crackpixel.hu:7777/token_login/api.jsx?token=" + args.token + "&mode=getData&key=cpanel_owned_servers",{
                headers: { 'origin': 'http://win.crackpixel.hu:1234' }
            })

            let rem = await reta.text()



            if (!rem.startsWith("err_")) {
                ret = JSON.parse(rem)
            } else {
                ret = rem
            }
            console.log(ret)


            if (ret != "err_token_invalid") {
                if (ret == "err_data_not_found" || ret == "") {
                    ret = []
                }


                let dat = ret

                let fs = require("fs")
                let serverDat = {}
                serverDat.id = uniqid()
                serverDat.storageSize = 256
                serverDat.type = args.type



                dat.push(serverDat.id.toString())
                reta = await fetch("http://win.crackpixel.hu:7777/token_login/api.jsx?token=" + args.token + "&mode=setData&webtoken=ghjdfsagozdsafgihdsafbhdsafhljbgdsafgdsafhgdsafgdaf&key=cpanel_owned_servers&data=" + JSON.stringify(dat),{
                    headers: { 'origin': 'http://win.crackpixel.hu:1234' }
                })
                ret = await reta.text()

                if (ret == "ok") {
                    fs.mkdirSync("./cpanel/servers/" + serverDat.id)

                    fs.writeFileSync("./cpanel/servers/" + serverDat.id + "/data.json", JSON.stringify(serverDat))
                    response.end("ok")
                    return
                } else {
                    response.end("err_unexpected")
                    return
                }

            } else {
                response.end("err_token_invalid")
                return
            }


        }

        if (args.mode == "del") {
            reta = await fetch("http://win.crackpixel.hu:7777/token_login/api.jsx?token=" + args.token + "&mode=getData&key=cpanel_owned_servers",{
                headers: { 'origin': 'http://win.crackpixel.hu:1234' }
            })

            let rem = await reta.text()


            if (!rem.startsWith("err_")) {
                ret = JSON.parse(rem)
            } else {
                ret = rem
            }


            if (ret != "err_token_invalid") {
                if (ret == "err_data_not_found" || ret == "") {
                    ret = []
                }

                let dat = ret

                let fs = require("fs")



                Array.prototype.remove = function() {
                    var what, a = arguments,
                        L = a.length,
                        ax;
                    while (L && this.length) {
                        what = a[--L];
                        while ((ax = this.indexOf(what)) !== -1) {
                            this.splice(ax, 1);
                        }
                    }
                    return this;
                };

                let yem = false
                let data = JSON.parse(fs.readFileSync("./cpanel/servers/" + args.id + "/data.json"))
                for (let i in ret) {
                    if (ret[i] == data.id.toString()) {
                        yem = true
                        break
                    }
                }
                if (yem) {
                    dat.remove(args.id)
                    reta = await fetch("http://win.crackpixel.hu:7777/token_login/api.jsx?token=" + args.token + "&mode=setData&webtoken=ghjdfsagozdsafgihdsafbhdsafhljbgdsafgdsafhgdsafgdaf&key=cpanel_owned_servers&data=" + JSON.stringify(dat),{
                        headers: { 'origin': 'http://win.crackpixel.hu:1234' }
                    })
                    ret = await reta.text()

                    if (ret == "ok") {
                        var rimraf = require("rimraf");
                        rimraf.sync("./cpanel/servers/" + args.id)
                        response.end("ok")
                    } else {
                        response.end("err_unexpected")
                        return
                    }
                } else {
                    response.end("err_access_denied")
                }

            } else {
                response.end("err_token_invalid")
                return
            }


        }

        if (args.mode == "getInfo") {
            if (typeof args.id == "undefined") {
                response.end("err_id_not_defined")
                return
            }
            let fs = require("fs")
            if (fs.existsSync("./cpanel/servers/" + args.id + "/data.json")) {
                let data = JSON.parse(fs.readFileSync("./cpanel/servers/" + args.id + "/data.json"))

                let sere = await fetch("http://win.crackpixel.hu:7777/token_login/api.jsx?token=" + args.token + "&mode=getData&key=cpanel_owned_servers",{
                    headers: { 'origin': 'http://win.crackpixel.hu:1234' }
                })
                let srvs = await sere.json()
                let yem = false
                for (let i in srvs) {
                    if (srvs[i] == data.id.toString()) {
                        yem = true
                        break
                    }
                }
                if (yem) {
                    let ret = data
                    if (typeof global.cpanel_ruse == "undefined") {
                        global.cpanel_ruse = {}
                    }
                    if (typeof global.cpanel_serse == "undefined") {
                        global.cpanel_serse = {}
                    }
                    if (typeof global.cpanel_cmd == "undefined") {
                        global.cpanel_cmd = []
                    }

                    ret.isOn = global.cpanel_ruse[args.id] ? true : false
                    ret.isErrored = global.cpanel_serse[args.id]
                    ret.console = global.cpanel_cmd[args.id]


                    if (fs.existsSync("./cpanel/servers/" + args.id + "/root/")) {
                        ret.usedStorage = getTotalSize("./cpanel/servers/" + args.id + "/root/") / 1024 / 1024
                    } else {
                        ret.usedStorage = 0
                    }
                    console.log("USSEDDD: " + ret.usedStorage + " MB")
                    response.end(JSON.stringify(ret))

                } else {
                    response.end("err_access_denied")
                }
            } else {
                response.end("err_server_not_exists")
            }


        }

        if (args.mode == "stdin") {
            if (typeof args.id == "undefined") {
                response.end("err_id_not_defined")
                return
            }
            let fs = require("fs")
            if (fs.existsSync("./cpanel/servers/" + args.id + "/data.json")) {
                let data = JSON.parse(fs.readFileSync("./cpanel/servers/" + args.id + "/data.json"))

                let sere = await fetch("http://win.crackpixel.hu:7777/token_login/api.jsx?token=" + args.token + "&mode=getData&key=cpanel_owned_servers",{
                    headers: { 'origin': 'http://win.crackpixel.hu:1234' }
                })
                let srvs = await sere.json()
                let yem = false
                for (let i in srvs) {
                    if (srvs[i] == data.id.toString()) {
                        yem = true
                        break
                    }
                }
                if (yem) {
                    if (typeof global.cpanel_sers[args.id] != "undefined") {
                        global.cpanel_sers[args.id].stdin.write(args.data + "\n")
                        response.end("ok")
                    }
                } else {
                    response.end("err_access_denied")
                }
            } else {
                response.end("err_server_not_exists")
            }
        }

        if (args.mode == "startServer") {
            if (typeof args.id == "undefined") {
                response.end("err_id_not_defined")
                return
            }
            let fs = require("fs")
            if (fs.existsSync("./cpanel/servers/" + args.id + "/data.json")) {
                let data = JSON.parse(fs.readFileSync("./cpanel/servers/" + args.id + "/data.json"))

                let sere = await fetch("http://win.crackpixel.hu:7777/token_login/api.jsx?token=" + args.token + "&mode=getData&key=cpanel_owned_servers",{
                    headers: { 'origin': 'http://win.crackpixel.hu:1234' }
                })
                let srvs = await sere.json()
                let yem = false
                for (let i in srvs) {
                    if (srvs[i] == data.id.toString()) {
                        yem = true
                        break
                    }
                }
                if (yem) {
                    if (typeof global.cpanel_ruse == "undefined") {
                        global.cpanel_ruse = {}
                    }
                    if (typeof global.cpanel_sers == "undefined") {
                        global.cpanel_sers = {}
                    }

                    global.cpanel_serse = {}

                    if (typeof global.cpanel_cmd == "undefined") {
                        global.cpanel_cmd = {}
                    }
                    if (typeof global.cpanel_sers[args.id] != "undefined") {
                        global.cpanel_sers[args.id].kill()
                        global.cpanel_sers[args.id] = undefined
                    }
                    const {
                        spawn
                    } = require('child_process');
                    try {
                        //global.cpanel_sers[args.id] = spawn("firejail",["--whitelist=/home/tuc/rics/makaron/public/cpanel/servers/"+args.id+"/root/","node","/home/tuc/rics/makaron/public/cpanel/servers/"+args.id+"/root/index.js"], {cwd: "./cpanel/servers/" + args.id + "/root/"})
                        //global.cpanel_sers[args.id] = spawn("firejail",["--noblacklist=","ls","/home/"], {cwd: "./cpanel/servers/" + args.id + "/root/"})
                        if (data.type == "nodejs") {
                            global.cpanel_sers[args.id] = spawn("node", ["./index.js"], {
                                cwd: "./cpanel/servers/" + args.id + "/root/"
                            })
                        } else {
                            if (data.type == "minecraft") {
                                global.cpanel_sers[args.id] = spawn("java", ["-jar","server.jar"], {
                                    cwd: "./cpanel/servers/" + args.id + "/root/"
                                })
                            }
                        }

                        global.cpanel_cmd[args.id] = []
                        global.cpanel_serse[args.id] = undefined
                        global.cpanel_sers[args.id].on('spawn', function() {

                            global.cpanel_ruse[args.id] = true
                            global.cpanel_cmd[args.id].push("CPANEL DAEMON -- INFO -- PROCESS SPAWNED!")

                            function muska(args) {
                                if (global.cpanel_ruse[args.id] == true) {
                                    if (getTotalSize("./cpanel/servers/" + args.id + "/root/") / 1024 / 1024 > data.storageSize) {
                                        global.cpanel_serse[args.id] = "CPANEL_DAEMON :: Server killed because of storage overuse."
                                        global.cpanel_cmd[args.id].push("CPANEL_DAEMON :: Server killed because of storage overuse.")
                                        global.cpanel_sers[args.id].kill()
                                    }
                                    //console.log("stottenntestte")

                                    setTimeout(muska, 1000, args)
                                }

                            }
                            setTimeout(muska, 1000, args)


                        })

                        global.cpanel_sers[args.id].on('close', function(code) {
                            if (code != 0) {
                                global.cpanel_serse[args.id] = "CPANEL_DAEMON :: Proecess exited with nonzero exit code: " + code
                                global.cpanel_cmd[args.id].push("CPANEL_DAEMON :: Proecess exited with nonzero exit code: " + code)
                            } else {
                                global.cpanel_cmd[args.id].push("CPANEL_DAEMON :: Process exited with exit code 0")
                            }
                            global.cpanel_sers[args.id] = undefined

                            global.cpanel_ruse[args.id] = false
                        })
                        global.cpanel_sers[args.id].on('error', function(e) {

                            global.cpanel_serse[args.id] = e
                            global.cpanel_sers[args.id] = undefined
                        })
                        global.cpanel_sers[args.id].stdout.on('data', function(dat) {
                            if (typeof global.cpanel_cmd[args.id] == "undefined" || typeof global.cpanel_cmd[args.id] == "object") {
                                global.cpanel_cmd[args.id] = ""
                            }
                            global.cpanel_cmd[args.id] += dat.toString()
                        })
                        global.cpanel_sers[args.id].stderr.on('data', function(dat) {
                            if (typeof global.cpanel_cmd[args.id] == "undefined") {
                                global.cpanel_cmd[args.id] = []
                            }
                            global.cpanel_cmd[args.id].push(dat.toString())
                        })
                    } catch (e) {
                        global.cpanel_serse[args.id] = e
                    }

                    response.end("ok")
                } else {
                    response.end("err_access_denied")
                }
            } else {
                response.end("err_server_not_exists")
            }
        }
        if (args.mode == "stopServer") {
            if (typeof args.id == "undefined") {
                response.end("err_id_not_defined")
                return
            }
            let fs = require("fs")
            if (fs.existsSync("./cpanel/servers/" + args.id + "/data.json")) {
                let data = JSON.parse(fs.readFileSync("./cpanel/servers/" + args.id + "/data.json"))

                let sere = await fetch("http://win.crackpixel.hu:7777/token_login/api.jsx?token=" + args.token + "&mode=getData&key=cpanel_owned_servers",{
                    headers: { 'origin': 'http://win.crackpixel.hu:1234' }
                })
                let srvs = await sere.json()
                let yem = false
                for (let i in srvs) {
                    if (srvs[i] == data.id.toString()) {
                        yem = true
                        break
                    }
                }
                if (yem) {
                    if (typeof global.cpanel_ruse == "undefined") {
                        global.cpanel_ruse = {}
                    }
                    if (typeof global.cpanel_sers == "undefined") {
                        global.cpanel_sers = {}
                    }
                    if (typeof global.cpanel_serse == "undefined") {
                        global.cpanel_serse = {}
                    }
                    await global.cpanel_sers[args.id].kill()
                    global.cpanel_ruse[args.id] = false
                    response.end("ok")
                } else {
                    response.end("err_access_denied")
                }
            } else {
                response.end("err_server_not_exists")
            }
        }

    } else {
        response.end("err_token_invalid")
        return
    }


}