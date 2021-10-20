exports.run = async function(request, response, args, fs) {
    let fs = require("fs")
    function checkToken(token, type) {
        if (type == "web") {
            let files = fs.readdirSync("./login2/database/web/")
            files.forEach(function(file, index){
                let dat = JSON.parse(fs.readFileSync("./login2/database/web/"+file))
                if (dat.token == token) {
                    return true
                }
            })
        } else {
            if (type == "client") {
                let files = fs.readdirSync("./login2/database/account/")
                files.forEach(function(file, index){
                    let dat = JSON.parse(fs.readFileSync("./login2/database/account/"+file))
                    if (dat.token == token) {
                        return true
                    }
                })
            }
        }
        return false
    }
    if (args.type == "web") {
        if (typeof args.token == undefined) {
            response.end(`{"error": "err_token_not_defined"}`)
            return
        }
        if (checkToken(args.token,"web")) {

            if (typeof args.mode == "undefined") {
                response.end(`{"error": "err_mode_not_defined"}`)
                return
            }
            if (args.mode == "getOnetimeLoginToken") {
                if (typeof args.redirect == "udnefined") {

                    response.end(`{"error": "err_redirect_not_defined"}`)
                    return

                }

                
            }

        } else {
            response.end(`{"error": "err_token_invalid"}`)
            return
        }
    }
}