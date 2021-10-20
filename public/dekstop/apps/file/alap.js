exports.getdata = (fs, args, filea) => {
    var data = {"img":"","todata":""}
    function writedata(dataa) {
        data.todata = data.todata + dataa
    }
    writedata(`<h1>Szüpike</h1>`)
    return data
}