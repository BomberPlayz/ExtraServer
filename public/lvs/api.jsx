exports.run = (request, response, args, fs) => {
    server.rateLimited[request.connection.remoteAddress] = server.rateLimited[request.connection.remoteAddress] + 0.9
    let twmsCmds = JSON.parse(require("fs").readFileSync("./lvs/commands.json"))
    console.log(twmsCmds)
    if (args.mode == "TWMSget") {
        let cmd = "notFound"
        for (let cmda in twmsCmds) {
            console.log(twmsCmds[cmda].name)
            console.log(args.name)
            if (twmsCmds[cmda].name == args.name) {
                console.log("its equal: "+twmsCmds[cmda].name)
                cmd = twmsCmds[cmda]
            }
        }
        console.log(cmd)
        if (cmd != "notFound") {
            response.end(`{name="${cmd.name}",desc="${cmd.desc ? cmd.desc : "No description set."}",run="${cmd.run}"}`)
        } else {
            response.end("notFound")
        }
        return

    }
    if (args.mode == "TWMSall") {
        let comma = ""
        let res = "{"
        for (let cmda in twmsCmds) {
            let cmd = twmsCmds[cmda]
            res = res+`${comma}{name="${cmd.name}",desc="${cmd.desc ? cmd.desc : "No description set."}",run="${cmd.run}"}`
            comma = ",";

        }
        res = res+"}"
        response.end(res)
        return
    }
    if (args.mode == "TWMSset") {
        twmsCmds.push({name: args.name, desc: args.desc, run: args.run})
        require("fs").writeFileSync("./lvs/commands.json",JSON.stringify(twmsCmds))
        response.end("ok")
        return
    }
    response.end("Bro you got the wrong data")
}