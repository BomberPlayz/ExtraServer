const vu = require('./verifyUser.js');
exports.run = async function (request, response, args) {
  console.log(JSON.stringify(vu.checkByPass(args.user,args.pass)));
  response.end(JSON.stringify(vu.checkByPass(args.user,args.pass)))
}
