"tarsit";
let args = arguments
if(!args || !args[0]) {
  args = []
  args.push("./desktop/lalala.mp3")
}
addWindow("Médialejátszó - "+args[0],`


<video style="width:99%;" controls autoplay>
        <source src="${args[0]}">
        Your browser does not support HTML video.
      </video>


`,400,270)
