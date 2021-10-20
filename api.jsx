exports.run = async (request, response, ip, args, fs) => {
    /*let cfg = JSON.parse(fs.readFileSync("./database/.json", "utf8"));
    var tojson = cfg
    fs.writeFileSync("./database/.json", JSON.stringify(tojson));*/
    let cfg = JSON.parse(fs.readFileSync("./public/datas.json", "utf8"));
    if (args.mode == "genServer") {
        cfg[args.server] = {}
        cfg[args.server].old = {}
        cfg[args.server].power = "off"
        cfg[args.server].gens = "off"
        cfg[args.server].grid = "off"
        cfg[args.server].starter = "off"
        cfg[args.server].stop = "on"
        cfg[args.server].torta = "0"
        cfg[args.server].speed = "0"
        cfg[args.server].volt = "0"
        cfg[args.server].bele = false
    }
    if (cfg[args.server] != undefined) {
        if (args.mode == "getPower") {
            response.write(cfg[args.server].power)
        }
        if (args.mode == "getSpeed") {
            response.write(cfg[args.server].speed)
        }
        if (args.mode == "getTorta") {
            response.write(cfg[args.server].torta)
        }
        if (args.mode == "setPower") {
            if (cfg[args.server].bele == false) {
                cfg[args.server].power = args.value
                response.write("ok!")
            }
        }
        if (args.mode == "getGens") {
            response.write(cfg[args.server].gens)
        }
        if (args.mode == "getGrid") {
            response.write(cfg[args.server].grid)
        }
        if (args.mode == "getStarter") {
            response.write(cfg[args.server].starter)
        }
        if (args.mode == "setGens") {
            if (cfg[args.server].bele == false) {
                cfg[args.server].gens = args.value
                response.write("ok!")
            }
        }
        if (args.mode == "setGrid") {
            if (cfg[args.server].bele == false) {
                cfg[args.server].grid = args.value
                response.write("ok!")
            }
        }
        if (args.mode == "setStarter") {
            if (cfg[args.server].bele == false) {
                cfg[args.server].starter = args.value
                response.write("ok!")
            }
        }
        if (args.mode == "setTorta") {
            cfg[args.server].torta = args.value
            response.write("ok!")
        }
        if (args.mode == "setSpeed") {
            cfg[args.server].speed = args.value
            response.write("ok!")
        }
        if (args.mode == "getStop") {
            response.write(cfg[args.server].stop)
        }
        if (args.mode == "setStop") {
            if (cfg[args.server].bele == false) {
                cfg[args.server].stop = args.value
                response.write("ok!")
            }
        }
        if (args.mode == "setVolt") {
            cfg[args.server].volt = args.value
            response.write("ok!")
        }
        if (args.mode == "getVolt") {
            response.write(cfg[args.server].volt)
        }
    } else {
        response.write("err_server_not_exists")
    }
    fs.writeFileSync("./public/datas.json", JSON.stringify(cfg));
    response.end()
}