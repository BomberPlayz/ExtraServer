exports.getdata = (fs, args, filea) => {
    var data = {"img":"","todata":"","title":"","scroll":"yep"}
    function writedata(dataa) {
        data.todata = data.todata + dataa
    }
    writedata(fs.readFileSync(filea, "utf8"))
    return data
}