exports.run = (request, response, args, fs) => {
  loader(response)
  response.write(`<title>tucube</title>`)
  const dir = "./tucube/vidijson/"
  fs.readdir(dir, (err, files) => {
  files.forEach(file => {
    let asd = file.replace(".json", "")
    var cfg = JSON.parse(fs.readFileSync("./tucube/vidijson/" + asd + ".json"));
    if (cfg.id == args.id) {
      if (!cfg.tek.includes(args.usr)) {
        cfg.tek.push(args.usr)
        fs.writeFileSync("./tucube/vidijson/" + asd + ".json", JSON.stringify(cfg));
      }
      var cfgaa = JSON.parse(fs.readFileSync("./tucube/usrs/" + cfg.creator + ".json"));
      let irva = cfgaa.stat.subname.includes(args.usr)
      let irvatxt = irva ? "Leiratkozás" : "Feliratkozás"
      response.write(`<head>


        <head><link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script></head>
        <meta charset="utf-8">





<meta src="https://vjs.zencdn.net/7.8.2/video-js.css" rel="stylesheet" />

<style>

        /* Latest compiled and minified CSS included as External Resource*/

/* Optional theme */
@import url('//netdna.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap-theme.min.css');

body {
    margin: 10px;
    background-color: #181818;
    color: white;
}

.social-like, .social-dislike {
    border: none;
    outline: none;
    font-size: 16px;
    /*width: 48%;*/
    background-color: #03A9F4;
    color: #fff;
}

.forma {
    display: inline-block;
    padding: 5px;
    background-color: #181818;
}

.social-like {
    border-top-left-radius: 5px;
}

.social-dislike {
    border-top-right-radius: 5px;
}

.count, .like, .dislike {
    padding:10px;
}

.count, .dislike {
    background-color: #03A9F4;
    border-radius: 50%;
    font-size:12px;
}

.dislike {
    margin-left: -13px;
}

.count {
    margin-right: -10px;
}

button:hover {
  display: inline-block;
    vertical-align: middle;
    -webkit-transform: perspective(1px) translateZ(0);
    transform: perspective(1px) translateZ(0);
    box-shadow: 0 0 1px rgba(0, 0, 0, 0);
    -webkit-transition-duration: 0.3s;
    transition-duration: 0.3s;
    -webkit-transition-property: transform;
    transition-property: transform;
}

div {
  border-radius: 10px
  box-shadow: 10px 10px 5px grey;
  padding: 3px;
  background-color: #202020

}

</style>
</head>
<html>
<div id="page">
        <video class="video-js" preload="auto" data-setup="{}" style="width: 75%; height: 85%;" controls>
        <source src="./vidi/${asd}.mp4" type="video/mp4">
        Your browser does not support HTML video.
      </video>
<br>
<h4 style="display: inline-block;">${asd}</h4>
<p>${cfg.creator}</p>
<form style="inline-block" class="" action="./newsub.jsx" method="get">
  <input type="hidden" name="usr" value="${args.usr}">
  <input type="hidden" name="vid" value="${args.id}">
  <input type="hidden" name="tosub" value="${cfg.creator}">
  <input type="submit" name="" value="${irvatxt}">
</form>

      <form class="forma" action="./newlike.jsx" method="get">
        <input type="hidden" name="usr" value="${args.usr}">
        <input type="hidden" name="vid" value="${args.id}">
        <input type="hidden" name="data" value="fel">
        <button type="submit" name="" value="fel" class="social-like">
          <span class="like">

          <svg class="bi bi-hand-thumbs-up" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16v-1c.563 0 .901-.272 1.066-.56a.865.865 0 0 0 .121-.416c0-.12-.035-.165-.04-.17l-.354-.354.353-.354c.202-.201.407-.511.505-.804.104-.312.043-.441-.005-.488l-.353-.354.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581 0-.211-.027-.414-.075-.581-.05-.174-.111-.273-.154-.315L12.793 9l.353-.354c.353-.352.373-.713.267-1.02-.122-.35-.396-.593-.571-.652-.653-.217-1.447-.224-2.11-.164a8.907 8.907 0 0 0-1.094.171l-.014.003-.003.001a.5.5 0 0 1-.595-.643 8.34 8.34 0 0 0 .145-4.726c-.03-.111-.128-.215-.288-.255l-.262-.065c-.306-.077-.642.156-.667.518-.075 1.082-.239 2.15-.482 2.85-.174.502-.603 1.268-1.238 1.977-.637.712-1.519 1.41-2.614 1.708-.394.108-.62.396-.62.65v4.002c0 .26.22.515.553.55 1.293.137 1.936.53 2.491.868l.04.025c.27.164.495.296.776.393.277.095.63.163 1.14.163h3.5v1H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"/>
</svg>

          </i></span>
          <span class="count">${cfg.like.fel}</span>
        </button>
      </form>
      <label class="forma">   </label>
      <form class="forma" action="./newlike.jsx" method="get">
        <input type="hidden" name="usr" value="${args.usr}">
        <input type="hidden" name="vid" value="${args.id}">
        <input type="hidden" name="data" value="le">
        <button type="submit" name="" value="le" class="social-like">
          <span class="like">

          <svg class="bi bi-hand-thumbs-down" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M6.956 14.534c.065.936.952 1.659 1.908 1.42l.261-.065a1.378 1.378 0 0 0 1.012-.965c.22-.816.533-2.512.062-4.51.136.02.285.037.443.051.713.065 1.669.071 2.516-.211.518-.173.994-.68 1.2-1.272a1.896 1.896 0 0 0-.234-1.734c.058-.118.103-.242.138-.362.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.094 2.094 0 0 0-.16-.403c.169-.387.107-.82-.003-1.149a3.162 3.162 0 0 0-.488-.9c.054-.153.076-.313.076-.465a1.86 1.86 0 0 0-.253-.912C13.1.757 12.437.28 11.5.28v1c.563 0 .901.272 1.066.56.086.15.121.3.121.416 0 .12-.035.165-.04.17l-.354.353.353.354c.202.202.407.512.505.805.104.312.043.44-.005.488l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.415-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.353.352.373.714.267 1.021-.122.35-.396.593-.571.651-.653.218-1.447.224-2.11.164a8.907 8.907 0 0 1-1.094-.17l-.014-.004H9.62a.5.5 0 0 0-.595.643 8.34 8.34 0 0 1 .145 4.725c-.03.112-.128.215-.288.255l-.262.066c-.306.076-.642-.156-.667-.519-.075-1.081-.239-2.15-.482-2.85-.174-.502-.603-1.267-1.238-1.977C5.597 8.926 4.715 8.23 3.62 7.93 3.226 7.823 3 7.534 3 7.28V3.279c0-.26.22-.515.553-.55 1.293-.138 1.936-.53 2.491-.869l.04-.024c.27-.165.495-.296.776-.393.277-.096.63-.163 1.14-.163h3.5v-1H8c-.605 0-1.07.08-1.466.217a4.823 4.823 0 0 0-.97.485l-.048.029c-.504.308-.999.61-2.068.723C2.682 1.815 2 2.434 2 3.279v4c0 .851.685 1.433 1.357 1.616.849.232 1.574.787 2.132 1.41.56.626.914 1.28 1.039 1.638.199.575.356 1.54.428 2.591z"/>
</svg>

          </i></span>
          <span class="count">${cfg.like.le}</span>
        </button>
      </form><br>



      <div style="border-color: blue">
      <p>desc: </p>
      <pre style="color: white;">${cfg.dcdc}</pre>
      </div>



      `)


      response.write(`<p>megtekintesek: ${cfg.tek.length}</p>`)
      var em = JSON.parse(fs.readFileSync("./tucube/usrs/" + cfg.creator + ".json"));
      response.write(`<p>subjai: ${em.stat.subs}</p>`)
      response.write(`
      <a href=./linker.js?id=${args.id}&data=cr&usr=${args.usr}>link generalasa</a>`)
      response.write(`<p>commentek: </p>`)
      for (var i = 0; i < cfg.mond.modi.length; i++) {

        response.write(`<div class="comment" > <h4>${cfg.mond.emb[i]}: </h4>`)
        response.write(`<p>${cfg.mond.modi[i]}</p> </div>`)
      }
      response.write(`<form class="" action="./newhoz.jsx" method="get">
        <input type="hidden" name="usr" value="${args.usr}">
        <input type="hidden" name="vid" value="${args.id}">
        <input type="text" name="comm" value="uj comment">
        <input type="submit" name="" value="ok">
      </form>
      <a href='./index.jsx?usr=${args.usr}'>vissza a vidi valaszto hoz!</a>`)
      response.end("</div></html>")
    }
  })
  })
}
