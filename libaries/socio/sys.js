//plase doesn't edit this!
//system command
var fs = require('fs');
exports.son = (message, callback) => {
    global.socio = {}
    global.socio.messez = {}
    if (message == "connect") {
        let tucs = {"son": function(messagea, megesza, callbacka) {
            if (messagea == "listen") {
                if (megesza != "") {
                    global.socio.messez[megesza] = {}
                    global.socio.messez[megesza].callbacck = callbacka
                    //callbacka()
                } else {
                    console.error("No data")
                }
            }
        }}
        callback(tucs)
    }
}
exports.stc = (socmess, message) => {
    //global.socio.messez[socmess].callbacck(message)
    eval(global.socio.messez[socmess].callbacck + "; run()")
}
//client command
exports.run = (request, response, args, fs) => {
    if (args.mode == "send") {
        global.socio.messez[args.socmess].callbacck(args.message)
    }
    if (args.mode == "set") {
        global.socio.messez[args.socmess] = {}
        global.socio.messez[args.socmess].callbacck = args.callb
    }
}