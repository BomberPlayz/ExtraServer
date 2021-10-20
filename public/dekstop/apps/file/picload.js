exports.getdata = (fs, args, filea) => {
    var data = {"img":"","todata":"","title":"picture loader"}
    function writedata(dataa) {
        data.todata = data.todata + dataa
    }
    writedata(`
    <img src="${filea.replace(".","")}?data=visit" alt="pic" style="width:200px">`)
    data.img = `../../../${filea.replace(".","")}`
    return data
}