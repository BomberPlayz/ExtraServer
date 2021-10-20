exports.run = (request, response, args, fs) => {
  response.write(`<title>feltolt</title>`)
  global.tmp1 = args.usr
  global.tmp2 = args.le
  let vina = typeof args.vina != "undefined" ? args.vina : "Névtelen"+(Math.random()*1000000)
  response.write(`<form action="upla.jsx?name=${vina}" method="post" enctype="multipart/form-data">
    <input type="file" name="filetoupload" method="post"><br>
    <input type="submit" value="feltolt">
  </form>`)
  response.write(`<a href='./index.jsx?usr=${args.usr}'>vissza</a>`)
  response.end()
}
