

const fs = require("fs")
const path = require("path")



var servers = {
    
    27637645276: {
        name: "Tucika Network",
        channels: [123123123],
        members: {
            765237654: {
                roles: [76853764],
                joinDate: "2021-06-04-16:33:45"
            }
        },
        roles: [76853764]
    }

}

var roles = {
    76853764: {
        name: "default",
        color: "#156cc8",
        permissions: {
            SEND_MESSAGES: true,
            SEE_CHANNELS: true,
            SEND_EMOJIS: true,
            EDIT_CHANNELS: false
        }
    },
    4534563: {
        name: "MUTED",
        color: "#ff0000",
        permissions: {
            SEND_MESSAGES: false,
            SEE_CHANNELS: true,
            SEND_EMOJIS: false,
            EDIT_CHANNELS: false
        }
    }
}


var channels = {
    123123123: {
        name: "általános",
        type: "text",
        messages: [76534234],
        permissions: {
            76853764: {

            },
            "_SPECIAL": {
                763456324: { //pl egy muteolt user
                    SEND_MESSAGES: false
                }
            }
        }
    },
    43524356: {
        name: "muted-chat",
        type: "text",
        messages: [34545,243543,24532453],
        permissions: {
            4534563: {
                SEND_MESSAGES: true,
            },
            "_SPECIAL": {
                763456324: { //pl egy muteolt user
                    SEND_MESSAGES: false
                }
            }
        }
    }
}

var messages = {
    76534234: {
        sender: 765237654,
        content: "Sziasztok! Tok embeded küldeni!!",
        sendDate: "2021-06-04-16:37:23",
        embeds: [
            {
                title: "lol",
                fields: [
                    {
                        type: "text",
                        content: "li-cil-oc :)"

                    }
                ]
            }
        ]
    }
}

exports.run = async function(request, response, args, fs) {
    let http = require('http');
    let fetch = require("node-fetch")
    console.log("verify user...")
    let reta = await fetch("http://localhost:1234/token_login/api.jsx?token="+args.token+"&mode=verify")
    let ret = await reta.text()

    let macs = await fetch("http://localhost:1234/token_login/api.jsx?token="+args.token+"&mode=getData&key=user")
    let mem = await macs.text()


    let membID =


    if (ret == "true") {

        if (args.mode == "getMessage") {
            let isMember = false
            for (let server in servers) {
                if (server.members.includes(membID)) {

                }
            }

        }


    } else {
        response.writeHead(401, "err_unauthorized")
        response.end("err_token_invalid")
        return
    }


}