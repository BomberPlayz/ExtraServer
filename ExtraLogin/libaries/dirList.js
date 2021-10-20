exports.dirRun = async function(dir,func) {
    function list(dir,func) {
        var fs = require("fs")
        console.log("Listing directory "+dir)
        var files = fs.readdirSync(dir)
        var list = exports.dirRun
        files.forEach(file => {
            try {
                if(fs.lstatSync(dir + "/" + file).isDirectory()) {
                    list(dir + "/" + file)
                } else {
                    func(dir + "/" + file)
                }
            } catch(e) {
                console.log("Error while listing directory: "+e.stack)

            }
        })
    }
    list(dir,func)
}