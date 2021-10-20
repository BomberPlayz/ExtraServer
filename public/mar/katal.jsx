exports.run = async function(request, response, args, fs) {
  response.end(`


  <!DOCTYPE html>
  <html>
  <head>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://rawgit.com/leizongmin/js-xss/master/dist/xss.js"></script>
  <meta charset="UTF-8">
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
      }

      .winheader {
      padding: 10px;
      cursor: move;
      z-index: 10;
      background-color: #2196F3;
      color: #fff;
      }


      .center {
          text-align: center;
        }
        .menu {
          width: 120px;
          z-index: 1;
          box-shadow: 0 4px 5px 3px rgba(0, 0, 0, 0.2);
          position: fixed;
          display: none;
          transition: 0.2s display ease-in;
          background-color: red;
        }
        .menu .menu-options {
          list-style: none;
          padding: 10px 0;
          z-index: 1;
          background-color: red;
        }
        .menu .menu-options .menu-option {
          font-weight: 500;
          z-index: 1;
          font-size: 14px;
          padding: 10px 40px 10px 20px;
          cursor: pointer;
          background-color: red;
        }
        .menu .menu-options .menu-option:hover {
          background: rgba(255, 0, 0, 0.2);

        }
        .menu-button {
          background: grey;
          border: none;
          background-color: dark-red;
        }
        .menu-button .next {
          color: green;
        }
        .menu-button[disabled="false"]:hover .next {
          color: red;
          animation: move 0.5s;
          animation-iteration-count: 2;
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
      </style>
  </head>

  <body>

  <div class="menu">
<ul class="menu-options">
  <li class="menu-option" id="menu_newfile">Új file</li>
  <li class="menu-option" id="menu_newfolder">Új mappa</li>
</ul>
</div>





  <script>
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






  const fs = {
      readdir: async function(dir,call) {
          let dugacs = ""
          let data = $.post({
              url: "desktop/filesystem.jsx",
              data: {mode:"readDir", "file":dir},
              success: function(dart){ call(200,JSON.parse(dart)) }

          })


      },
      readFileSync: function(file) {
          let dunya = ""
          let data = $.post({
              url: "desktop/filesystem.jsx",
              data: {mode:"read", "file":file},
              success: function(dart){ dunya = dart },
              async: false

          })
          return dunya
      }
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


      <div class="win" id="\${rand}" style="width:\${w}px; height: \${h}px; overflow: hidden;">
       <div class="winheader" style="height:20px; overflow:hidden;" id="\${rand}header">\${title} <button onclick="$('#'+\${rand}).css('animation-name','close'); $('#'+\${rand}).css('-webkit-animation-play-state','running'); setTimeout(function(){$('#'+\${rand}).remove()},900)" style="float: right;">X</button> </div>
       <div id="\${rand}body" style="width: 100%; height:100%; overflow: auto;">
        \${data}
      </div>
      </div>


      \`)


      //assasaEND


      dragElement(document.getElementById(rand))
      return rand
  }




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



  const menu = document.querySelector(".menu");
let menuVisible = false;

const toggleMenu = command => {
menu.style.display = command === "show" ? "block" : "none";
menuVisible = !menuVisible;
};

const setPosition = ({ top, left }) => {
menu.style.left = \`\${left}px\`;
menu.style.top = \`\${top}px\`;
toggleMenu("show");
};

window.addEventListener("click", e => {
if(menuVisible)toggleMenu("hide");
});

window.addEventListener("contextmenu", e => {
e.preventDefault();
const origin = {
  left: e.pageX,
  top: e.pageY
};
setPosition(origin);
return false;
});







  </script>



  <script>
  </script>



  `)
}
