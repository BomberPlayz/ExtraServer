exports.run = async function(request, response, args, fs) {
    response.write(`
    <html>
    <head>
        <script data-ad-client="ca-pub-2381387970112055" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
        
        <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="/Twenly/main.css" />
        <script src="/Twenly/main.js"></script>
        
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
        
        
        <script src="./ansi_up.js" type="text/javascript"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/bootbox.js/5.5.2/bootbox.min.js" integrity="sha512-RdSPYh1WA6BF0RhpisYJVYkOyTzK4HwofJ3Q7ivt/jkpW6Vc8AurL1R+4AUcvn9IwEKAPm/fk7qFZW3OuiUDeg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
        
    </head>
    <body onload="checkdata();reloadServerList()">
    
    `)

    if (typeof args.token == "undefined") {
        response.write("<h1 class='header center ui'>CreamPanel</h1><h2 class='header center ui'>The creamiest panel you have ever seen!</h2>")
        response.write(`
        
        
        
        
        `)

        response.write("<h3>You are currently NOT logged in! <a href='/token_login/login.jsx?scope=user,media,storage,data&redirect=http://win.crackpixel.hu:1234/cpanel/beta/index.jsx'>Log in</a></h3>")
    } else {
        response.write(`<h3 id="check">Validating token...</h3>`)
        response.write(`
        
        <script>
        $('body')
  .toast({
    title: 'Please note!',
    message: 'This panel is in BETA and is under heavy development! If you use any bugs, you may get suspended, or even ip-banned!',
    showProgress: 'bottom',
    class: "primary",
    displayTime: 15000
  })
  $('body')
  .toast({
    title: 'Please note!',
    message: 'This panel is in BETA and is under heavy development! If you use any bugs, you may get suspended, or even ip-banned!',
    showProgress: 'bottom',
    class: "primary",
    displayTime: 15000
  })
  $('body')
  .toast({
    title: 'Please note!',
    message: 'This panel is in BETA and is under heavy development! If you use any bugs, you may get suspended, or even ip-banned!',
    showProgress: 'bottom',
    class: "primary",
    displayTime: 15000
  })
  $('body')
  .toast({
    title: 'Please note!',
    message: 'This panel is in BETA and is under heavy development! If you use any bugs, you may get suspended, or even ip-banned!',
    showProgress: 'bottom',
    class: "primary",
    displayTime: 15000
  })
  $('body')
  .toast({
    title: 'Please note!',
    message: 'This panel is in BETA and is under heavy development! If you use any bugs, you may get suspended, or even ip-banned!',
    showProgress: 'bottom',
    class: "primary",
    displayTime: 15000
  })
  $('body')
  .toast({
    title: 'Please note!',
    message: 'This panel is in BETA and is under heavy development! If you use any bugs, you may get suspended, or even ip-banned!',
    showProgress: 'bottom',
    class: "primary",
    displayTime: 15000
  })
        $('body')
  .toast({
    title: 'Please note!',
    message: 'This panel is in BETA and is under heavy development! If you use any bugs, you may get suspended, or even ip-banned!',
    showProgress: 'bottom',
    class: "primary",
    displayTime: 15000
  })
  $('body')
  .toast({
    title: 'Please note!',
    message: 'This panel is in BETA and is under heavy development! If you use any bugs, you may get suspended, or even ip-banned!',
    showProgress: 'bottom',
    class: "primary",
    displayTime: 15000
  })
  $('body')
  .toast({
    title: 'Please note!',
    message: 'This panel is in BETA and is under heavy development! If you use any bugs, you may get suspended, or even ip-banned!',
    showProgress: 'bottom',
    class: "primary",
    displayTime: 15000
  })
;
        var userData = {}
        
        async function checkdata() {
    let maka = document.getElementById("check")
    maka.innerHTML = "Requesting validation data..."
    let mat = await fetch("/token_login/api.jsx?mode=verify&token=${args.token}");
    maka.innerHTML = "Got data, checking..."
    let sak = await mat.text()
    if (sak == "true") {
        maka.innerHTML = "Your token is valid!"
        maka.innerHTML = "Checking if default data has been already stored..."


        let idat = await fetch("/token_login/api.jsx?mode=getData&token=${args.token}&key=cpanel_stored_default_data");
        let imat = await idat.text()
        if (imat == "" || imat == "false") {
            console.log("nope, not stored already")
            maka.innerHTML="Storing default data..."
            await fetch("/token_login/api.jsx?mode=setData&token=${args.token}&key=cpanel_theme&data=default");
            await fetch("/token_login/api.jsx?mode=setData&token=${args.token}&key=cpanel_owned_servers&data=[]");


            await fetch("/token_login/api.jsx?mode=setData&token=${args.token}&key=cpanel_stored_default_data&data=true");
            maka.innerHTML = "Stored default data!"
        } else {
            console.log("yep, stored already")
            maka.innerHTML = "Default data is already stored. Continuing..."
        }


        maka.innerHTML = "Fetching user data..."
        userData = {}
        let rama = await fetch("/token_login/api.jsx?mode=getDataBulk&token=${args.token}&key=cpanel_");
        let godat = await rama.json()
        userData = godat
        rama = await fetch("/token_login/api.jsx?mode=getData&token=${args.token}&key=user");
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
            
            let mast = await fetch("/token_login/api.jsx?mode=getDataBulk&token=${args.token}&key=cpanel_")
            let mosok = await mast.json()
            for(i in mosok) {
                await fetch("/token_login/api.jsx?mode=delData&token=${args.token}&key="+i)
            }
            
            await fetch("/token_login/api.jsx?mode=setData&token=${args.token}&key=cpanel_stored_default_data&data=false");
            maka.innerHTML = "re-checking data..."
            checkdata()
            
        }
        
        async function newserver() {
            let maka = document.getElementById("check")
            maka.innerHTML = "Creating new server..."
            let kama = await fetch("/cpanel/api.jsx?token=${args.token}&mode=new&type=nodejs")
            let dama = await kama.text()
            maka.innerHTML = "API returned data: "+dama
        }
        
        async function ginse() {
            let maka = document.getElementById("check")
            let lit = document.getElementById("gise")
            
            maka.innerHTML = "Getting info of server "+lit.value+"..."
            let kama = await fetch("/cpanel/api.jsx?token=${args.token}&mode=getInfo&id="+lit.value)
            let dama = await kama.text()
            maka.innerHTML = "Got response: "+dama
        }
        
        async function getUserData() {
            let maka = document.getElementById("check")
            maka.innerHTML = "Getting userdata..."
            let rama = await fetch("/token_login/api.jsx?mode=getDataBulk&token=${args.token}&key=cpanel_");
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
            
            //lim.innerHTML += '<div class="ui cards">'
            for (let i=0;i<userData.cpanel_owned_servers.length;i++) {
                lim.innerHTML += \`
                
                
   <div class="ui card fluid" id="SERVERPH_\${i}">
      <div class="content">
         <div class="ui placeholder">
            <div class="header">
               <div class="medium line"></div>
            </div>
         </div>
      </div>
      <div class="content">
         <div class="ui placeholder">
            <div class="paragraph">
               <div class="short line"></div>
               <div class="short line"></div>
               <div class="short line"></div>
            </div>
         </div>
         <a href="./viewserver.jsx?id=papo&token=${args.token}" class="ui disabled right labeled icon button primary"><i class="right arrow icon"></i>Go to panel</a>
         <button onclick='bootbox.confirm({message:"Are you sure to delete the server?",buttons:{confirm:{label:"Yes (Cannot be undone)",className:"btn-danger"},cancel:{label:"No",className:"btn-primary"}},callback:function(e){if(1==e){!async function(){fetch("/cpanel/api.jsx?token=${args.token}&mode=del&id=papo"),setTimeout(reloadServerList,1e3)}()}}});' class="negative disabled button ui">Delete server</button>
      </div>
   </div>
   \`
            }
            
            for (let i=0;i<userData.cpanel_owned_servers.length;i++) {
                maka.innerHTML = "Getting status of server "+userData.cpanel_owned_servers[i]
                let kama = await fetch("/cpanel/api.jsx?token=${args.token}&mode=getInfo&id="+userData.cpanel_owned_servers[i])
                let dama = await kama.json()
                let madma = dama.isOn ? "on" : "Off"
                let toma = document.getElementById("SERVERPH_"+i)
                console.log(dama)
                toma.innerHTML = \`
                
                
  <div class="content"><div class="header">
    \${dama.name ? dama.name : "Unnamed Server"}
  </div></div>
  <div class="ui content">
    <h5 class="ui header" style="margin: 0px">Server ID: \${dama.id}</h5>
    <h5 class="ui header" style="margin: 0px">Storage: \${Math.floor(dama.usedStorage*100)/100} MB / \${Math.floor(dama.storageSize)} MB</h5>
    <h5 class="ui header" style="margin: 0px">Server status: \${dama.isOn ? "On" : "Off"}</h5>
    
    
    <a href="./viewserver.jsx?id=\${dama.id}&token=${args.token}" class="ui right labeled icon button primary"><i class="right arrow icon"></i>Go to panel</a><button onclick='async function asd(){fetch("/cpanel/api.jsx?token=${args.token}&mode=del&id=\${dama.id}"),setTimeout(reloadServerList,1000)};asd()' class="negative button ui">Delete server</button>
  </div>\`
                //lim.innerHTML += '<br><div style="background-color: #007acc"><a href="./viewserver.jsx?id='+dama.id+'&token=${args.token}"><pre style="margin: 0px;">Server status: '+madma+'</pre><br><pre style="margin: 0px;">Server ID: '+dama.id+'</pre></a></div>'
            }
           // lim.innerHTML += "</div>"
        }
        async function renameServer(id) {
            
        }
        
        
        </script>
        
        
        <button onclick='resetUserData()' class="ui button negative">Reset userdata</button>
        <button onclick='newserver()' class="ui button positive">New server</button>
        <button onclick='getUserData()' class="ui button secondary">Get user data</button>
        <button onclick='reloadServerList()' class="ui button primary">Reload Server list</button>
        <button onclick='ginse()' class="ui button secondary">Get info of server </button><input id="gise" placeholder="Server id" />
        
        <div id="serverlist" onload="reloadServerList()">
        
        
        
        </div>
        
        
        
        `)
    }


    response.end(`

    </body>
    </html>
    
    `)


}