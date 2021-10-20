var rawId = randId()
var rawId2 = randId()

function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

var ami = makeid(5)
var kami = makeid(5)
addWindow("Console",`

<input id="556" style="inline-block; width:95%;" /><button onclick="${kami}.emit('eval',document.getElementById(${rawId}).value)" style="width:3%;">SEND</button>
<div id="korty" style="overflow: scroll">
</div>





<script src="/api/socket.io.js"></script>
<script>
  const ${ami} = require('/api/socket.io.js');
  const ${kami} = ${ami}.io(window.location.hostname+":1234");

$(function(){

  console.log(${ami}.io);



  console.log(${kami});
  document.getElementById("556").id = ${rawId}
  document.getElementById("korty").id = ${rawId2}
  $("#"+${rawId}).onclick = "${kami}.emit('eval',document.getElementById(${rawId}).value)"

  ${kami}.on("eval_ret",function(data) {
    $("#"+${rawId2}).html(data+"<br>"+$("#"+${rawId2}).html())
  })



}())




  </script>





`)
