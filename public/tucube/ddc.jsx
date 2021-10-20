exports.run = (request, response, args, fs) => {
  response.write(`<title>feltolt eleme</title>`)
  response.write(`<form class="" action="./upl.jsx" method="get">
    <input type="hidden" name="usr" value=${args.usr}>
    <textarea name="le" cols="28" rows="6"> leiras
    </textarea>
    <br>
    <input type="text" name="vina" style="width:25%;"> vidi name
    </input>
    <br>
    <input type="submit" name="" value="tovabb">
  </form>`)
  response.write(`<a href='./index.jsx?usr=${args.usr}'>vissza</a>`)
  response.end()
}
