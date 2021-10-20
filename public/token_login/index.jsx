exports.run = async function(request, response, args, fs) {
    if(typeof global.users == "undefined") {
        global.users = []
    }

    if(typeof args.token == "undefined") {
        response.write('<a href="./login.jsx">Nincs token, nem vagy belépve?</a>')
    } else {
        let oka = require("./verifyUser.js")
        //console.log(oka.check);
        let ok = oka.check(args.token)
        console.log(ok);
        if(ok != "ok") { response.end(ok); return; }

        //logined data
        response.end("MEGY")

    }
}

/*
GET tuc FROM DATABASE tac
GET tuc@user,pass FROM DATABASE tac
GET tuc@user=mac?pass:_denymsg_#denymsg!?none?denymsg:nincsden FROM DATABASE tac
*/
