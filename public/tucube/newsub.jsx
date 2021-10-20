exports.run = (request, response, args, fs) => {
  response.write(`<title>tucube</title>`)
  const dir = "./tucube/vidijson/"
  if (args.usr.includes("guest")) {
    response.write(`<p>te csak guest vagy nem iratkozhatsz fel!</p>`)
    response.write(`<a href='./play.js?id=${args.vid}&usr=${args.usr}'>vissza</a>`)
    return response.end()
  }
  fs.readdir(dir, (err, files) => {
  files.forEach(file => {
    let asd = file.replace(".json", "")
    var cfga = JSON.parse(fs.readFileSync("./tucube/vidijson/" + asd + ".json"));
    var cfg = JSON.parse(fs.readFileSync("./tucube/usrs/" + cfga.creator + ".json"));
    if (cfga.id == args.vid) {
      if (!cfg.stat.subname.includes(args.usr)) {
        cfg.stat.subs++
        cfg.stat.subname.push(args.usr)
        fs.writeFileSync("./tucube/usrs/" + cfga.creator + ".json", JSON.stringify(cfg));
        
        response.end(`<meta http-equiv="refresh" content="0; url=./play.jsx?id=${cfga.id}&usr=${args.usr}" />`)
      } else {
        cfg.stat.subs--
        delete cfg.stat.subname[cfg.stat.subname.indexOf(args.usr)]
        fs.writeFileSync("./tucube/usrs/" + cfga.creator + ".json", JSON.stringify(cfg));

        response.end(`<meta http-equiv="refresh" content="0; url=./play.jsx?id=${cfga.id}&usr=${args.usr}" />`)
      }
    }
  })
  })
}
