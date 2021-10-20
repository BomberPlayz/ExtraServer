exports.run = (request, response, args, fs) => {
    response.end(`
    
    <!doctype html>
    <html>
    <head>
        <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>
        
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
        
        <script>
        /*let users = ["CoolKid777","PatriikPlays","BomberPlayz","jrddunbr","lolbaba76","amogusLOL","kjajsakjsa"]
        let messages = ["sent!","yes","no","harm","raid","fuck","you","idiot","shit","yeet","notifications","lmao","nigger"]
        setInterval(function() {
            let msg = ""
            for (let i=1; i<Math.random()*5; i++){
                msg = msg+" "+messages[Math.floor(Math.random()*messages.length)]
            }
            Toast.create(users[Math.floor(Math.random()*users.length)],msg, TOAST_STATUS.WARNING, 1500)
        },500)*/
        
        
            
            
        
        
        
       
    </script>
    </head>
    
    <body class="bg-dark" onload='Toast.setTheme(TOAST_THEME.LIGHT);Toast.create("Please note","The panel is still in heavy development.", TOAST_STATUS.INFO, 10000)'>
    <link rel="stylesheet" href="/twms/toaster/css/bootstrap-toaster.css" />
        <script src="/twms/toaster/js/bootstrap-toaster.min.js"></script>
        <div class="card text-center center" style="width: 256px">
          <div class="card-header">
            TWMS Panel Selector
          </div>
          <div class="card-body">
            <h5 class="card-title">Dashboard</h5>
            <p class="card-text">Go to the TWMS panel dashboard</p>
            <a href="#" class="btn btn-primary">Go to dashboard</a>
          </div>
          <div class="card-footer text-muted">
            
          </div>
        </div>
   
    </body>
    </html>
    
    
    
    `)
}