exports.run = async function (request, response, args) {
  let auth = require("../verifyUser.js")
  let auth_ret = auth.check(args.token)
  let isAuthOk = auth_ret[0]
  let username = auth_ret[1]

  if(isAuthOk) {
    response.writeHeader(200,{"Content-type": "text/html"})
    response.write(`


      <style>
      body {
        background-color: #1a70bc;
      }

      .win {
      position: absolute;
      z-index: 9;
      background-color: #f1f1f1;
      text-align: center;
      border: 1px solid #d3d3d3;
      top: 50%-800px;
      left: 50%-600px;
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
      </style>







      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
      <script>

      var mem = {}
      var minWindowData = {}
      //Make the DIV element draggagle:

      function randId() {
          return String(Math.floor(Math.random()*1000000*Math.random()))
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







      var windows = []
      function remove(table, txt) {
        const index = txt
        if (index > -1) {
          table.splice(index, 1);
        }
    }
      function closeWindow(rand) {
        $('#'+rand).css('animation-name','close'); $('#'+rand).css('-webkit-animation-play-state','running'); setTimeout(function(){$('#'+rand).remove()},900)
        for (var i = 0; i < windows.length; i++) {
          if (windows[i].id == rand) {
            remove(windows,i)
          }
        }

      }

      function minimizeWindow(rand) {
        $('#'+rand)
      }

      function addWindow(title,data,w,h) {
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
           <div class="winheader" style="border-radius: 5px; height:20px; overflow:hidden;" id="\${rand}header">\${title} <button onclick="$('#'+\${rand}).css('animation-name','close'); $('#'+\${rand}).css('-webkit-animation-play-state','running'); setTimeout(function(){$('#'+\${rand}).remove()},900)" style="float: right;">X</button> </div>
           <div id="\${rand}body" style="width: 100%; height:100%; overflow: auto;">
            \${data}
          </div>

          </div>


          \`)



          //assasaEND
          windows.push({id: rand, name: title, data: $("#"+rand), isMinimized: false})

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






      </script>




      `)


      response.write(`

        <meta charset="utf-8" />

        <script>
        getWindowBytitle = function(title) {
          get = "NoTitle"
          for (var i = 0; i < windows.length; i++) {
            console.log(windows[i]);
            if(windows[i].name == title) {
              get = windows[i]
            }
          }
          console.log("erettzt: "+get);
          return get
        }
        var OOBE = [
          {
            name: "Kezdés",
            data: "Ezzel a setuppal könnyedén kezdheted a virtos-ed"
          },
          {
            name: "Mik kellenek az asztalra",
            data: "Miket szeretnél az aztalra? Válaszd ki őket!"
          }

        ]





        var oobeStep = 0

        function refreshObe() {
          addWindow("virtOS setup - "+OOBE[oobeStep].name,OOBE[oobeStep].data+'<button style="text-align: bottom, right;" onclick="oobeStep++; refreshObe(); closeWindow(getWindowBytitle(\\'virtOS setup - \\'+OOBE[oobeStep-1].name).id)">Tovább \></button>',800,600)
        }

        window.onload = function() {
          refreshObe()
        }

        </script>


        `)

      response.end()
  }else {
    response.end("NEMES")
  }
}
