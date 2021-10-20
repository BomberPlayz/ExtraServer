exports.getdata = (fs, args, filea) => {
    var data = {"img":"","todata":""}
    function writedata(dataa) {
        data.todata = data.todata + dataa
    }
    let cfg = JSON.parse(fs.readFileSync(filea, "utf8"));
    writedata(`
    <a href="/dekstop/windowloader.js?app=${cfg.app}&file=${cfg.inkdata.replace("./dekstop/ydesk/","./dekstop/dats/" + args.usr + "/ydesk").replace("$uservar","./dekstop/dats/" + args.usr + "/ydesk")}&usr=${args.usr}&token=${args.token}">Start!</a>`)
    return data
}