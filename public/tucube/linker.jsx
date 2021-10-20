exports.run = (request, response, args, fs) => {
  response.write(`<title>link</title>`)
  if (args.data == "cr") {
    var cfgt = JSON.parse(fs.readFileSync("./tucube/load.json"));
    let usr = String(cfgt.gus)
    //Number()
    //String()
    cfgt.gus++
    fs.writeFileSync("./tucube/load.json", JSON.stringify(cfgt));
    response.write(`<a href='./play.js?id=${args.id}&usr=guest${usr}'>${request.headers.host}/tucube/play.js?id=${args.id}&usr=guest${usr}</a><br>`)
    response.write(`<a href='./play.js?id=${args.id}&usr=${args.usr}'>vissza</a>`)
    response.end()
  } else {
    response.write(`<p>nincs megadva data!</p>`)
    response.write(`<a href='./index.js?usr=${args.usr}'>vissza</a>`)

  }
}
