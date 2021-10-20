exports.run = (request, response, args) => {
  var fs = require('fs');
  var url = require('url');
  var quka = url.parse(request.url, true).query;
  var back = "mar van ilyen felhasznalo"
  response.write(`<title>tucube Login</title>`)
  if (!fs.existsSync("./tucube/usrs/" + args.usr + ".json")) {
    if (args.usr == "" || args.usr == undefined || args.usr == "user") {
      response.write(`<p>nincs megadva user name!</p>`)
      return response.end()
    }
    if (args.pass == "" || args.pass == undefined || args.pass == "pass") {
      response.write(`<p>nincs megadva jelszo!</p>`)
      return response.end()
    }
    var cfg = {}
    cfg.usr = {}
    cfg.usr.name = args.usr
    cfg.usr.pass = args.pass
    cfg.stat = {}
    cfg.stat.subs = 0
    cfg.stat.subname = []
    fs.writeFileSync("./tucube/usrs/" + args.usr + ".json", JSON.stringify(cfg));
    response.write(`<p>regisztralva mint: ${args.usr}!</p>`)
    response.write(`<a href="./login.html">irany a login!</a>`)
    response.end()
  } else {
    response.end(back)
  }

}
