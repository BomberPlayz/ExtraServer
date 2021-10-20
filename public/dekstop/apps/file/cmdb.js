exports.getdata = (fs, args, filea) => {
    var data = {"img":"","todata":"","title":"cmd","scroll":"nop"}
    function writedata(dataa) {
        data.todata = data.todata + dataa
    }
    var vers = "1.0 Dekstop"
    let raaam = JSON.parse(fs.readFileSync(`./dekstop/dats/${args.usr}/tmpcmd.json`, "utf8"));
    raaam.push(`${vers}~$${args.usr}#> ${filea}`)
    function chatsay(say, user) {
        let raaam = JSON.parse(fs.readFileSync(`./dekstop/dats/${args.usr}/tmpcmd.json`, "utf8"));
        raaam.push(`${vers}~$${user}#> ${say}`)
        var tojsonas = raaam
        fs.writeFileSync(`./dekstop/dats/${args.usr}/tmpcmd.json`, JSON.stringify(tojsonas));
    }
    var cmds = ["clear", "hello", "print", "version", "help"]
    var cmdsdc = ["clearing console", "hello", "print the words", "get system version", "for this"]
    var splitted = filea.split(" ")
    var tojsonas = raaam
    fs.writeFileSync(`./dekstop/dats/${args.usr}/tmpcmd.json`, JSON.stringify(tojsonas));
    if (filea == "clear") {
        let raaam = JSON.parse(fs.readFileSync(`./dekstop/dats/${args.usr}/tmpcmd.json`, "utf8"));
        raaam = []
        var tojsonas = raaam
        fs.writeFileSync(`./dekstop/dats/${args.usr}/tmpcmd.json`, JSON.stringify(tojsonas));
    } else {
        if (filea == "hello") {
            chatsay("hello!","System:Cmd")
        } else {
            if (splitted[0] == "print") {
                let txt = ""
                for (let i = 1; i < splitted.length; i++) {
                    txt = txt + splitted[i] + " "
                }
                chatsay(`${txt}`,"System:Cmd")
            } else {
                if (splitted[0] == "Eval" && args.usr == "admin") {
                    let txt = ""
                    for (let i = 1; i < splitted.length; i++) {
                        txt = txt + splitted[i] + " "
                    }
                    chatsay(eval(txt),"System:Eval")
                } else {
                    if (splitted[0] == "version") {
                        chatsay("version: " + vers,"System:Cmd")
                    } else {
                        if (splitted[0] == "help") {
                            let txt = "<p></p>"
                            for (let i = 0; i < cmds.length; i++) {
                                txt = txt + `${cmds[i]}: ${cmdsdc[i]}` + "<p></p>"
                            }
                            chatsay(`${txt}`,"System:Cmd")
                            chatsay(`this is ${cmds.length} commands`,"System:Cmd")
                        } else {
                            if (splitted[0] == "shutdown" && args.usr == "admin") {
                                chatsay(`shutdown completted!`,"System:Power")
                                global.shutdown()
                            } else {
                                if (splitted[0] == "restart" && args.usr == "admin") {
                                    chatsay(`shutdown completted!`,"System:Power")
                                    global.shutdown()
                                } else {
                                    chatsay("Command not found!","System:Cmd:Error")
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    writedata('<p>átírányitás...</p>')
    writedata(`<meta http-equiv="refresh" content="2;url=/dekstop/windowloader.js?app=cmda&file= &usr=${args.usr}&token=${args.token}" />`)
    return data
}