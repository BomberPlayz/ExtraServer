"tarsit";
addWindow("Weboldal nézegető",`

<script>
 temp.num1 = ${randId()}  //szám nyam
 temp.num2 = ${randId()} //szám nyam
 temp.num3 = ${randId()} //szám nyam
 temp.num4 = ${randId()} //szám nyam
</script>

<input id="t"></input>
<iframe id="tt" style="width:99%;height:85%;"></iframe>
<script>

$("#t").attr("id",temp.num1);
$("#tt").attr("id",temp.num2);

(

function(){


let num1 = temp.num1
let num2 = temp.num2

let input = $("#"+num1)
let iframe = $("#"+num2)

$("#"+num1).on("change",function(){

console.log("JEEEE")
$("#"+num2).attr("src",document.getElementById(num1).value)

})



}()

)

</script>


`,800,400)
