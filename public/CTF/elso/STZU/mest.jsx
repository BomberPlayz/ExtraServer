exports.run = async function (request, response, args) {
  response.writeHeader(200, {"Content-type": "text/html"})
  response.end("<video src='./fanyar.mp3'></video>")
}
