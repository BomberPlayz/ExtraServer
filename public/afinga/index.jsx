exports.run = (request, response, args, fs) => {
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
  let data = al.write(ars[i][0],ars[i][1])
  response.write(data)
}
if (args.usr != "admin") {
  response.write(`<p>nem te vagy az!</p>`)
  return response.end()
}

response.write(`
<form class="" action="anew.jsx" method="get">
  <input type="submit" name="" class="bb" value="alert létrehozása">
</form>`)
response.write(`
<form class="" action="fss.jsx" method="get">
  <input type="submit" name="" class="bb" value="files">
</form>`)


response.write(`


<script src="/api/socket.io.js"></script>
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
<script>
  $(function () {
    var socket = io(window.location.hostname+":1234");
    socket.on("ram",function(data) {
      //console.log(data);
      $("#filea").attr("value",data)
      $("#filea").html(Math.floor(data*100)/100+" GB")
      $("#fileaa").html(Math.floor(data*100)/100+" GB")

    })
    socket.on("maxram",function(data) {
    //  console.log(data);
      $("#filea").attr("max",data)
    })

    socket.on("cpu",function(data) {
    //  console.log(data);
      $("#file").attr("value",data)
      $("#filerma").html(Math.floor(data*100)+"%")
    })
  });



</script>

<label for="filea">memory:</label>
     <progress id="filea" value="0" max="0"> 0 </progress> <label id="fileaa">0</label>
      <br>
     <label for="file">cpu:</label>
          <progress id="file" value=0 max=1> 0 </progress> <label id="filerma">0</label>


  `)



  response.end()
}
