let fs = require("fs")
let getFirstLine = require("firstline")


exports.run = async function (request, response, args) {
  if(args.file && fs.existsSync(args.file) && args.file != "firstline.jsx" && !fs.lstatSync(args.file).isDirectory()) {
  let meter = await getFirstLine(args.file)
  response.end(meter)
  } else {
  response.end("err_file_no");
  }
}
