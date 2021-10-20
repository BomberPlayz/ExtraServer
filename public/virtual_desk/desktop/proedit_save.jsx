exports.run = async function (request, response, args) {
    var common = require("../../api/common.js")
    var fs = require("fs")
    console.log("+a");
    common.processPost(request,response,function(data) {
        
        

        //  console.log("data : "+request.post.data);
          console.log(request.post.file);
          fs.writeFileSync(request.post.file, request.post.data)
          console.log("jajaj?");
          response.end()
        
      })
    
}