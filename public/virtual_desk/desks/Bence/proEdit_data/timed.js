exports.run = (request, response, args, fs) => {
  /*let cfg = JSON.parse(fs.readFileSync("./database/.json", "utf8"));
  var tojson = cfg
  fs.writeFileSync("./database/.json", JSON.stringify(tojson));*/
  response.write('<head><meta charset="UTF-8"></head>')
  /*let enc = require('../api/encode.js');
  let dec = require('../api/decode.js');
  let al = require('../api/alert.js')*/
  response.write(`<meta name="viewport" content="width=device-width, initial-scale=1">
<head>
<style>
.alert {
  padding: 20px;
  background-color: #ff9800;
  color: white;
  opacity: 0.83;
  transition: opacity 0.6s;
  margin-bottom: 15px;
}
.alert.err {
  background-color: #f44336;
}
.alert.inf {
  background-color: #2196F3
}
.closebtn {
margin-left: 15px;
color: white;
font-weight: bold;
float: right;
font-size: 22px;
line-height: 20px;
cursor: pointer;
transition: 0.3s;
}

.closebtn:hover {
color: black;
}`)

response.write(`
.bb {
background-color: #008CBA; /* Green */
border: none;
color: white;
padding: 20px;
text-align: center;
text-decoration: none;
display: inline-block;
font-size: 16px;
margin: 4px 2px;
cursor: pointer;
border-radius: 4px;
}
</style>
</head>`)

  /*let ars = al.gettall()
  for (var i = 0; i < ars.length; i++) {
    let data = al.write(ars[i][0],ars[i][1])
    response.write(data)
  }*/

  let asda = args.file.split("/")
  //console.log(asda[asda.length-1]);
  let synt = asda[asda.length-1].split(".")[1]
  //if (synt == "scre") {
    var tojson = args.data.replace("FIGYELEM: A file több mint 10500 betűből áll nem biztos hogy letudja menteni!","")
  //} else {
    var tojson = args.data.replace("FIGYELEM: A file több mint 10500 betűből áll nem biztos hogy letudja menteni!","")
  //}
  if (fs.existsSync(`./${args.file}`)){
    response.write('<p>adatok mentése folyamatban...</p>')
    fs.writeFileSync(`./${args.file}`, tojson);
  } else {
    response.write('<p>nincs ilyen file!</p>')
  }
  response.write('<p>átírányitás...</p>')
  response.write(`<meta http-equiv="refresh" content="2;url=../../../desk.js" />`)
  response.end()
}

    