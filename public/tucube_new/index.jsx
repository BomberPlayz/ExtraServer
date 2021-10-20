exports.run = (request, response, args, fs) => {
  try {



  response.writeHead(200, {
    'Content-Type': 'text/html'
  });


  response.write(`

    <!DOCTYPE html>
    <html lang="en" dir="ltr">
      <head>
        <meta charset="utf-8">
        <title>Tucube</title>

        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script>
      </head>
      <body>

      <form class="form-inline">
        <div class="form-group">
          <label for="search">Keres:</label>
          <input type="text" class="form-control" id="search" name="search" aria-describedby="serec">
        </div>

        <button style="" type="submit" class="btn btn-primary">Keress!</button>
      </form>

        <hr>
      </body>
    </html>

    `)

if (args.search != undefined) {
  //TODO keresés
}

var cfg = JSON.parse(fs.readFileSync("./tucube_new/database/videos.json"));
for(vid in cfg) {
  vidcfg = cfg[vid]
  console.log(vidcfg);
  response.write(`<a href='./video.jsx?v=${vidcfg.id}&usr=${args.usr}' style="text-decoration: none;">
    <div style="color: black; text-decoration: none; border-color: red; border-style: solid; text-aligment: center; width: 15%;">
      <h3>${vidcfg.name}</h2>
      <h4>Tőle: ${vidcfg.creator}</h3>
    </div>
  </a>`)
}

/*files.forEach(file => {
  let asd = file.replace(".json", "")

  var vidcfg = null
  for(vid in cfg) {
    if (vid.id == id) {
      vidcfg = vid
    }
  }

  id++;

})*/




    response.end("©️ Copyrájt by PlotGaming AND afonya")
  } catch(e) {
    response.end(e)
  }
}
