exports.processPost = (request, response, callback) => {


    let querystring = require("querystring")

    var queryData = "";
    if(typeof callback !== 'function') return null;
console.log("procer");
    if(request.method == 'POST') {
      console.log("post : true");
        request.on('data', function(data) {
            queryData += data;
          //  console.log("data")
        });

        request.on('end', function() {
          console.log("end");
            request.post = querystring.parse(queryData);

            callback(querystring.parse(queryData));

        });

    } else {
      console.log("post : false")

    }
}
