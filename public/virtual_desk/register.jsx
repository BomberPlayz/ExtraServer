exports.run = async function(request, response, args, fs) {
  let main = "./virtual_desk"
  let database = "./virtual_desk/database/"
  let md5 = require("../api/md5.js")

  response.write("<html>")
  if (args.user) {
    if (args.pass) {
      if (args.verifyPass) {
        if (args.verifyPass == args.pass) {

          let hat = require('hat');
          let token = hat();


          let userData =
          {
              "name": "NotValid",
              "logins": [

              ],
              "state": "NotValid",
              "password": "NotValid",
              "token": "NotValid"
          }
          userData.name = args.user
          userData.state = "open"
          userData.password = md5(args.pass)
          userData.token = token

          await fs.writeFile(database+"accounts/"+args.user+".json",JSON.stringify(userData), function() {})

          response.end(`<a href="index.jsx">Remek, most lépj be!</a>`)
          return;
        } else {
          response.write("<h3>Hiba: nem egyezik a jelszó jól</h3>")
        }
      } else {
        response.write("<h3>Kéne verje</h3>")
      }
    } else {
      response.write("<h3>Nene jelszó</h3>")
    }
  } else {
    response.write("<h3>Regisztrájjjjjá</h3>")
  }

  response.end(`



  <form action="./register.jsx">
      <label for="usr">Usernév: </label>
      <input type="text" name="user" id="user"></input>

      <label for="pass">Jelszo: </label>
      <input type="password" name="pass" id="pass"></input>

      <label for="verifyPass">Jelszo megin: </label>
      <input type="password" name="verifyPass" id="verifyPass"></input>

      <input type="submit" value="Regike!" />
  </form>
  </html>






  `)


}
