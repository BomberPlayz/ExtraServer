exports.run = async function(request, response, args, fs) {
try {
  var xss = require("xss");
  response.write('<head><meta charset="UTF-8">')
  let enc = require('../api/encode.js');
  let dec = require('../api/decode.js');
  let al = require('../api/alert.js')
  var common = require("../api/common.js")
  var patha = require('path')
let data = fs.readFileSync(args.mapp+"/"+args.kiv,"utf8")

  common.processPost(request,response,function(data) {
    console.log("post : yeet");
    if (data.muvelet == "save") {
      console.log("data : true");
    //  console.log("data : "+request.post.data);
      fs.writeFileSync(`${request.post.mapp}/${request.post.kiv}`, request.post.data)

      /*response.write('<p>átírányitás...</p>')
      response.write(`<meta http-equiv="refresh" content="2;url=./edit.js?mapp=${args.mapp}&kiv=${args.kiv}" />`)
      response.end()*/
    }
  })

  if(request.method == 'POST') {
    console.log(args.kiv);
    //response.write('<p>átírányitás...</p><p>Adatok mentése folyamatban...</p>')
    response.write(`<meta http-equiv="refresh" content="0; url=./edit.jsx?mapp=${args.mapp}&kiv=${args.kiv}" />`)
    response.end()

    return;


  }

  var type = patha.extname(args.kiv)

  response.write(`<meta name="viewport" content="width=device-width, initial-scale=1">
<style>

body {
  background-color: #1e1e1e;
  overflow: hidden;
}

textarea
{
  border:1px solid #999999;
  width:100%;
  height: 90%;
  margin:1px 0;
  padding:2px;
  /*background-color: #21252b;*/
}

.tak {
  width:100%;
  height: 90%;
}

input[type=submit]
{
  height: 4%;
  padding:5px;
  margin:0px;
  display: inline-block;
}



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
}

.red {
	color: red !important;
}

.green {
	color: green !important;
}

.blue {
	color: blue !important;
}

.gray {
	color: gray !important;
}

.black {
	color: black !important;
}

.tomato {
	color: tomato !important;
}

.underline {
	text-decoration: underline;
}

.bold {
  font-weight: bold;
}

`)
function dext(data) {
  var validator = require('validator');
  let valted = validator.escape(data.toString())
  return valted
}
function escapeHtml(text) {
  var map = {
    '&': 'íłŁ',
    '<': '¤¤×',
    '>': '÷Ł×',
    '"': '¤ßŁłí',
    "'": 'Łß¨'
  };

  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}
const getTypeFile = function(fext) {
  let types = {".html": "html", ".js": "javascript", ".css": "css", ".jsx": "javascript", ".json": "application/json"}
  let typer = "text/text"
  for(let type in types) {
    console.log("check: "+type)
    if (type == fext) {
      console.log("yes: "+type)
      return types[type]
    }
  }
  return typer
}


function unEscapeHtml(text) {
  var map = {
    '&amp;': '&;',
    '&lt;': '<;',
    '&gt;': '>;',
    '&quot;': '"',
    "&#039;": "'"
  };

  return text.replace(/[&amp;&lt;&gt;&quot;&#039]/g, function(m) { return map[m]; });
}


let tupi = patha.extname(args.kiv)
if (tupi == ".ffef") {
  tupi = ".txt"
}

let adat = dext(data).toString()
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

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="./vs/loader.js"></script>
<script language="javascript" type="text/javascript">


function unEscapeHtml(text) {


  return text.replace(/íłŁ/g,"&").replace(/¤¤×/g,"<").replace(/÷Ł×/g,">").replace(/¤ßŁłí/g,'"').replace(/Łß¨/g,"'")
}


require.config({ paths: { 'vs': '/afinga/vs' }});
require(['vs/editor/editor.main'], async function() {
    window.editor = monaco.editor.create(document.getElementById('tak'),                 {
        value: "Betöltés...",
        language: 'text/text',
        theme: "vs-dark",
    });



    function htmlEscape(text) {
   return text.replace(/&/g, '&amp;').
     replace(/</g, '&lt;').  // it's not neccessary to escape >
     replace(/"/g, '&quot;').
     replace(/'/g, '&#039;');
}
    let data = await fetch("http://"+window.location.hostname+":1234/afinga/reqfile.jsx?file=${args.mapp+"/"+args.kiv}")
    let tux = await data.text()
    tux = tux.toString()

    window.editor.setValue("Kódolás tuci")

    var overlang = "${getTypeFile(patha.extname(args.kiv))}"
    let oversize = "no"
    let decor = "none"
    var debug = false

    if("${patha.extname(args.kiv)}" == ".ffef") {
      let sas = tux.normalize().split("##start##")
      if(sas[1]) {
        let hurki = sas[0].split("\\n").join("").split("\\r").join("").split(";")
        for (var i = 0; i < hurki.length; i++) {



          if(debug) {
            console.log(hurki[i]);
            console.log(hurki[i].split("="));
            console.log(hurki[i].split("=")[0].length);
          }


          if (hurki[i].split("=")[0] == "?overlang") {
            overlang = hurki[i].split("=")[1]
          } else {
            if (hurki[i].split("=")[0] == "?overSize") {
              oversize = hurki[i].split("=")[1]
            } else {
              if (hurki[i].split("=")[0] == "?deco") {
                if(debug) {
                  console.log("hurki : "+hurki[i]);
                  console.log("splitted : "+hurki[i].split("=")[1]);
                }
                decor = eval(hurki[i].split("=")[1])
              } else {
                if (hurki[i].split("=")[0] == "?debug") {
                  console.log(hurki[i]);
                  let dud = hurki[i].split("=")[1]
                  debug = dud
                } else {
                  if (hurki[i].split("=")[0] == "?eval") {
                    try {
                      eval(hurki[i].split("=")[1])
                    } catch(e) {
                      alert("Kritikus javascript hiba történt a ffef file-ban!")
                      if(debug) {
                        alert("Hiba: "+e.stack)
                      }
                    }
                  } else {

                  }
                }
              }
            }
          }



        }

      } else {

      }
    }
    if("${patha.extname(args.kiv)}" == ".wda") {
      let sas = tux.normalize()
      if(true) {
        let hurki = sas.split("\\n").join("").split("\\r").join("").split(";")
        for (var i = 0; i < hurki.length; i++) {
          if (hurki[i].split("=")[0] == "?bigsize") {
            oversize = hurki[i].split("=")[1]
          } else {
            if (hurki[i].split("=")[0] == "?eval") {
              try {
                eval(hurki[i].split("=")[1])
              } catch(e) {
                alert("Kritikus javascript hiba történt a wda file-ban! Eza fájlformátum nem annyira támogatott!")
                if(debug) {
                  alert("Hiba: "+e.stack)
                }
              }

            }
            else {
                if (hurki[i].split("=")[0] == "?debug") {
                  debug = hurki[i].split("=")[1]
                }
              }
          }
        }
      }
    }
    console.log(overlang);
    window.editor.setModel(monaco.editor.createModel("Szöveg rakása...", overlang))
    window.editor.setValue(tux)
    if(oversize != "no") {
      //oversize = Number(oversize)
      window.editor.updateOptions({
        fontSize: oversize
      })
    }
    if(decor != "none") {
      editor.deltaDecorations([], decor)
    }
});

</script>

</head><body background-color: #21252b;>`)
  /*let ars = al.gettall()
  for (var i = 0; i < ars.length; i++) {
    let data = al.write(ars[i][0],ars[i][1])
    response.write(data)
  }*/
  response.write(`
  <form class="" action="./fss.jsx" method="get">
    <input type="submit" name="" class="bb" value="vissza">
    <input type="hidden" name="mapp" value="${args.mapp}">
    <input type="hidden" name="kiv" value="${args.kiv}">
  </form>`)
  

  response.write(`
  <form id="saver" action="./edit.jsx?mapp=${args.mapp}&kiv=${args.kiv}" method="post">
    <input type="submit" name="" class="bb" value="mentés">
    <input type="hidden" name="muvelet" value="save">
    <input type="hidden" name="mapp" value="${args.mapp}">
    <input type="hidden" name="kiv" value="${args.kiv}">


    <div id="tak" style="width:100%;height:90%;border:1px solid grey" name="data"></div>
    </form>

    <pre id="temperke" style="width:0px;height:0px;" ></pre>
    <script>
    $("#saver").submit(function(){
      let oldlang = window.editor.language
      window.editor.language = "text/text"
      $("#saver").html($("#saver").html()+'<input id="saver_nyam" type="hidden" name="data" value="">')
      $("#saver_nyam").attr("value",window.editor.getValue())
      window.editor.language = oldlang
    })





    $(window).bind('keydown', function(event) {
    if (event.ctrlKey || event.metaKey) {
        switch (String.fromCharCode(event.which).toLowerCase()) {
        case 's':
            event.preventDefault();
            $("#saver").submit()
            break;
        case 'g':
            event.preventDefault();
            alert('ctrl-g');
            break;
        }
    }
});


    </script>
    `)
    response.end(`</body>`)
  } catch(e) { response.end(e.stack) } }
