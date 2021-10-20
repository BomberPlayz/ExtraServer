exports.run = (request, response, args, fs) => {
  response.write(`<title>tucube</title>`)
  const dir = "./tucube/vidijson/"
  if (args.usr.includes("guest")) {
    response.write(`<p>te csak guest vagy nem likeolhatsz</p>`)
    response.write(`<a href='./play.jsx?id=${args.vid}&usr=${args.usr}'>vissza</a>`)
    return response.end()
  }
  fs.readdir(dir, (err, files) => {
  files.forEach(file => {
    let asd = file.replace(".json", "")
    var cfg = JSON.parse(fs.readFileSync("./tucube/vidijson/" + asd + ".json"));
    if (cfg.id == args.vid) {
      if (args.data == "fel" || args.data == "le") {
        if (!cfg.like.usrs.includes(args.usr)) {
          cfg.like[args.data]++
          cfg.like.usrs.push(args.usr)
          fs.writeFileSync("./tucube/vidijson/" + asd + ".json", JSON.stringify(cfg));
          response.end(`<meta http-equiv="refresh" content="0; url=./play.jsx?id=${cfg.id}&usr=${args.usr}" />`)
        } else {
          response.end(`<meta http-equiv="refresh" content="0; url=./play.jsx?id=${cfg.id}&usr=${args.usr}" />`)
        }
      } else {
        response.write(`<p>nincs kivalasztva mejiket akarod!</p>`)
        response.write(`<a href='./play.jsx?id=${cfg.id}&usr=${args.usr}'>vissza</a>`)
        response.end()
      }
    }
  })
  })
}
