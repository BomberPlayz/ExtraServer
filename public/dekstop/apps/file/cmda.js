exports.getdata = (fs, args, filea) => {
    var data = {"img":"","todata":"","title":"cmd","scroll":"nop"}
    function writedata(dataa) {
        data.todata = data.todata + dataa
    }
    var vers = "1.0 Dekstop"
    let cfg = JSON.parse(fs.readFileSync("./dekstop/dats/" + args.usr + "/tmpcmd.json", "utf8"));
    writedata(`<p>welcome in ${vers}</p>`)
    writedata(`<p>All rights reserved!</p>`)
    writedata(`<p></p>`)
    for (let i = 0; i < cfg.length; i++) {
        writedata(`<p>${cfg[i]}</p>`)
    }
    writedata(`<p>${vers}~$${args.usr}#</p>`)
    writedata(`<form class="" action="/dekstop/windowloader.js" method="get">
        <input type="hidden" name="app" value="cmdb">
        <input type="hidden" name="usr" value="${args.usr}">
        <input type="hidden" name="token" value="${args.token}">
        <input type="text" name="file" value="enter here">
        <input type="submit" name="" class="bb" value="send">
    </form>`)
    return data
}