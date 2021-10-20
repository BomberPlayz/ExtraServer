var io = require("socket.io").Server

var users = new Map()



io.on("connection",function(socket) {
    let adr = socket.handshake.address
    socket.on("login",function(name,pass){
        if(users.find(name).length > 0) {
            socket.emit("loginResult",false,"alreadyExists")
        } else {
            users.set(name,{

                servers: {

                },
                friendlist: {

                }

            })
            socket.emit("loginResult",true)
        }
    })

    socket.on("sendMessage",function(text){

    })
})