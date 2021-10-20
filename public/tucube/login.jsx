exports.run = (request, response, args) => {
  var fs = require('fs');
  var url = require('url');
  var quka = url.parse(request.url, true).query;
  var back = "nincs ilyen felhasználó"
  response.write(`<title>tucube Login</title>`)
  response.write(`<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>


<div class="alert alert-warning" role="alert">
<h4 class="alert-heading">Figyelem</h4>
<p>A login-rendszer nagyon keszul, es most nincs titkositva jelszo.</p>
<p>Ne adjon meg olyan jelszot amit mindenhol hasznal.</p>
<hr>
<p class="mb-0">Tucube Login</p>
</div>`);
  if (fs.existsSync("./tucube/usrs/" + args.usr + ".json")) {
    back = "Pass error"
    var cfg = JSON.parse(fs.readFileSync("./tucube/usrs/" + args.usr + ".json"));
    if (quka.pass == cfg.usr.pass) {
      back = "ok"
      /*response.write(`<script type="text/javascript">
        function winop() {
          nw = window.open('./index.js?usr=${args.usr}', '', width=250, height=50)
        }
        winop()
      </script>`)*/
      var cfg = JSON.parse(fs.readFileSync("./tucube/belep.json"));
      cfg.push(args.usr)
      fs.writeFileSync("./tucube/belep.json", JSON.stringify(cfg));
      response.end('<meta http-equiv="refresh" content="0; url=index.jsx?usr='+args.usr+'" />')
    } else {
      response.end(back)
    }
  } else {
    response.end(back)
  }

}
