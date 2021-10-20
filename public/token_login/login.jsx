exports.run = async function(request, response, args, fs) {

    response.setHeader('Access-Control-Allow-Origin', '*')
    response.write("<!doctype html>")
    response.write(`
    <head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>
        
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
        
        
        <script src="./ansi_up.js" type="text/javascript"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/bootbox.js/5.5.2/bootbox.min.js" integrity="sha512-RdSPYh1WA6BF0RhpisYJVYkOyTzK4HwofJ3Q7ivt/jkpW6Vc8AurL1R+4AUcvn9IwEKAPm/fk7qFZW3OuiUDeg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <link rel="stylesheet" href="/twms/toaster/css/bootstrap-toaster.css" />
        <script src="/twms/toaster/js/bootstrap-toaster.min.js"></script>
    </head>
    
    `)
    args.site = request.headers.origin ? request.headers.origin : "main";
   // let fs = require("fs")

    let main = "./token_login/"
    let database = "./token_login/database/"
    let md5 = require("../api/md5.js")
    if(typeof global.users == "undefined") {
        global.users = []
    }
    if(args.user) {
        if(args.pass) {
            if(fs.existsSync(database+"/accounts/"+args.user+".json")) {
                let userData = require("./database/accounts/"+args.user+".json")
                delete require.cache[require.resolve("./database/accounts/"+args.user+".json")]
                if(md5(args.pass) == userData.password) {


                    global.users[args.user] = userData
                    let tok = ""
                    let to = args.redirect ? args.redirect : "./index.jsx"
                    if(userData.tokens) {

                        tok = userData.tokens[args.site] ? userData.tokens[args.site] : "NO"
                        if (tok == "NO") {
                            userData.tokens[args.site] = md5(args.site+Math.random().toString())
                            tok = md5(args.site+Math.random().toString())
                            fs.writeFileSync(database+"accounts/"+args.user+".json",JSON.stringify(userData))
                        }
                    } else {
                        userData.tokens = {}
                        tok = userData.tokens[args.site] ? userData.tokens[args.site] : "NO"
                        if (tok == "NO") {
                            userData.tokens[args.site] = md5(args.site+Math.random().toString())
                            tok = md5(args.site+Math.random().toString())
                            fs.writeFileSync(database+"accounts/"+args.user+".json",JSON.stringify(userData))
                        }
                    }
                    if (userData.isBanned == true) {
                        response.end(`<html><meta http-equiv="refresh" content="0;url=./login.jsx?error=suspend&site=${args.site}&redirect=${args.redirect}" /></html>`)
                        return;
                    }
                    let userDataa = require("./database/accounts/"+args.user+".json")
                    delete require.cache[require.resolve("./database/accounts/"+args.user+".json")]
                    response.end(`<html><meta http-equiv="refresh" content="0;url=${to}?token=${userDataa.tokens[args.site]}" /></html>`)
                } else {
                    response.end(`<html><meta http-equiv="refresh" content="0;url=./login.jsx?error=rossz%20jelszó&site=${args.site}&redirect=${args.redirect}" /></html>`)
                }
            } else {
                response.end(`<html><meta http-equiv="refresh" content="0;url=./login.jsx?error=Nincs%20ilyen%20user!&site=${args.site}&redirect=${args.redirect}" /></html>`)
            }
        }
        return;
    }
    let macska = args.redirect ? `<input type="hidden" name="redirect" id="redirect" value="${args.redirect}"></input>` : ""

    if (args.error == "suspend") {
        response.write("<h3 class='text-danger'>Error: this account is suspended.</h3>")

    }
    response.end(`


    <html>
    
    
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css" integrity="sha512-8bHTC73gkZ7rZ7vpqUQThUDhqcNFyYi2xgDgPDHc+GXVGHXq+xPjynxIopALmOPqzo9JZj0k6OqqewdGO3EsrQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        
        <script src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.js" integrity="sha512-dqw6X88iGgZlTsONxZK9ePmJEFrmHwpuMrsUChjAw1mRUhUITE5QU9pkcSox+ynfLhL15Sv2al5A0LVyDCmtUw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
    
    
    
    
    
<form action="./login.jsx">
    <div class="ui placeholder segment">
      <div class="ui two column very relaxed stackable grid">
        <div class="column">
          <div class="ui form">
            <div class="field">
              <label>Username</label>
              <div class="ui left icon input">
                <input type="text" placeholder="Username" name="user" id="usr">
                <i class="user icon"></i>
              </div>
            </div>
            <div class="field">
              <label>Password</label>
              <div class="ui left icon input">
                <input type="password" name="pass" id="pass">
                <i class="lock icon"></i>
              </div>
            </div>
            <input type="submit" class="ui blue submit button" value="Login"></input>
          </div>
        </div>
        <div class="middle aligned column">
          <a href="./register.jsx?redirect=${args.redirect}" class="ui big button">
            <i class="signup icon"></i>
            Sign Up
          </a>
        </div>
      </div>
      <div class="ui vertical divider">
        Or
      </div>
    </div>
    
    <input type="hidden" name="redirect" id="redirect" value="${args.redirect}"></input>
</form>


    
    
    </html>






    `)
}
