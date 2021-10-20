const appname = prompt("Fájl vboxozáshoz? kell kiterjesztés is!")
var yourfile = ""
if(confirm("file?")) {
  yourfile = "/virtual_desk/desktop/"+prompt("file")
} else {
  yourfile = prompt("arg")
}
let fi = require("./desktop/" + appname)
        console.log(fi)
        let ditaa = fi.getdata(fs, "", yourfile)
        /*console.log(ditaa.img);
        console.log(ditaa.todata);*/
        if (ditaa.img == "") {
            ditaa.img = "../../imgs/nof.png"
        }
addWindow(appname,`
            <div class="windowa">
            ${ditaa.todata}
            </div>
`,600,300)
