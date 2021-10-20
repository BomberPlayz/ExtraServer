exports.run = (request, response, args, fs) => {
  try {


  response.write('<head><meta charset="UTF-8"></head>')
  let enc = require('../api/encode.js');
  let dec = require('../api/decode.js');
  let al = require('../api/alert.js')
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
  let ars = al.gettall()
  for (var i = 0; i < ars.length; i++) {
    let data = al.write(ars[i][0], ars[i][1])
    response.write(data)
  }
  if (args.muvelet) {
    if (args.muvelet == "del") {
      fs.unlinkSync(global.mappa + "/" + global.file);
      al.write("info", "Sikeres törlés!")
    }


    if (args.muvelet == "new" && typeof args.data == "undefined") {
      response.write(`
        <form class="" action="./fss.jsx" method="get">

          <input type="text" name="data" class="bba">

          <input type="submit" name="" class="bb" value="létrehoz">
          <input type="hidden" name="muvelet" value="new">
          <input type="hidden" name="mapp" value="${args.mapp}">
          <input type="hidden" name="kiv" value="${args.kiv}">
        </form>
        `)
    } else {
      if (args.muvelet == "new") {
        fs.appendFile(args.mapp + "/" + args.data, "", function (err) {
          if (err) throw err;
          console.log('Saved!');
        });
      }
    }
    if (args.muvelet == "edit") {
      response.write('<p>átírányitás...</p>')
      response.write(`<meta http-equiv="refresh" content="0;url=./edit.jsx?mapp=${args.mapp}&kiv=${args.kiv}" />`)
      return response.end()
    }
  }
  response.write(`
  <form class="" action="./fss.jsx" method="get">
    <input type="submit" name="" class="bb" value="új file">
    <input type="hidden" name="muvelet" value="new">
    <input type="hidden" name="mapp" value="${args.mapp}">
    <input type="hidden" name="kiv" value="${args.kiv}">

  </form>`)


if (args.muvelet == "newfolder" && typeof args.data == "undefined") {
      response.write(`
        <form class="" action="./fss.jsx" method="get">

          <input type="text" name="data" class="bba">

          <input type="submit" name="" class="bb" value="létrehoz">
          <input type="hidden" name="muvelet" value="newfolder">
          <input type="hidden" name="mapp" value="${args.mapp}">
          <input type="hidden" name="kiv" value="${args.kiv}">
        </form>
        `)
    } else {
      if (args.muvelet == "newfolder") {
        fs.mkdir(args.mapp + "/" + args.data, function (err) {
          if (err) throw err;
          console.log('Saved!');
        });
      }
    }
  response.write(`
  <form class="" action="./fss.jsx" method="get">
    <input type="submit" name="" class="bb" value="új mappa">
    <input type="hidden" name="muvelet" value="newfolder">
    <input type="hidden" name="mapp" value="${args.mapp}">
    <input type="hidden" name="kiv" value="${args.kiv}">

  </form>`)

  response.write(`
  <form class="" action="./fss.jsx" method="get">
    <input type="submit" name="" class="bb" value="file törlése">
    <input type="hidden" name="muvelet" value="del">
    <input type="hidden" name="mapp" value="${args.mapp}">
    <input type="hidden" name="kiv" value="${args.kiv}">
  </form>`)
  if (args.kiv) {
    response.write(`
    <form class="" action="./fss.jsx" method="get">
      <input type="submit" name="" class="bb" value="szerkeszt">
      <input type="hidden" name="muvelet" value="edit">
      <input type="hidden" name="mapp" value="${args.mapp}">
      <input type="hidden" name="kiv" value="${args.kiv}">
    </form>`)
  }
  if (args.kiv && typeof args.data == "undefined" && typeof args.nert == "undefined" && args.muvelet == "rename") {
    response.write(`
    <form class="" action="./fss.jsx" method="get">
      <input type="submit" name="" class="bb" value="Átnevez">
      <input type="hidden" name="muvelet" value="rename">
      <input type="hidden" name="mapp" value="${args.mapp}">
      <input type="hidden" name="kiv" value="${args.kiv}">
      <input type="hidden" name="nert" value="true">
    </form>`)
  } else {
    if (args.kiv && typeof args.nert != "undefined" && typeof args.data == "undefined" && args.muvelet == "rename") {
      response.write(`
 		<form class="" action="./fss.jsx" method="get">
 		 <input type="text" name="data" class="bba">
      		 <input type="submit" name="" class="bb" value="Átnevez!">
     		 <input type="hidden" name="muvelet" value="rename">
     		 <input type="hidden" name="mapp" value="${args.mapp}">
    		 <input type="hidden" name="kiv" value="${args.kiv}">
   		</form>`)

    } else {
      if (args.kiv && args.data && args.muvelet == "rename") {
        fs.renameSync(args.mapp + "/" + args.kiv, args.mapp + "/" + args.data)
      }
    }
  }

  global.mappa = args.mapp
  global.file = args.kiv
  response.write(`<a href="./fss.jsx?mapp=." />vissza az elejére</a> <br>`)
  if (args.mapp == undefined) {
    response.write('<p>átírányitás...</p>')
    response.write(`<meta http-equiv="refresh" content="0;url=./fss.jsx?mapp=./" />`)
    return response.end()
  }
  const dir = args.mapp
  let eloz = args.mapp.split("/")
  let elozo = ""
  for (let data in eloz) {
    if (data < eloz.length - 1) {
      let datter = data < 1 ? "" : "/"
      elozo = elozo + datter + eloz[data]
    }
  }

  response.write(`<a style="background-color: #367faf; width:100%" href="./fss.jsx?mapp=${elozo}">📁../<a><br>`)
  fs.readdir(dir, (err, files) => {
    files.forEach(file => {
      if (!fs.statSync(dir + "/" + file).isDirectory()) {
        if (args.kiv == undefined) {
          response.write(`<a style="background-color: #059bff; width:100%;" href="./fss.jsx?mapp=${args.mapp}&kiv=${file}">📰${file}<a><br>`)
        } else {
          if (args.kiv == file) {
            response.write(`<a style="background-color: #006eb7; width:100%" href="./fss.jsx?mapp=${args.mapp}">📰${file}<a><br>`)
          } else {
            response.write(`<a style="background-color: #059bff; width:100%" href="./fss.jsx?mapp=${args.mapp}&kiv=${file}">📰${file}<a><br>`)
          }
        }
      } else {
        if (args.mappi != "true") {
          response.write(`<a style="background-color: #367faf; width:100%" href="./fss.jsx?mapp=${args.mapp}&mappi=true&mappiData=${file}">📁${file}<a><br>`)
        } else {
          if (args.mappiData == file) {
            response.write(`<a style="background-color: #006eb7; width:100%" href="./fss.jsx?mapp=${args.mapp}/${file}">📁${file}<a><br>`)
          } else {
            response.write(`<a style="background-color: #367faf; width:100%" href="./fss.jsx?mapp=${args.mapp}&mappi=true&mappiData=${file}">📁${file}<a><br>`)
          }


        }

      }
    });
    response.end()
  });
  } catch(e) {
    console.log(e.stack)
  }
}
