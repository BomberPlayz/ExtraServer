"tarsit";
mem.argi = arguments
addWindow("ProEdit v1", `

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<meta charset="UTF-8">
<script>
 temp.num = ${randId()}  //szám nyam
 temp.num2 = ${randId()} //szám nyam
 temp.num3 = ${randId()} //szám nyam
 temp.num4 = ${randId()} //szám nyam
</script>
<textarea id="a" style="width:780px; height:310px; display:inline-block;">
</textarea>

<button id="aa">Nyit</button>
<button id="aaa">Ment</button>
<button id="aaaa">Ment másként</button>
<script>

$("#a").attr("id",temp.num);
$("#aa").attr("id",temp.num2);
$("#aaa").attr("id",temp.num3);
$("#aaaa").attr("id",temp.num4);

(
    async function(args){
        let num = temp.num
        let num2 = temp.num2
        let num3 = temp.num3
        let num4 = temp.num4
        console.log(num,num2,num3)
        let dir = "desktop/"

        nyit = $("#"+num2)
        save = $("#"+num3)
        saveas = $("#"+num4)
        let filename = ""
        console.log("BUZI"+args);
        console.log("kurvaa");
        console.log(args);
        if(args && args[0] && args[0][1]) {

          dir = args[0][1]+"/"
          console.log("DIRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR: "+dir);
        }
        if(args && args[0] && args[0][0]) {
          filename = args[0][0]
          let dunya = await fetch(window.location.href.replace(/[^/]*$/, '')+dir+args[0][0])
          let data = await dunya.text()

          document.getElementById(num).value = data
        }



        nyit.on("click",async function()
        {
            filename = prompt("Fájlnév?")
            let dunya = await fetch(window.location.href.replace(/[^/]*$/, '')+dir+filename)
            let data = await dunya.text()

            document.getElementById(num).value = data
        });

        save.on("click",function() {

            console.log(document.getElementById(num).value)
            $.post("/virtual_desk/desktop/proedit_save.jsx",{"file": "."+window.location.pathname.replace(/[^/]*$/, '')+dir+filename, "data": document.getElementById(num).value})
        });

        saveas.on("click", function()
        {
            console.log(dir)
            let filen = prompt("Fájlnév?")
            $.post("/virtual_desk/desktop/proedit_save.jsx",{"file": "."+window.location.pathname.replace(/[^/]*$/, '')+dir+filen, "data": document.getElementById(num).value})
        });


    }(mem.argi)
)

</script>



`,800,400) //<---- ablak, így megy: addWindow(cím,data), opcionális: addWindow(cím,data,vastag,magas)
