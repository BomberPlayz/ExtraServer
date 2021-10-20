exports.run = (request, response, args, fs) => {
  response.write(`<title>tucube</title>`)
  const dir = "./tucube/vidijson/"
  fs.readdir(dir, (err, files) => {
  files.forEach(file => {
    let asd = file.replace(".json", "")
    var cfg = JSON.parse(fs.readFileSync("./tucube/vidijson/" + asd + ".json"));
    if (cfg.id == args.vid) {
      if (cfg.creator == args.usr) {
        cfg.mond.emb.push(args.usr + "(felrako)")
        cfg.mond.modi.push(args.comm)
      } else {
        cfg.mond.emb.push(args.usr)
        cfg.mond.modi.push(args.comm)
      }
      fs.writeFileSync("./tucube/vidijson/" + asd + ".json", JSON.stringify(cfg));
      response.write(`<p>kesz, modtad: ${args.comm}</p>`)
      response.write(`<a href='./play.jsx?id=${cfg.id}&usr=${args.usr}'>vissza</a>`)
      response.end(`<meta http-equiv="refresh" content="0; url=./play.jsx?id=${cfg.id}&usr=${args.usr}" />`)
    }
  })
  })
}
