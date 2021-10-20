exports.check = function(token) {
  let fs = require("fs")
  let database = "./token_login/database"

  let files = fs.readdirSync("token_login/database/accounts/")

  let us = "non"
  files.forEach(ura => {
    delete require.cache[require.resolve("./database/accounts/"+ura)]
    let userData = require("./database/accounts/"+ura)
    delete require.cache[require.resolve("./database/accounts/"+ura)]

    if (userData.token == token) {

      us = userData
    }
    for (let i in userData.tokens) {
      if (userData.tokens[i] == token) {

        us = userData
        break;
      }
    }
  })

  if (us == "non") {
    return false,"err_token_invalid"
  } else {
    return true,us.name
  }




}

exports.checkraw = function(token) {
  let fs = require("fs")
  let database = "./token_login/database"

  let files = fs.readdirSync("token_login/database/accounts/")

  let us = "non"
  files.forEach(ura => {
    delete require.cache[require.resolve("./database/accounts/"+ura)]
    let userData = require("./database/accounts/"+ura)
    delete require.cache[require.resolve("./database/accounts/"+ura)]

    if (userData.token == token) {

      us = userData

    }
    for (let i in userData.tokens) {
      if (userData.tokens[i] == token) {

        us = userData
        break;
      }
    }
  })

  if (us == "non") {
    return false,"err_token_invalid"
  } else {

    return true,us
  }




}

