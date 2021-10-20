exports.check = function(token) {
  let fs = require("fs")
  let database = "./virtual_desk/database"

  let files = fs.readdirSync("./virtual_desk/database/accounts/")

  let us = "non"
  files.forEach(ura => {
    let userData = require("./database/accounts/"+ura)
    delete require.cache[require.resolve("./database/accounts/"+ura)]
    console.log(userData);
    if (userData.token == token) {

      us = userData
    }
  })

  console.log(us);
  if (us == "non") {
    console.log("reteno");
    return [false,"err_token_invalid"]
  } else {
    console.log("reteyááá");
    return [true,us.name]
  }




}

exports.checkByPass = function(user,pass) {
  let fs = require("fs")
  let main = "./token_login/"
  let database = "./token_login/database"
  let md5 = require("../api/md5.js")
  if(typeof global.users == "undefined") {
      global.users = []
  }
  if(user) {
      if(pass) {
          if(fs.existsSync(database+"/accounts/"+user+".json")) {
              let userData = require("./database/accounts/"+user+".json")
              delete require.cache[require.resolve("./database/accounts/"+user+".json")]
              if(md5(pass) == userData.password) {

                  global.users[user] = userData


                  let tok = userData.token ? userData.token : "nullno"
                  return([true,userData.token])
              } else {
                  return([false,"err_no_pass"])
              }
          } else {
              return([false,"err_no_user"])
          }
      }
      return [false,"err_pass_not"];
  }
}
