
exports.run = async function (request, response) {
let appname = request.query.file
let yourfile = request.query.arg

response.writeHeader(200, {
  'Content-Type': 'text/html'
})

let fi = require("./desktop/" + appname)
        console.log(fi)
        let ditaa = fi.getdata(fs, "", yourfile)
        /*console.log(ditaa.img);
        console.log(ditaa.todata);*/
        if (ditaa.img == "") {
            ditaa.img = "../../imgs/nof.png"
        }

}
