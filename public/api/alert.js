exports.write = (stat,text) => {
  let data = ""
  let str = ""
  if (stat == null) {
    stat = "alert"
    str = "alert! "
  }
  if (stat == "alert") {
    stat = "alert"
    str = "alert! "
  }
  if (stat == "info") {
    stat = "alert inf"
    str = "info "
  }
  if (stat == "error") {
    stat = "alert err"
    str = "ERROR! "
  }
  data = `<div>
  <span>×</span>
  <strong>${str}</strong>${text}
</div>`
  return data;
}
exports.gettall = () => {
  let fs = require('fs')
  var cfg = JSON.parse(fs.readFileSync("./aapi/al.json"));
  return cfg
}
