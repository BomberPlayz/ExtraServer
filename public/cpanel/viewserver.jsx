exports.run = async function(request, response, args, fs) {

    response.write(`
    <html>
    <head>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>
        
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
        
        
        <script src="./ansi_up.js" type="text/javascript"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/bootbox.js/5.5.2/bootbox.min.js" integrity="sha512-RdSPYh1WA6BF0RhpisYJVYkOyTzK4HwofJ3Q7ivt/jkpW6Vc8AurL1R+4AUcvn9IwEKAPm/fk7qFZW3OuiUDeg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        
        
    </head>
    <body onload="checkdata();updateStatusButtons();reg_kp()">
    <link rel="stylesheet" href="/twms/toaster/css/bootstrap-toaster.css" />
        <script src="/twms/toaster/js/bootstrap-toaster.min.js"></script>
        
        <script>
    var lstatus = ""
    var lstorage = ""
    var erred = false
    var tok_inv = false
    
    Toast.setTheme(TOAST_THEME.DARK);
            Toast.create("DISCONTINUED","This panel is going to be discontinued when the new panel releases. Please, use <a href='./beta/viewserver.jsx?token=${args.token}&id=${args.id}'>The new beta panel</a>.", TOAST_STATUS.INFO, 20000)
    function parseQuery(queryString) {
    let query = {};
    var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
}
        let query = parseQuery(window.location.search.substring(1))
        if(typeof query.mode == "undefined") {
            query.mode = "panel"
        }
        var userData = {}
        
        async function checkdata() {
            
    let maka = document.getElementById("check")
    maka.innerHTML = "Requesting validation data..."
    let mat = await fetch("win.crackpixel.hu:5555/token_login/api.jsx?mode=verify&token=${args.token}");
    maka.innerHTML = "Got data, checking..."
    let sak = await mat.text()
    if (sak == "true") {
        maka.innerHTML = "Your token is valid!"
        maka.innerHTML = "Checking if default data has been already stored..."


        let idat = await fetch("win.crackpixel.hu:5555/token_login/api.jsx?mode=getData&token=${args.token}&key=cpanel_stored_default_data");
        let imat = await idat.text()
        if (imat == "" || imat == "false") {
            console.log("nope, not stored already")
            maka.innerHTML="Storing default data..."
            await fetch("win.crackpixel.hu:5555/token_login/api.jsx?mode=setData&token=${args.token}&key=cpanel_theme&data=default");
            await fetch("win.crackpixel.hu:5555/token_login/api.jsx?mode=setData&token=${args.token}&key=cpanel_owned_servers&data=[]");


            await fetch("win.crackpixel.hu:5555/token_login/api.jsx?mode=setData&token=${args.token}&key=cpanel_stored_default_data&data=true");
            maka.innerHTML = "Stored default data!"
        } else {
            console.log("yep, stored already")
            maka.innerHTML = "Default data is already stored. Continuing..."
        }


        maka.innerHTML = "Fetching user data..."
        userData = {}
        let rama = await fetch("win.crackpixel.hu:5555/token_login/api.jsx?mode=getDataBulk&token=${args.token}&key=cpanel_");
        let godat = await rama.json()
        userData = godat
        rama = await fetch("win.crackpixel.hu:5555/token_login/api.jsx?mode=getData&token=${args.token}&key=user");
        godat = await rama.text()
        userData.name = godat
        //console.log(userData)
        maka.innerHTML = "Got data: "+JSON.stringify(userData)
        maka.innerHTML = "All done!"


    } else {
        maka.innerHTML = "Your token is INVALID!"
        Toast.create("Token invalid","Whoops! Looks like your token is invalid! Please try to re-login. If it is still not working, auth servers may be down.",TOAST_STATUS.DANGER)
        tok_inv = true
    }
    }
    
    async function updateStatusButtons() {
         
        let maka = document.getElementById("check")
        let sb = document.getElementById("statusButtons")
        let madam = document.getElementById("camma")
        let laci = document.getElementById("laci")
        if (tok_inv) {
            maka.innerHTML = "TOKEN IS INVALID"
            sb.innerHTML = "TOKEN IS INVALID"
            madam.innerHTML = "TOKEN IS INVALID"
            laci.innerHTML = "TOKEN IS INVALID"
            return
        }
        
        maka.innerHTML = "Updating status buttons..."
        
        let kama = await fetch("win.crackpixel.hu:5555/cpanel/api.jsx?token=${args.token}&mode=getInfo&id=${args.id}")
        let dama = await kama.text()
        sb.innerHTML = ""
        console.log(dama)
        if(dama.startsWith("err_")) {
            maka.innerHTML = "An error occured while updating status buttons: "+dama
            return
        } else {
            dama = JSON.parse(dama)
        }
        
        console.log("LASSSATUS: "+lstatus)
        
        if(lstatus == false && dama.isOn == true) {
            Toast.create("Server status","Turned on.",TOAST_STATUS.INFO,5000)
        }
        if(lstatus == true && dama.isOn == false) {
            Toast.create("Server status","Turned off.",TOAST_STATUS.INFO,5000)
        }
        lstatus = dama.isOn
        
        if(dama.isOn) {
            sb.innerHTML = sb.innerHTML+'<button class="btn btn-danger" style="border-radius: 50%; width:48px; height: 48px;" onclick="shutdownServer()"><i class="bi bi-power"></i></button>'
        } else {
            sb.innerHTML = sb.innerHTML+'<button class="btn btn-success" style="border-radius: 50%; width:48px; height: 48px;" onclick="startServer()"><i class="bi bi-power"></i></button>'
        }
        
        let madma = dama.isOn ? "on" : "Off"
        
        
        
        sb.innerHTML = sb.innerHTML+'<pre style="margin: 0px;">Server status: '+madma+'</pre>'
        let ise = "No error!"
        try {
            console.log(dama.isErrored)
            ise = JSON.stringify(dama.isErrored)
        } catch(e){
            ise = dama.isErrored
        }
        sb.innerHTML = sb.innerHTML+'<pre style="margin: 0px;">Error: '+ise+'</pre>'
        if (typeof ise != "undefined" && erred == false) {
            erred = true
            Toast.create("Crashed while running!",ise,TOAST_STATUS.DANGER,30000)
        }
        
        
        let comd = ["Nothingness!"]
        try {
            if(query.mode == "panel") {
            comd = dama.console
            if(typeof comd == "undefined") {
                comd = ""
            }
            
            let rako = document.getElementById("cmd")
            var ansi_up = new AnsiUp;

            var htmla = ansi_up.ansi_to_html(comd);
            rako.innerHTML = htmla
            
            } else {
                console.log(madam)
                if(madam !== null) {
                    
                    madam.remove()
                }
                
            }
        let macska = document.getElementById("pamacsos")
        if(madam !== null) {
        macska.scrollTo(0, macska.scrollHeight)
        }
         let stoba = document.getElementById("stoba")
        
         console.log(dama)
         //console.log("stor: "+dama.storage+"   -   used: "+dama.usedStorage+"   - divided: "+dama.storage/dama.usedStorage)
         console.log("PERCENTAGE: "+(dama.usedStorage/dama.storageSize)*100)
         stoba.style = "width: "+(dama.usedStorage/dama.storageSize)*100+"%;";
         stoba["aria-valuenow"] = ((dama.usedStorage/dama.storageSize)*100).toString()
         stoba.innerHTML = Math.floor((dama.usedStorage/dama.storageSize)*100)+"% ("+(Math.floor(dama.usedStorage*100)/100)+" MB / "+dama.storageSize+" MB)"
         laci.innerHTML = Math.floor((dama.usedStorage/dama.storageSize)*100)+"% ("+(Math.floor(dama.usedStorage*100)/100)+" MB / "+dama.storageSize+" MB)"
         
         
         
         if(lstorage == "") {
             lstorage = 0
         }
         if(lstorage != Math.floor((dama.usedStorage/dama.storageSize)*100)) {
             if(Math.floor((dama.usedStorage/dama.storageSize)*100) > 74 && Math.floor((dama.usedStorage/dama.storageSize)*100) < 90) {
                 Toast.create("Storage is getting full","Your storage is more that 75% full! It is recommended to buy more storage soon.",TOAST_STATUS.WARNING,10000)
             }
             if(Math.floor((dama.usedStorage/dama.storageSize)*100) > 89 && Math.floor((dama.usedStorage/dama.storageSize)*100) < 100) {
                 Toast.create("Storage is almost full","Your storage is more that 90% full! It is recommended to buy more!",TOAST_STATUS.DANGER,15000)
             }
             if(Math.floor((dama.usedStorage/dama.storageSize)*100) > 99 && Math.floor((dama.usedStorage/dama.storageSize)*100) < 101) {
                 Toast.create("Storage is full","Your storage is full! Please buy more storage if you want to upload more files.",TOAST_STATUS.DANGER,15000)
             }
             if(Math.floor((dama.usedStorage/dama.storageSize)*100) > 100) {
                 Toast.create("Storage is over full","Your storage is over full. You won't be able to turn your server on unless you delete files, or buy a larger storage.",TOAST_STATUS.DANGER,15000)
             }
         }
         
         
         lstorage = Math.floor((dama.usedStorage/dama.storageSize)*100)
        }catch(e){
            console.log(e)
        }
        maka.innerHTML = "All done!"
        
    }
    
    async function startServer() {
        
        let maka = document.getElementById("check")
        maka.innerHTML = "Turning on server..."
        await fetch("win.crackpixel.hu:5555/cpanel/api.jsx?mode=startServer&token=${args.token}&id=${args.id}")
        maka.innerHTML = "All done!"
        erred = false
    }
    
    async function shutdownServer() {
        
        let maka = document.getElementById("check")
        maka.innerHTML = "Turning off server..."
        await fetch("win.crackpixel.hu:5555/cpanel/api.jsx?mode=stopServer&token=${args.token}&id=${args.id}")
        maka.innerHTML = "All done!"
    }
    
    setInterval(updateStatusButtons,1000)
    
    
    function reg_kp() {
            document.getElementById('cmdin').onkeypress = async function(e){
                let maka = document.getElementById("check")
    if (!e) e = window.event;
    var keyCode = e.code || e.key;
    if (keyCode == 'Enter'){
      // Enter pressed
      
      maka.innerHTML = "sending stdin..."
      console.log("CIDIN: "+document.getElementById('cmdin').value)
      
        let macs = await fetch("win.crackpixel.hu:5555/cpanel/api.jsx?mode=stdin&token=${args.token}&id=${args.id}&data="+document.getElementById('cmdin').value)
        document.getElementById('cmdin').value = ""
        let gar = await macs.text()
        if (gar != "ok") {
            Toast.create("Failed to STDIN",gar,TOAST_STATUS.DANGER,5000)
        }
        maka.innerHTML = "All done!"
      return false;
    }
    }
  }
    
    </script>
    `)
    if (typeof args.token == "undefined") {
        response.write("Error: token in URI is not defined. This should not happen.")
    } else {
        response.write(`<h5 id="check">Validating token...</h5>`)


        response.write(`
    
        
    
    <hr />
    <a href="./index.jsx?token=${args.token}" class="btn btn-primary">\<\<\< Back to dashboard</a>
    <div id="statusButtons">
        
        <h4>Please wait...</h4>
        
    </div>
    
    <h6 style=" display: inline-block; margin: 0px;">Storage use: </h6>
    <div class="progress" style="width: 20%; display: inline-block">
     <div class="progress-bar" id="stoba" role="progressbar" style="width: 100%;" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">Loading...</div>
    </div><a id="laci" style="display: inline-block;"></a>
    
    
    
    
    <div id="camma" class="card" style="width:99.9%; height:70%; overflow: hidden;"><div id="pamacsos" class="card-body" style=" overflow: auto;"><pre id="cmd" /></div></div>
    <div class="input-group input-group-sm mb-3">
  <div class="input-group-prepend">
    <span class="input-group-text" id="inputGroup-sizing-sm">STDIN</span>
  </div>
  <input type="text" class="form-control" id="cmdin" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
</div>
    
    
    `)


    }
    response.end(`</body></html>`)
}