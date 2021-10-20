exports.run = async function (request, response, args) {
let appname = args.file
let yourfile = args.arg

response.writeHeader(200, {
  'Content-Type': 'text/html'
})

console.log(appname+"       ---     "+yourfile)
console.log("./public/virtual_desk/desktop/" + appname+".js")
let fs = require("fs")
let fi = require("./" + appname+".js")
        console.log(fi)
        let ditaa = fi.getdata(fs, args, yourfile, request)
        /*console.log(ditaa.img);
        console.log(ditaa.todata);*/
        if (ditaa.img == "") {
            ditaa.img = "../../imgs/nof.png"
        }
        console.log(ditaa.todata);
        response.end(ditaa.todata)

}
