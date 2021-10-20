exports.run = (request, response, args, fs) => {
  var formidable = require('formidable');
  var form = new formidable.IncomingForm({ multiples: true, maxFileSize: 999999999999999 });



  form.parse(request, function (err, fields, files) {
    console.log(err);
    console.log(fields);
    console.log(files);
    if (files.filetoupload.name.toLowerCase().includes(".mp4")) {
      var oldpath = files.filetoupload.path;
      var newpath = './tucube/vidi/' + args.name+".mp4";
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        var cfg = {}

        
        var cfgt = JSON.parse(fs.readFileSync("./tucube/load.json"));
        cfg.id = cfgt.vidid
        cfg.creator = global.tmp1
        cfg.dcdc = global.tmp2
        cfg.like = {}
        cfg.like.fel = 0
        cfg.like.le = 0
        cfg.like.usrs = []
        cfg.mond = {}
        cfg.mond.modi = []
        cfg.mond.emb = []
        cfg.tek = []
        cfgt.vidid++
        fs.writeFileSync("./tucube/load.json", JSON.stringify(cfgt));
        fs.writeFileSync("./tucube/vidijson/" + args.name + ".json", JSON.stringify(cfg));
        response.write('<p>video feltoltve!</p>');
        response.write(`<a href='./index.jsx?usr=${global.tmp1}'>vissza</a>`)
        response.end();
      });
    } else {
      response.write('leci mp4 file!');
      response.write(files.filetoupload.name);
      response.write(`<a href='./upl.jsx?usr=${args.usr}&le=${global.tmp2}'>vissza</a>`)
      response.end();
    }
});
}
