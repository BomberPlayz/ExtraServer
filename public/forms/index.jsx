exports.run = (request, response, args, fs) => {
    response.writeHeader(200,{"Content-type": "text/html"})
    response.end(`
    
    <a href="./create.jsx">Csinálok!</a>
    
    
    `)
}