exports.getdata = (fs, args, filea) => {
    var data = {"img":"","todata":""}
    writedata(`<form class="" action="./windowloader.js" method="get">
        <input type="text" name="file" value="YOUR URL">
        <input type="hidden" name="app" value=kereske>
        <input type="submit" class="bb" name="" value="request">
    </form>`)
    function writedata(dataa) {
        data.todata = data.todata + dataa
    }
    if (filea.includes("http://")) {
        var https = require('http');    
    }
    if (filea.includes("https://")) {
        var https = require('https');    
    }


    https.get(filea, (responsea) => {
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
    });
    return data
}