exports.run = async function(request, response, args, fs) {
    server.rateLimited[request.connection.remoteAddress] = server.rateLimited[request.connection.remoteAddress] + 0.4
    response.setHeader("Access-Control-Allow-Origin","*")
    //for (let i=1; i<100000000; i++){}
    let origin = request.headers.origin ? request.headers.origin : "main"

    if (args.mode == "verify") {
        let usr = require("./verifyUser").checkraw(args.token)
        if (typeof usr.name != "undefined") {
            response.end("true")
        } else {
            response.end("false")
        }
    return
    }

    //console.log("referrer: "+origin)
    let database = "./token_login/database/"
    let usr = require("./verifyUser").checkraw(args.token)
    if (typeof usr.name != "undefined") {
        if (usr.isBanned != true) {
            if (args.mode == "resetData") {
                let usr = require("./verifyUser").checkraw(args.token)
                if (typeof usr.name != "undefined") {

                    if (typeof usr.protKeys != "undefined") {
                        usr.protKeys[origin] = {}
                    }
                    usr.storage[origin] = {}
                    fs.writeFileSync(database + "accounts/" + usr.name + ".json", JSON.stringify(usr))
                    response.end("ok")
                } else {
                    response.end("err_token_invalid")
                }
            }
            if (args.mode == "setData") {
                let usr = require("./verifyUser").checkraw(args.token)
                if (typeof usr.name != "undefined") {
                    if (typeof usr.storage == "undefined") {
                        usr.storage = {}
                    }
                    if (typeof usr.storage[origin] == "undefined") {
                        usr.storage[origin] = {}
                    }
                    if (typeof args.key == "undefined") {
                        response.end("err_key_not_defined")
                        return
                    }
                    if (typeof args.data == "undefined") {
                        response.end("err_data_not_defined")
                        return
                    }
                    let webtok = ""
                    try {
                        webtok = require("./database/web/" + origin + ".json")
                        delete require.cache[require.resolve("./database/web/" + origin + ".json")]
                    } catch (e) {

                    }
                    if ((usr.protKeys && usr.protKeys[origin] && usr.protKeys[origin][args.key] != true) || typeof usr.protKeys == "undefined" || typeof usr.protKeys[origin] == "undefined" || (webtok && webtok.webtoken == args.webtoken)) {
                        try {

                            console.log("argdata: " + args.data)

                            usr.storage[origin][args.key] = JSON.parse(args.data)
                        } catch (e) {
                            usr.storage[origin][args.key] = args.data
                        }
                        fs.writeFileSync(database + "accounts/" + usr.name + ".json", JSON.stringify(usr))
                        response.end("ok")
                    } else {
                        response.end("err_data_protected")
                    }
                } else {
                    response.end("err_token_invalid")
                }
            }
            if (args.mode == "protData") {
                let webtok = ""
                try {
                    webtok = require("./database/web/" + origin + ".json")
                    delete require.cache[require.resolve("./database/web/" + origin + ".json")]

                } catch (e) {

                }
                if (webtok == "" || typeof webtok == "undefined" || webtok.webtoken != args.webtoken) {
                    response.end("err_webtoken_error")
                } else {
                    let usr = require("./verifyUser").checkraw(args.token)
                    if (typeof usr.name != "undefined") {
                        if (typeof usr.protKeys == "undefined") {
                            usr.protKeys = {}
                        }
                        if (typeof usr.protKeys[origin] == "undefined") {
                            usr.protKeys[origin] = {}
                        }
                        usr.protKeys[origin][args.key] = true
                        fs.writeFileSync(database + "accounts/" + usr.name + ".json", JSON.stringify(usr))
                        response.end("ok")
                    } else {
                        response.end("err_token_invalid")
                    }
                }
            }
            if (args.mode == "unprotData") {
                let webtok = ""
                try {
                    webtok = require("./database/web/" + origin + ".json")
                    delete require.cache[require.resolve("./database/web/" + origin + ".json")]


                } catch (e) {

                }
                if (webtok == "" || typeof webtok == "undefined" || webtok.webtoken != args.webtoken) {
                    response.end("err_webtoken_error")
                } else {
                    let usr = require("./verifyUser").checkraw(args.token)
                    if (typeof usr.name != "undefined") {
                        if (typeof usr.protKeys == "undefined") {
                            usr.protKeys = {}
                        }
                        if (typeof usr.protKeys[origin] == "undefined") {
                            usr.protKeys[origin] = {}
                        }
                        usr.protKeys[origin][args.key] = false
                        fs.writeFileSync(database + "accounts/" + usr.name + ".json", JSON.stringify(usr))
                        response.end("ok")
                    } else {
                        response.end("err_token_invalid")
                    }
                }
            }
            if (args.mode == "delData") {
                let usr = require("./verifyUser").checkraw(args.token)
                if (typeof usr.name != "undefined") {
                    if (typeof usr.storage == "undefined") {
                        usr.storage = {}
                    }
                    if (typeof usr.storage[origin] == "undefined") {
                        usr.storage[origin] = {}
                    }
                    if (typeof args.key == "undefined") {
                        response.end("err_key_not_defined")
                        return
                    }

                    delete usr.storage[origin][args.key]
                    fs.writeFileSync(database + "accounts/" + usr.name + ".json", JSON.stringify(usr))
                    response.end("ok")
                } else {
                    response.end("err_token_invalid")
                }
            }
            if (args.mode == "getData") {
                let usr = require("./verifyUser").checkraw(args.token)
                if (typeof usr.name != "undefined") {

                    if (args.key == "user") {
                        response.end(usr.name)
                        return
                    }
                    if (typeof usr.storage == "undefined") {
                        usr.storage = {}
                    }
                    if (typeof usr.storage[origin] == "undefined") {
                        usr.storage[origin] = {}
                    }
                    if (typeof args.key == "undefined") {
                        response.end("err_key_not_defined")
                        return

                    }
                    if (typeof usr.storage[origin][args.key] == "undefined") {
                        response.end("err_data_not_found")
                        return
                    }
                    fs.writeFileSync(database + "accounts/" + usr.name + ".json", JSON.stringify(usr))

                    if (typeof usr.storage[origin][args.key] == "object") {

                        response.end(JSON.stringify(usr.storage[origin][args.key]))
                    } else {

                        response.end(usr.storage[origin][args.key].toString())
                    }

                    return

                } else {
                    response.end("err_token_invalid")
                    return
                }
            }

            if (args.mode == "getDataBulk") {
                let usr = require("./verifyUser").checkraw(args.token)
                if (typeof usr.name != "undefined") {

                    if (args.key == "user") {
                        response.end(usr.name)
                    }
                    if (typeof usr.storage == "undefined") {
                        usr.storage = {}
                    }
                    if (typeof usr.storage[origin] == "undefined") {
                        usr.storage[origin] = {}
                    }
                    if (typeof args.key == "undefined") {
                        response.end("err_key_not_defined")
                        return
                    }
                    let ret = {}
                    fs.writeFileSync(database + "accounts/" + usr.name + ".json", JSON.stringify(usr))
                    for (i in usr.storage[origin]) {

                        if (i.includes(args.key)) {

                            if (typeof usr.storage[origin][i] == "object") {
                                console.log("stringed: " + JSON.stringify(usr.storage[origin][i]))
                                ret[i] = usr.storage[origin][i]
                            } else {
                                console.log("DATTTTAAAAAAAAAAAAAAAAAAAAAAAAAA: " + usr.storage[origin][i])
                                ret[i] = usr.storage[origin][i]
                            }

                        }
                    }

                    response.end(JSON.stringify(ret))

                } else {
                    response.end("err_token_invalid")
                }
            }
        } else {
            response.end("err_account_suspended")
            return
        }
    } else {
        response.end("err_token_invalid")
    }



}