exports.run = async function (request, response, args) {
let appname = args.app
let yourfile = args.file

response.writeHeader(200, {
  'Content-Type': 'text/html'
})

console.log(appname+"       ---     "+yourfile)
console.log("./" + appname+".js")
let fs = require("fs")
let fi = require("./" + appname+".js")
        console.log(fi)
        let ditaa = fi.getdata(fs, "", yourfile)
        /*console.log(ditaa.img);
        console.log(ditaa.todata);*/
        if (ditaa.img == "") {
            ditaa.img = "../../imgs/nof.png"
        }
        console.log(ditaa.todata);
        response.end(ditaa.todata)

}
