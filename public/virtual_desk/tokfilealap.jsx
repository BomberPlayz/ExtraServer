exports.run = async function(request, response, args, fs) {
    if(typeof global.users == "undefined") {
        global.users = []
    }

    if(typeof args.token == "undefined") {
        response.write('<a href="./login.jsx">Nincs token, nem vagy belépve?</a>')
    } else {
        let oka = require("./verifyUser.js")
        //console.log(oka.check);
        let ok = oka.check(args.user,args.token)

        //logined data
        response.end("JÁÉÁ")

    }
}
