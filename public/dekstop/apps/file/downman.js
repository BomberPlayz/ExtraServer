exports.getdata = (fs, args, filea, request) => {
    var data = {"img":"","todata":""}
    function writedata(dataa) {
        data.todata = data.todata + dataa
    }
    let tuc = "http://"
    if (tuc.includes("http://")) {
        var https = require('http');    
    }
    if (tuc.includes("https://")) {
        var https = require('https');    
    }

    writedata(`<a href="${tuc + request.headers.host + filea.replace(".","")}" download>kattincs a letöltésért</a>`)
    /*https.get(tuc + request.headers.host + filea.replace(".",""), (responsea) => {
    let todo = '';

    // called when a data chunk is received.
    responsea.on('data', (chunk) => {
        todo += chunk;
    });

  // called when the complete response is received.
    responsea.on('end', () => {
        writedata(todo)
    });

    }).on("error", (error) => {
    console.log("Error: " + error.message);
    });*/
    return data
}