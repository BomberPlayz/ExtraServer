exports.run = async function (request, response, args) {
    var common = require("../../api/common.js")
    var fs = require("fs")
    console.log("+a");
    common.processPost(request,response,function(data) {
        try {
        let args = request.post
        console.log(args);
        if(args.mode == "write") {
            fs.writeFileSync(request.post.file, request.post.data)
            response.end("ok")
        } else {
            if(args.mode == "read") {
                
                response.end(fs.readFileSync(args.file))
            } else {
                if (args.mode == "readDir") {
                    let a = fs.readdirSync(args.file)
                    console.log("mappikaaaa: "+args.file);
                    console.log(a);
                    response.end(JSON.stringify(a))
                } else {
                    if(args.mode == "mkdir") {
                        fs.mkdirSync(args.file)
                        response.end("ok")
                    }
                }
            }
        }
    } catch(e) {
        response.end(e.stack)
    }
      })
    
}