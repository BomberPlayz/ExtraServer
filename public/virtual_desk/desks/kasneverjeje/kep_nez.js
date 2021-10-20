"tarsit";
let args = arguments
if(!args || !args[0]) {
  args = []
  args.push("./icons/NoIcon.png")
}
addWindow("Képnézegető - "+args[0],`


<img src='${args[0]}' style='height:95%;'>


`,400,200)
