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
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
        
    </head>
    <body onload="checkdata();reloadServerList()">
    <link rel="stylesheet" href="/twms/toaster/css/bootstrap-toaster.css" />
        <script src="/twms/toaster/js/bootstrap-toaster.min.js"></script>
    `)

    if (typeof args.token == "undefined") {
        response.write("<h3>You are currently NOT logged in! <a href='../token_login/login.jsx?scope=user,media,storage,data&redirect=../cpanel/index.jsx'>Log in</a></h3>")
    } else {
        response.write(`<h3 id="check">Validating token...</h3>`)
        response.write(`
        
        <script>
        Toast.setTheme(TOAST_THEME.DARK);
            Toast.create("DISCONTINUED","This panel is going to be discontinued when the new panel releases. Please, use <a href='./beta/index.jsx?token=${args.token}'>The new beta panel</a>.", TOAST_STATUS.INFO, 20000)
        var userData = {}
        
        async function checkdata() {
    let maka = document.getElementById("check")
    maka.innerHTML = "Requesting validation data..."
    let mat = await fetch("../token_login/api.jsx?mode=verify&token=${args.token}");
    maka.innerHTML = "Got data, checking..."
    let sak = await mat.text()
    if (sak == "true") {
        maka.innerHTML = "Your token is valid!"
        maka.innerHTML = "Checking if default data has been already stored..."


        let idat = await fetch("../token_login/api.jsx?mode=getData&token=${args.token}&key=cpanel_stored_default_data");
        let imat = await idat.text()
        if (imat == "" || imat == "false") {
            console.log("nope, not stored already")
            maka.innerHTML="Storing default data..."
            await fetch("win.crackpixel.hu:7777/token_login/api.jsx?mode=setData&token=${args.token}&key=cpanel_theme&data=default");
            await fetch("win.crackpixel.hu:7777/token_login/api.jsx?mode=setData&token=${args.token}&key=cpanel_owned_servers&data=[]");


            await fetch("win.crackpixel.hu:7777/token_login/api.jsx?mode=setData&token=${args.token}&key=cpanel_stored_default_data&data=true");
            maka.innerHTML = "Stored default data!"
        } else {
            console.log("yep, stored already")
            maka.innerHTML = "Default data is already stored. Continuing..."
        }


        maka.innerHTML = "Fetching user data..."
        userData = {}
        let rama = await fetch("win.crackpixel.hu:7777/token_login/api.jsx?mode=getDataBulk&token=${args.token}&key=cpanel_");
        let godat = await rama.json()
        userData = godat
        rama = await fetch("win.crackpixel.hu:7777/token_login/api.jsx?mode=getData&token=${args.token}&key=user");
        godat = await rama.text()
        userData.name = godat
        
        
        maka.innerHTML = "Got data: "+JSON.stringify(userData)


    } else {
        maka.innerHTML = "Your token is INVALID!"
    }
}
        async function resetUserData() {
            let maka = document.getElementById("check")
            maka.innerHTML = "Deleting current userdata..."
            
            let mast = await fetch("win.crackpixel.hu:7777/token_login/api.jsx?mode=getDataBulk&token=${args.token}&key=cpanel_")
            let mosok = await mast.json()
            for(i in mosok) {
                await fetch("win.crackpixel.hu:7777/token_login/api.jsx?mode=delData&token=${args.token}&key="+i)
            }
            
            await fetch("win.crackpixel.hu:7777/token_login/api.jsx?mode=setData&token=${args.token}&key=cpanel_stored_default_data&data=false");
            maka.innerHTML = "re-checking data..."
            checkdata()
            
        }
        
        async function newserver() {
            let maka = document.getElementById("check")
            maka.innerHTML = "Creating new server..."
            let kama = await fetch("win.crackpixel.hu:5555/cpanel/api.jsx?token=${args.token}&mode=new")
            let dama = await kama.text()
            maka.innerHTML = "API returned data: "+dama
        }
        
        async function ginse() {
            let maka = document.getElementById("check")
            let lit = document.getElementById("gise")
            
            maka.innerHTML = "Getting info of server "+lit.value+"..."
            let kama = await fetch("win.crackpixel.hu:5555/cpanel/api.jsx?token=${args.token}&mode=getInfo&id="+lit.value)
            let dama = await kama.text()
            maka.innerHTML = "Got response: "+dama
        }
        
        async function getUserData() {
            let maka = document.getElementById("check")
            maka.innerHTML = "Getting userdata..."
            let rama = await fetch("win.crackpixel.hu:7777/token_login/api.jsx?mode=getDataBulk&token=${args.token}&key=cpanel_");
            let godat = await rama.text()
            maka.innerHTML = "Got userdata: "+godat
        }
        
        async function reloadServerList() {
            let maka = document.getElementById("check")
            let lim = document.getElementById("serverlist")
            lim.innerHTML = ""
            maka.innerHTML = "Reloading userdata first..."
            await checkdata()
            maka.innerHTML = "Reloading server list..."
            
            
            for (let i=0;i<userData.cpanel_owned_servers.length;i++) {
                maka.innerHTML = "Getting status of server "+userData.cpanel_owned_servers[i]
                let kama = await fetch("win.crackpixel.hu:5555/cpanel/api.jsx?token=${args.token}&mode=getInfo&id="+userData.cpanel_owned_servers[i])
                let dama = await kama.json()
                let madma = dama.isOn ? "on" : "Off"
                console.log(dama)
                lim.innerHTML += \`<div class="card">
  <div class="card-header">
    \${dama.name ? dama.name : "Unnamed Server"}
  </div>
  <div class="card-body">
    <h5 class="card-title">Server ID: \${dama.id}</h5>
    <h5 class="card-title">Storage: \${Math.floor(dama.usedStorage*100)/100} MB / \${Math.floor(dama.storageSize)} MB</h5>
    <h5 class="card-title">Server status: \${dama.isOn ? "On" : "Off"}</h5>
    
    
    <a href="./viewserver.jsx?id=\${dama.id}&token=${args.token}" class="btn btn-primary">Go to panel</a><button onclick='async function(){fetch("win.crackpixel.hu:5555/cpanel/api.jsx?token=${args.token}&mode=del&id=\${dama.id}"),setTimeout(reloadServerList,1000)}()}}' class="btn btn-danger">Delete server</button>
  </div>
</div>\`
                //lim.innerHTML += '<br><div style="background-color: #007acc"><a href="./viewserver.jsx?id='+dama.id+'&token=${args.token}"><pre style="margin: 0px;">Server status: '+madma+'</pre><br><pre style="margin: 0px;">Server ID: '+dama.id+'</pre></a></div>'
            }
        }
        async function renameServer(id) {
            
        }
        
        
        </script>
        
        
        <button onclick='resetUserData()' class="btn btn-danger">Reset userdata</button>
        <button onclick='newserver()' class="btn btn-primary">New server</button>
        <button onclick='getUserData()' class="btn btn-primary">Get user data</button>
        <button onclick='reloadServerList()' class="btn btn-primary">Reload Server list</button>
        <button onclick='ginse()' class="btn btn-primary">Get info of server </button><input id="gise" placeholder="Server id" />
        
        <div id="serverlist" onload="reloadServerList()">
        
        
        
        </div>
        
        
        
        `)
    }


    response.end(`

    </body>
    </html>
    
    `)


}