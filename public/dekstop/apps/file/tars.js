exports.getdata = (fs, args, filea) => {
    var data = {"img":"","todata":"","title":"Válaszd ki!"}
    function writedata(dataa) {
        data.todata = data.todata + dataa
    }
    if (args.egy == undefined || args.egy == "false") {
        writedata(`
        <a href="/dekstop/windowloader.js?app=easyEditor&file=${filea}&usr=${args.usr}&token=${args.token}">szerkesztő</a>
        <a href="/dekstop/windowloader.js?app=opener&file=${filea}&usr=${args.usr}&token=${args.token}">futtató</a>
        <a href="/dekstop/windowloader.js?app=Searcher&file=${filea}&usr=${args.usr}&token=${args.token}">fileman</a>
        <a href="/dekstop/windowloader.js?app=picload&file=${filea}&usr=${args.usr}&token=${args.token}">képnézegető</a>
        <a href="/dekstop/windowloader.js?app=tars&file=${filea}&egy=true&usr=${args.usr}&token=${args.token}">egyéb</a>`)
    } else {
        data.title = "Válaszd ki! - egyéb"
        if (args.tow == undefined || args.tow == "false") {
            writedata(`
            <form class="" action="/dekstop/windowloader.js" method="get">
            <input type="hidden" name="app" value="tars">
            <input type="hidden" name="file" value=${filea}>
            <input type="hidden" name="usr" value=${args.usr}>
            <input type="hidden" name="token" value=${args.token}>
            <input type="hidden" name="egy" value="true">
            <input type="hidden" name="tow" value="true">
            <input type="text" name="wap" value="név">
            <input type="submit" name="" class="bb" value="futtatás">
            </form>`)
        } else {
            data.title = "Válaszd ki! - start"
            writedata(`
            <a href="/dekstop/windowloader.js?app=${args.wap}&file=${filea}&usr=${args.usr}&token=${args.token}">Start!</a>`)
        }
    }
    return data
}