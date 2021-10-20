exports.run = (request, response, args, fs) => {
  loader(response)
  response.write(`<title>tucube</title>`)
  response.write(`<head><link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script></head><body style="background-color: #181818;">
  <meta charset="utf-8">
  <style>
  body {
background-color: #181818;
}
  </style>
  <div id="page">

  `)



  if (args.usr == undefined) {
    response.write(`<a href='./login.html'>nem vagy belepve, kattincs ide!</a>`)
    return response.end()
  }
  if (!args.usr.includes("guest")) {
    response.write(`<a href='./ddc.jsx?usr=${args.usr}'>vidi feltoltese</a>
    <p></p>`)
  } else {
    response.write(`<p>te nem tolthetsz fel videot mert guest vagy!</p>`)
  }
  const dir = "./tucube/vidijson/"
  fs.readdir(dir, (err, files) => {
  files.forEach(file => {
    let asd = file.replace(".json", "")
    var cfg = JSON.parse(fs.readFileSync("./tucube/vidijson/" + asd + ".json"));
    if(fs.existsSync("tucube/thumbs/"+asd+".png")) {
      console.log("jap???");
    } else {
      try {
      let kuff = asd.split(".")
      let ri = ""
      for (var i = 0; i < kuff.length-1; i++) {
        let pont = i == 0 ? "" : "."
        ri = ri+pont+kuff[i]
      }
      let puf = asd.split(".")[1] == "mp4" ? asd : asd+".mp4";

        let thumbler = require('video-thumb');
        //console.log(__dirname);.replace(/./g,"%2E")
        thumbler.extract(__dirname+'/vidi/'+puf, __dirname+'/thumbs/'+puf.split(".")[0]+".png", '00:00:2', '800x500', function(){

        	console.log('saved: '+ __dirname+'/thumbs/'+puf.split(".")[0]+".png");

        });
      } catch(e) {
        console.error(e.stack);
      }
    }
    response.write(`<a href='./play.jsx?id=${cfg.id}&usr=${args.usr}' style="text-decoration: none; word-wrap: break-word; word-break: break-all;">
      <div style="color: black; text-decoration: none; margin: 0px;  text-align: center; width: 19%; height: 25%; display: inline-block; padding: 0px; margin: 5px; overflow: hidden; word-wrap: break-word; word-break: break-all;">
        <img style="width:100%;height:90%;" src="/tucube/thumbs/${asd+".png"}">
        <h6 style="margin:0px;color:white;">${asd}</h6>


      </div>
    </a>`)
  })
  var cfgasd = JSON.parse(fs.readFileSync("./tucube/belep.json"));
  var tta = ""
  for (var i = 0; i < cfgasd.length; i++) {
    tta = tta + cfgasd[i] + ", "
  }
  response.write(`<p>ki van itt most?</p>`)
  response.write(`<p>${tta}</p>`)
  response.write(`<a href="./al.jsx?usr=${args.usr}">kilepes!</a>`)
  response.end(`</page></body>`)
  })
}
