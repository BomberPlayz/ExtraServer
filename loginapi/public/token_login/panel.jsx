exports.run = async function(request, response, args, fs) {
    response.write(`
    <html>
    <body onload="checkdata()">
    
    `)

    if (typeof args.token == "undefined") {
        response.write("<h3>You are currently NOT logged in! <a href='../token_login/login.jsx?scope=user,media,storage,data&redirect=../tucube-2/index.jsx'>Log in</a></h3>")
    } else {
        response.write(`<h3 id="check">Validating token...</h3>`)
        response.write(`
        
        <script>
        
        async function checkdata() {
            let maka = document.getElementById("check")
            maka.innerHTML = "Requesting validation data..."
            let mat = await fetch("../token_login/api.jsx?mode=verify&token=${args.token}");
            maka.innerHTML = "Got data, checking..."
            let sak = await mat.text()
            if (sak == "true") {
                maka.innerHTML = "Your token is valid!"
                
                
            } else {
                maka.innerHTML = "Your token is INVALID!"
            }
        }
        
        
        
        </script>
        
        `)
    }


    response.end(`
    </body>
    </html>
    
    `)


}