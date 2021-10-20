exports.run = async function (request, response, args) {
  response.writeHeader(200, {"Content-type": "html"})
  response.end("<p>Szüp! Targonca! Zopra! Umbra!</p><p>URL-BET-1-P-SZ-ELOZ-SZAVK</p>")

}
