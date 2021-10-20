let args = arguments
if(!args || !args[0]) {
  args = []
  args.push("./desktop/lalala.mp3")
}
addWindow("Muzsika - "+args[0],`


<video style="width:99%;height:85%;" controls>
        <source src="${args[0]}" type="audio/mp3">
        Your browser does not support HTML video.
      </video>


`,400,200)