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
