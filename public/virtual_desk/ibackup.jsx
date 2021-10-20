var maintance = false
if (typeof global.winman_win_style === 'undefined') {
    global.winman_win_style = `
<style>
.win {
position: absolute;
z-index: 9;
background-color: #f1f1f1;
text-align: center;
border: 1px solid #d3d3d3;
top: 500px;
left: 500px;
resize:both;
border-radius: 5;
overflow:hidden;
animation-name: open;
 animation-duration: 1s;
}

.icon_button {
  border: none;
  background:none;
}

@keyframes open {
  0% {transform: scale(.0)}
  100% {transform: scale(1)}
}

@keyframes close {
  0% {transform: scale(1)}
  100% {transform: scale(0)}
}

div.content {
  all: revert;
  text-align: left;
}

.winheader {
padding: 10px;
cursor: move;
z-index: 10;
background-color: #2196F3;
color: #fff;
border-radius: 5;
}


.center {
    text-align: center;
  }

  @keyframes move {
    from {
      transform: translate(0%);
    }
    50% {
      transform: translate(-40%);
    }
    to {
      transform: transform(0%);
    }
  }
  .bottom {
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>`;
}
const vu = require('./verifyUser.js');
const fs = require("fs");
const path = require("path");
exports.run = async function (request, response, args) {
    const fs = require('fs');

    console.log(vu.check(args.token));

    const daru = vu.check(args.token);
    const isOk = daru[0];

    if(!isOk) {
        response.writeHeader(301, { 'Location': './login.jsx?error=Nincs belepve vagy hibas a token!' });
    } else {
        response.writeHeader(200, { 'Content-type': 'html' });
    }
    response.write(`
    `)
    var user = daru[1];
    let ovu = args.overUser
    var userDir = "";
    if(user == "admin" && ovu) {
        userDir = `./virtual_desk/desks/${ovu}/`;
        user = ovu
    } else {
        userDir = `./virtual_desk/desks/${user}/`;
    }

    response.write("<!DOCTYPE html>")
    if (fs.existsSync(`./virtual_desk/desks/${user}/`)) {
        response.write(`<small>${user} asztala</small>`)
    } else {
        //response.writeHeader(200, { 'Content-type': 'text/html' });
        response.write('Felhasználói asztal létrehozása...');
        response.end(`
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script>
        require = function(file) {
            exports = {

            }
            let dugacs = ""
            let data = $.get({
                url: file,
                success: function(dart){ dugacs = dart },
                async: false
            })

             runnable = new Function(dugacs)
             runnable()
             console.log(exports)
             return exports



        }
        function getJSON(file) {
          let dugacs = ""
          let data = $.get({
              url: file,
              success: function(dart){ dugacs = dart },
              async: false
          })
          return dugacs.json()
        }
        let io = require('/api/socket.io.js').io;
        let socket = io(window.location.hostname+":1234")
        socket.on("desk_profile_create_info",function(data,asd) {
          console.log(data+"    asdsaddsad     "+asd);
          $("body").append("<h3>"+data+"</h3>")

        })
        </script>
        `);
        async function genData() {
            function sleep(ms) {
                return new Promise((resolve) => {
                    setTimeout(resolve, ms);
                });
            }
            await sleep(500)
            const fse = require('fs-extra');
            fs.mkdirSync(`./virtual_desk/desks/${user}/`);
            function infDa(data) {
                io.sockets.emit('desk_profile_create_info', data);
            }
            if(global.teherauto > 10) {
                infDa("<h3>Figyelem! rendszerünk terhelt. A terhelés csökkentése érdekében a fájlok készítése le lett lassítva.</h3>")
            }
            infDa('Alap fájlok másolása...');
            const files = fs.readdirSync('./virtual_desk/desktop');
            for (let i = 0; i < files.length; i++) {
                infDa(`Fájl ./virtual_desk/desktop/${files[i]} ---> ${userDir}${files[i]}`);
                fse.copySync(`./virtual_desk/desktop/${files[i]}`, userDir + files[i]);
                await sleep(Math.random()*100)

            }
            infDa('Kész!');
            return;
        }
        genData()
        return;
    }
    if (isOk) {
        response.write(`



    <html>
    <head>
    <script src="https://kit.fontawesome.com/e5a0d53d70.js" crossorigin="anonymous"></script>





    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <script src="https://rawgit.com/leizongmin/js-xss/master/dist/xss.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-contextmenu/2.7.1/jquery.contextMenu.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-contextmenu/2.7.1/jquery.contextMenu.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-contextmenu/2.7.1/jquery.ui.position.js"></script>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="/twms/toaster/css/bootstrap-toaster.css" />
        <script src="/twms/toaster/js/bootstrap-toaster.min.js"></script>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
    <meta charset="UTF-8">
    ${global.winman_win_style}
    </head>

    <body id="page" onload='Toast.configure(maxToasts =null, placement = TOAST_PLACEMENT.BOTTOM_RIGHT, theme =null, enableTimers =false);Toast.create("Welcome!","Welcome to VirtOS! We hope you enjoy it!", TOAST_STATUS.SUCCESS, 5000)'>







    <script>
    var mem = {}
    var minWindowData = {}
    //Make the DIV element draggagle:

    function randId() {
        return String(Math.floor(Math.random()*1000000*Math.random()))
    }

    window.onerror = function (msg, url, lineNo, columnNo, error) {
      
          
          Toast.create("Critical error occured","A critical error has occured. Error info:<br>Line: "+lineNo+"<br>URL file: "+url+"<br>Error: "+error+"",TOAST_STATUS.DANGER)
            return true
        //bsod(msg)

      


  return false;
}

function getJSON(file) {
  let dugacs = ""
  let data = $.get({
      url: file,
      success: function(dart){ dugacs = dart },
      async: false
  })
  console.log(dugacs);
  return JSON.parse(dugacs)
}

    temp = {}
    var exports = {}
    var remetye = undefined
    require = function(file) {
        exports = {

        }
        let dugacs = ""
        let data = $.get({
            url: file,
            success: function(dart){ dugacs = dart },
            async: false
        })

         runnable = new Function(dugacs)
         runnable()
         console.log(exports)
         return exports



    }






    const fs = {
        readdir: async function(dir,call) {
            let dugacs = ""
            let data = $.post({
                url: "desks/${user}/filesystem.jsx",
                data: {mode:"readDir", "file":dir},
                success: function(dart){ call(200,JSON.parse(dart)) }

            })


        },
        readFileSync: function(file) {
            let dunya = ""
            let data = $.post({
                url: "desks/${user}/filesystem.jsx",
                data: {mode:"read", "file":file},
                success: function(dart){ dunya = dart },
                async: false

            })
            return dunya
        }
    }
    var windows = []
    function remove(table, txt) {
      const index = txt
      if (index > -1) {
        table.splice(index, 1);
      }
  }
    function closeWindow(rand) {
      refreshTaskbar()
      $('#'+rand).css('animation-name','close'); $('#'+rand).css('-webkit-animation-play-state','running'); setTimeout(function(){$('#'+rand).remove()},900)
      for (var i = 0; i < windows.length; i++) {
        if (windows[i].id == rand) {
          remove(windows,i)
        }
      }

    }

    function minimizeWindow(rand) {
      $('#'+rand)
      refreshTaskbar()
    }

    function addWindow(title,data,w,h) {
        Toast.create("Window create","A window with width "+w+", and height "+h+" has been created.",TOAST_STATUS.INFO,5000)
    
        var rand = randId()
        console.log("rand: "+rand)
        if(!w) {
            w = 400
        }
        if(!h) {
            h=200
        }


        //asasasasa


        $("body").append(\`


        <div class="win" id="\${rand}" style="width:\${w}px; height: \${h}px; overflow: hidden; border-radius: 5px;">
         <div class="winheader" style="border-radius: 5px; height:40px; overflow:hidden;" id="\${rand}header">\${title} <button onclick="$('#'+\${rand}).css('animation-name','close'); $('#'+\${rand}).css('-webkit-animation-play-state','running'); setTimeout(function(){$('#'+\${rand}).remove()},900)" style="float: right;">X</button> </div>
         <div id="\${rand}body" style="width: 100%; height:100%; overflow: auto;">
          \${data}
        </div>

        </div>


        \`)

        windows.push({id: rand, name: title, data: $("#"+rand), isMinimized: false})
        refreshTaskbar()

        //assasaEND


        dragElement(document.getElementById(rand))
        return rand
    }
    var appNames = []
    var appItems = {}



    function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown;
    }



    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
    }

    var firewallCallback = ""

    function firewall(perm, appname, callback) {
      firewallCallback = callback
      addWindow("Tűzfal riasztás!",\`
      <script>

      var audio = new Audio('/${userDir}/sounds/firewall.wav');
      audio.play();

      \\</script\\>
      <h3>Figyelem! a(z) '\${appname || arguments.callee.caller.name!="anonymous"&&arguments.callee.caller.name||"Ismeretlen app"}' (\${appname&&"app" || arguments.callee.caller.name!="anonymous"&&"funkció"||"ismeretlen"}) speciális jogokra van szüksége!</h3>
      <h4>A jogok a következők: \${perm}</h4>
      <input class="firewall_val" type="password" placeholder="admin jelszó"></input>
      <br />
      <button  onclick="let jas = getJSON('/virtual_desk/auth.jsx?user=admin&pass='+$('.firewall_val').val()); console.log($('.firewall_val').val()); console.log(jas); if(jas[0] == true){$(this.parentNode.parentNode).remove(); firewallCallback()}">IGEN</button>
      <button style="display: inline-block;" onclick="$(this.parentNode.parentNode).remove()">NEM</button>


      \`)
    }


function bsod(err) {
  $("body").html("")
  $("body").html(\`

    <style>
    body{
    background-color: #008cff;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color:#fff;
}


.container{
    margin: 0 auto;
    max-width: 800px;
}
.sad-face{
    font-size: 120px;
}
.upper{
    font-size:28px;
}
.lower{
    font-size: 16px;
}
</style>

<div class="container">
<div class="sad-face">
:(
</div>
<p class="upper">A VirtOS egy kritikus hibába futott, és újra kell indulnia.</p>
<p class="lower">A VirtOS egy kritikus hibába futott. Hogy további károkat megelőzzünk, újra kell indítanunk. Kérlek tölsd újra a lapot.</p>
<p class="lower">HIBAKÓD: \${err}</p>
</div>


    \`)
}


function getLoader() {
  return \`<style>.spinner {
  margin: 100px auto;
  width: 40px;
  height: 40px;
  position: relative;
}

.cube1, .cube2 {
  background-color: #333;
  width: 15px;
  height: 15px;
  position: absolute;
  top: 0;
  left: 0;

  -webkit-animation: sk-cubemove 1.8s infinite ease-in-out;
  animation: sk-cubemove 1.8s infinite ease-in-out;
}

.cube2 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}

@-webkit-keyframes sk-cubemove {
  25% { -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5) }
  50% { -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg) }
  75% { -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5) }
  100% { -webkit-transform: rotate(-360deg) }
}

@keyframes sk-cubemove {
  25% {
    transform: translateX(42px) rotate(-90deg) scale(0.5);
    -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);
  } 50% {
    transform: translateX(42px) translateY(42px) rotate(-179deg);
    -webkit-transform: translateX(42px) translateY(42px) rotate(-179deg);
  } 50.1% {
    transform: translateX(42px) translateY(42px) rotate(-180deg);
    -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);
  } 75% {
    transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
    -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
  } 100% {
    transform: rotate(-360deg);
    -webkit-transform: rotate(-360deg);
  }
}</style><div class="spinner">
  <div class="cube1"></div>
  <div class="cube2"></div>
</div>\`
}



async function openApp(app,...args) {
  if(app.split(".")[1] == "js")
  console.log(window.location.pathname.replace(/[^/]*$/, ''))
  let data = await fetch(window.location.href.replace(/[^/]*$/, '')+"desks/${user}/"+app)
  let duta = await data.text()
  let func = new Function(duta)
  func(args)
}


    </script>







<div id="icons">
    `);

        const files = fs.readdirSync(userDir);

        await files.forEach((file) => {
            console.log(file);
            const path = require('path');


            const kerozin = file.split('.')[0];
            const kite = file.split('.')[1] ? file.split('.')[1] : file.split('.')[0];

            let icon = fs.existsSync(`./virtual_desk/icons/${path.extname(file).replace('.', '')}.png`) ? `./icons/${path.extname(file).replace('.', '')}.png` : './icons/NoIcon.png';
            icon = kite == 'app' && fs.existsSync(`${userDir}${file}/Icon.png`) ? `./desktop/${file}/Icon.png` : icon;
            icon = kite == 'png' || kite == 'jpg' && fs.existsSync(`${userDir}${file}`) ? `./desks/${user}/${file}` : icon;

            response.write(`

        <script>

        if(window.location.host != "localhost:1234" && ${maintance})
          setTimeout(function(){
          bsod("ERR_SYS_FAULT")
        },Math.random()*30000)
        </script>

        `)

            response.write(`
         <button id="${file.replace(/\./g, 'B')}" class="icon_button">
         <div style="text-align: center;">
            <img width="100px" height="100px" src="${icon}"></img>
            <br>
            <label for="${file.replace(/\./g, 'B')}">${file}</label>
         </div>
         </button>


        <script>

        (function(){
        appNames.push('${file}')
        let majd = \`${path.extname(file).replace('.', '')}\`
        if(majd == "js") {
            $("#${file.replace(/\./g, 'B')}").on("click",async function(ele) {
                let fony = async function(ele) {
                  console.log(window.location.pathname.replace(/[^/]*$/, ''))
                  let data = await fetch(window.location.href.replace(/[^/]*$/, '')+"/desks/${user}/${file}")
                  let duta = await data.text()
                  if(duta == "permission_denied") {
                    //addWindow("Jogosultsági hiba","Nincs jogosultság a fájl megnyitására!")
                    Toast.create("Permission denied","Permission was denied to open the file.",TOAST_STATUS.DANGER,5000)
                    return
                  }
                  try {
                    let func = new Function(duta)
                    func(null,"desk/${user}")
                  } catch(e) {
                    //addWindow('hiba történt!','Hiba történt a file megnyitása közben: '+e.stack)
                    Toast.create("An error occured","An error occured while opening file ${file}: "+e)
                  }
                }
                try {
                  fony(ele)
                } catch(e) {
                  bsod(e)
                }


            })
        } else {
            if(majd == "png") {
                $("#${file.replace(/\./g, 'B')}").on("click",async function() {
                    console.log(window.location.pathname.replace(/[^/]*$/, 'desks/${user}/${file}'))


                    openApp("kep_nez.js","desks/${user}/${file}")
                })
            } else {
                if(\`${kite}\` == "app") {
                    $("#${file.replace(/\./g, 'B')}").on("click",async function() {
                        console.log(window.location.pathname.replace(/[^/]*$/, ''))
                        let data = await fetch(window.location.href.replace(/[^/]*$/, '')+"desks/${user}/${file}/Main.js")
                        let duta = await data.text()
                        let func = new Function(duta)
                        func()
                    })
                  } else {
                      if(majd == "mp3") {
                          $("#${file.replace(/\./g, 'B')}").on("click",async function() {
                              console.log(window.location.pathname.replace(/[^/]*$/, 'desks/${user}/${file}'))
                              openApp("media_play.js","desks/${user}/${file}")


                          })
                } else {
                    if(majd == "mp4") {
                        $("#${file.replace(/\./g, 'B')}").on("click",async function() {
                            console.log(window.location.pathname.replace(/[^/]*$/, 'desks/${user}/${file}'))
                            openApp("media_play.js","desks/${user}/${file}")


                        })

              } else {
                    $("#${file.replace(/\./g, 'B')}").on("click",async function() {
                        let rand = addWindow("${kerozin}",getLoader())
                        fetch(window.location.href.replace(/[^/]*$/, '')+"desks/${user}/${file}").then(async function(data) {
                          data.text().then(duta => {
                            document.getElementById(rand+"body").innerHTML = duta
                          })


                        })

                        //addWindow("${kerozin}",duta)
                    })
                }
              }
            }}
        }
        }())
         </script>
        `);
        });

        response.end(`

    <script>
    console.log(appNames);
      function load_tars_apps() {
        var dfd = jQuery.Deferred();


        console.log("asd");
        $(async function(){
          let items = {}
        for (var i = 0; i < appNames.length; i++) {
          console.log("yumm");
          let racat = await fetch("firstline.jsx?file=./virtual_desk/desktop/"+appNames[i])
          console.log(racat);
          let recat = await racat.text()
          console.log("'"+recat+"'");
          if(recat.includes('"tarsit";')) {
            items[appNames[i]] = {"name": appNames[i], "callback": function(a,opt) {console.log(opt);openApp(a,"desktop/"+opt.$trigger[0].children[0].children[2].innerText)}}
          }

        }
        dfd.resolve(items)
      })
        return dfd.promise()


    }

      console.log(appItems);
      $.contextMenu({
      // define which elements trigger this menu
      selector: ".icon_button",
      // define the elements of the menu
      build: function ($trigger, e) {
        return {
          items: {
              tars: {name: "Társítás", callback: function(key, opt){ alert("kik: "+key);console.log(opt); }, items: load_tars_apps(), icon: "fas fa-arrow-right"},
              edit: {name: "Szerkesztés", callback: function(key, opt){ console.log(opt);openApp("proEdit.js",""+opt.$trigger[0].children[0].children[2].innerText,"desks/${user}") }, icon: "edit"}
          }
        }
      }
      // there's more, have a look at the demos and docs...
  });



    function refreshTaskbar() {
      $("#taskbar").empty();
      for (var i = 0; i < windows.length; i++) {//<div><button onclick='console.log($(this).html());$("body").append(getWindowBytitle($(this).html()).data); '>test</button></div>
        $('#taskbar').append(\`<div><button onclick=\'try {console.log($(this).html());$("body").append(windows[\${i}].data); $(\'#\'+windows[\${i}].id).css(\'animation-name\',\'open\'); $(\'#\'+windows[\\${i}].id).css(\'-webkit-animation-play-state\',\'running\'); }catch(e){Toast.create("Error while opening from taskbar","Error while opening app from taskbar: \n"+e, TOAST_STATUS.DANGER, 5000)}\'>\${windows[i].name}</button></div>\`);
      }
    }

    getWindowBytitle = function(title) {
      geta = "NoTitle";
      for (let i = 0; i < windows.length; i++) {
        console.log(windows[i]);
        if(windows[i].name == title) {
          geta = windows[i]
        }
      }
      console.log("erettzt: "+get);
      return geta
    }




    </script>
    </div>
    <div id="taskbar" style="position: absolute; z-index: 100; background-color: #AAAAAA; width: 100%; height: 40px;" class="bottom"></div>
    </body>

    </html>`);
    } else {
        response.writeHeader(301, { Location: './login.jsx' });
        response.end();
    }
};
