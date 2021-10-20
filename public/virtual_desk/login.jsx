exports.run = async function(request, response, args, fs) {
   // let fs = require("fs")
    let main = "./token_login/"
    let database = "./token_login/database"
    let md5 = require("../api/md5.js")
    if(typeof global.users == "undefined") {
        global.users = []
    }
    if(args.user) {
        if(args.pass) {
            if(fs.existsSync(database+"/accounts/"+args.user+".json")) {
                let userData = require("./database/accounts/"+args.user+".json")
                delete require.cache[require.resolve("./database/accounts/"+args.user+".json")]
                if(md5(args.pass) == userData.password) {

                    global.users[args.user] = userData

                    let to = args.redirect ? args.redirect : "./index.jsx"
                    let tok = userData.token ? userData.token : "nullno"
                    response.end(`<html><meta http-equiv="refresh" content="0;url=${to}?token=${userData.token}" /></html>`)
                } else {
                    response.end(`<html><meta http-equiv="refresh" content="0;url=./login.jsx?error=rossz%20jelszó" /></html>`)
                }
            } else {
                response.end(`<html><meta http-equiv="refresh" content="0;url=./login.jsx?error=Nincs%20ilyen%20user!" /></html>`)
            }
        }
        return;
    }


    response.end(`


    <html>
    <form action="./login.jsx">
        <label for="usr">User: </label>
        <input type="text" name="user" id="usr"></input>

        <label for="pass">Jelszo: </label>
        <input type="password" name="pass" id="pass"></input>

        <input type="submit" value="login!" />
    </form>
    </html>






    `)
}
