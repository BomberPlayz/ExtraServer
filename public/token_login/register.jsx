exports.run = async function(request, response, args, fs) {
  let main = "./token_login/"
  let database = "./token_login/database/"
  let md5 = require("../api/md5.js")

  response.write("<html>")
  if (args.user) {
    if (args.pass) {
      if (args.verifyPass) {
        if (args.verifyPass == args.pass) {

          let hat = require('hat');
          let token = hat();


          let userData =
          {
              "name": "NotValid",
              "logins": [

              ],
              "state": "NotValid",
              "password": "NotValid",
              "token": "NotValid",
              "tokens": {}
          }
          userData.name = args.user
          userData.state = "open"
          userData.password = md5(args.pass)
          userData.token = token

          await fs.writeFile(database+"accounts/"+args.user+".json",JSON.stringify(userData), function() {})

          response.end(`<html><meta http-equiv="refresh" content="0;url=./login.jsx?redirect=${args.redirect}&scope=${args.scope}" /></html>`)
          return;
        } else {
          response.write(`
          <div class="ui error message">
    <div class="header">Signup failed</div>
    <p>The passwords provided do not match.</p>
  </div>`)
        }
      } else {
        response.write(`
        <div class="ui error message">
    <div class="header">Signup failed</div>
    <p>You did not type anything into the verify password field..</p>
  </div>
        
        `)
      }
    } else {
      response.write(`
      <div class="ui error message">
    <div class="header">Signup failed</div>
    <p>You need to provide a password.</p>
  </div>
      `)
    }
  } else {
    response.write("")
  }
  let makaj = args.redirect ? `<input type="hidden" name="redirect" id="redirect" value="${args.redirect}" />` : ""

  response.end(`

    
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css" integrity="sha512-8bHTC73gkZ7rZ7vpqUQThUDhqcNFyYi2xgDgPDHc+GXVGHXq+xPjynxIopALmOPqzo9JZj0k6OqqewdGO3EsrQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        
        <script src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.js" integrity="sha512-dqw6X88iGgZlTsONxZK9ePmJEFrmHwpuMrsUChjAw1mRUhUITE5QU9pkcSox+ynfLhL15Sv2al5A0LVyDCmtUw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
    
    
    
  
  
  
  
  
  
  
  <form action="./register.jsx">
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
            <div class="field">
              <label>Verify Password</label>
              <div class="ui left icon input">
                <input type="password" name="verifyPass" id="verifyPass">
                <i class="lock icon"></i>
              </div>
            </div>
            <input type="submit" class="ui blue submit button" value="Login"></input>
          </div>
        </div>
        <div class="middle aligned column">
          <a href="./login.jsx?redirect=${args.redirect}" class="ui big button">
            <i class="signup icon"></i>
            Log In
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
