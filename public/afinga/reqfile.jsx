exports.run = (request, response, args, fs) => {
  let filereq = args.file
  let file = fs.createReadStream(args.file,{})

  file.pipe(response)
}
