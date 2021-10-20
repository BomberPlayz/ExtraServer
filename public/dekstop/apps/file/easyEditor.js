exports.getdata = (fs, args, file) => {
    var data = {"img":"edii.png","todata":""}
    function writedata(dataa) {
        data.todata = data.todata + dataa
        //console.log(dataa);
    }
        /*let cfg = JSON.parse(fs.readFileSync("./database/.json", "utf8"));
        var tojson = cfg
        fs.writeFileSync("./database/.json", JSON.stringify(tojson));*/
        writedata('<head><meta charset="UTF-8"></head>')
        /*let enc = require('../api/encode.js');
        let dec = require('../api/decode.js');
        let al = require('../api/alert.js')*/
        writedata(`<meta name="viewport" content="width=device-width, initial-scale=1">
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
      
      writedata(`
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
          writedata(data)
        }*/
        let asda = file.split("/")
        //console.log(asda[asda.length-1]);
        let synt = asda[asda.length-1].split(".")[1]
        var cfg = fs.readFileSync(file, "utf8");
        let kaka = false
        if (synt == "jsx") {
          synt = "js"
        }
        if (synt == "docx") {
          synt = "html"
        }
        if (synt == "txt") {
            synt = "html"
        }
        if (synt == "json") {
          synt = "js"
        }
        if (synt == "wda") {
          synt = "html"
          kaka = true
        }
        console.log(synt);
        //var lesszusszan = false
        var ata = cfg
        //,font_size: "8"
        if (kaka == true) {
          if (ata.includes(";")) {
            let tata = ata.split("\n").join("").split("\r").join("").split(";")
            for (let hagyya = 0; hagyya < tata.length; hagyya++) {
              if (tata[hagyya].split("=")[0] == "?bigsize") {
                var fing = tata[hagyya].split("=")[1]
              }
              if (tata[hagyya].split("=")[0] == "?eval") {
                //lesszusszan = true
                try {
                  eval(tata[hagyya].split("=")[1])
                } catch(e) {
                  writedata(`
                  <script language="javascript" type="text/javascript">
                  alert("a wda file nem müködik: ${e}")
                  </script>
                  `)
                  console.log(e.stack);
                }
              }
            }
            //console.log(tata);
            writedata(`
      
        <script language="javascript" type="text/javascript" src="/virtual_desk/desktop/easyEditor_Data/editor/editarea_0_8_2/edit_area/edit_area_full.js"></script>
        <script language="javascript" type="text/javascript">
        editAreaLoader.init({
          id: "editarea"	// id of the textarea to transform		
          ,start_highlight: true	// if start with highlight
          ,allow_resize: "both"
          ,allow_toggle: false
          ,word_wrap: true
          ,font_size: "${fing}"
          ,language: "en"
          ,syntax: "${synt}"	
        });
        </script>
        `)
          } else {
            writedata(`
      
        <script language="javascript" type="text/javascript" src="/virtual_desk/desktop/easyEditor_Data/editor/editarea_0_8_2/edit_area/edit_area_full.js"></script>
        <script language="javascript" type="text/javascript">
        editAreaLoader.init({
          id: "editarea"	// id of the textarea to transform		
          ,start_highlight: true	// if start with highlight
          ,allow_resize: "both"
          ,allow_toggle: false
          ,word_wrap: true
          ,language: "en"
          ,syntax: "${synt}"	
        });
        </script>
        `)
          }
        } else {
          writedata(`
      
        <script language="javascript" type="text/javascript" src="/virtual_desk/desktop/easyEditor_Data/editor/editarea_0_8_2/edit_area/edit_area_full.js"></script>
        <script language="javascript" type="text/javascript">
        editAreaLoader.init({
          id: "editarea"	// id of the textarea to transform		
          ,start_highlight: true	// if start with highlight
          ,allow_resize: "both"
          ,allow_toggle: false
          ,word_wrap: true
          ,language: "en"
          ,syntax: "${synt}"	
        });
        </script>
        `)
        }
        if (kaka == true) {
          //console.log(cfg);
          //console.log(ata);
          if (ata.length > 10499) {
            writedata(`<form class="" action="./apps/file/easyEditor_Data/timed.js" method="get">
            <input type="submit" class="bb" name="" value="mentés">
            <textarea id="editarea" name="data" cols="198" rows="28">FIGYELEM: A file több mint 10500 betűből áll nem biztos hogy letudja menteni!\n${ata}
            </textarea>
            <input type="hidden" name="file" value=${file}>
            </form>`)
          } else {
            writedata(`<form class="" action="./apps/file/easyEditor_Data/timed.js" method="get">
            <input type="submit" class="bb" name="" value="mentés">
            <textarea id="editarea" name="data" cols="198" rows="28">${ata}
            </textarea>
            <input type="hidden" name="file" value=${file}>
            </form>`)
          }
        } else {
          if (cfg.length > 10499) {
            writedata(`<form class="" action="./apps/file/easyEditor_Data/timed.js" method="get">
            <input type="submit" class="bb" name="" value="mentés">
            <textarea id="editarea" name="data" cols="198" rows="28">FIGYELEM: A file több mint 10500 betűből áll nem biztos hogy letudja menteni!\n${cfg}
            </textarea>
            <input type="hidden" name="file" value=${file}>
            </form>`)
          } else {
            writedata(`<form class="" action="./apps/file/easyEditor_Data/timed.js" method="get">
            <input type="submit" class="bb" name="" value="mentés">
            <textarea id="editarea" name="data" cols="198" rows="28">${cfg}
            </textarea>
            <input type="hidden" name="file" value=${file}>
            </form>`)
          }
        }    
    return data
}