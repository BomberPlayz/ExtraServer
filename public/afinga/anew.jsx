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
  response.write(`<form class="" action="./acr.js" method="get">
    <input type="text" name="cd" value="code: error/alert/info">
    <input type="text" name="nnn" value="leírás">
    <input type="submit" name="" class="bb" value="beküld">
  </form>`)
  response.end()
}
