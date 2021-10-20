exports.run = (request, response) => {
  var url = require('url');
  var quka = url.parse(request.url, true).query;
  var back = quka.asd
  response.end(back);

}
