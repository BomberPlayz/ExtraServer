exports.run = (request, response, args) => {
  var fs = require('fs');
  function remove(table, txt) {
    const index = table.indexOf(txt);
    if (index > -1) {
      table.splice(index, 1);
    }
  }
  var url = require('url');
  var quka = url.parse(request.url, true).query;
  var back = "mar van ilyen felhasznalo"
  response.write(`<title>tucube Logout</title>`)
  if (args.usr.includes("guest")) {
    response.write(`<p>guest vagy nem tudsz kilepni!</p>`)
    response.write(`<a href="./login.html">de belephetsz!</a>`)
    return response.end()
  }
  var cfg = JSON.parse(fs.readFileSync("./tucube/belep.json"));
  if (!cfg.includes(args.usr)) {
    response.write(`<p>te nem is vagy belepve a rendszerem szerint!</p>`)
    return response.end()
  }
  remove(cfg,args.usr)
  fs.writeFileSync("./tucube/belep.json", JSON.stringify(cfg));
  response.write(`<p>kileptel mostmar bezarhatod ezt az ablakot!</p>`)

}
