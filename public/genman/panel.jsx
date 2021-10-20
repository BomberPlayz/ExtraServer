exports.run = async (request, response, args) => {
    let fs = require("fs")
    /*let cfg = JSON.parse(fs.readFileSync("./database/.json", "utf8"));
    var tojson = cfg
    fs.writeFileSync("./database/.json", JSON.stringify(tojson));*/
    var fetch = require('node-fetch');
    response.write('<head><meta charset="UTF-8"><title>Gen Panel</title></head>')
    response.write('<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">')
    response.write('<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>')
    response.write('<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>')
    response.write('<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.min.js" integrity="sha384-Atwg2Pkwv9vp0ygtn1JAojH0nYbwNJLPhwyoVbhoPwBhjQPR5VtM2+xf0Uwh9KtT" crossorigin="anonymous"></script>')
    response.write('<script src="https://code.jquery.com/jquery-3.5.0.js"></script>')
    response.write('<script src="https://bernii.github.io/gauge.js/dist/gauge.min.js"></script>')
    response.write('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">')
    let gb = `<div style="text-align: center; display: inline-block; margin: 20px">
        <h4>Grid connect</h4>
        <button id="gridconnect" class="btn btn-primary" style="display: inline-block; width: 48px; height: 48px;"><i class="bi bi-power"></i></button>
    </div>`
    if(args.server == "Builder_Base") {
        gb = ""
    }

    response.write(`
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="modal_title" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modal_title"></h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body" id='modal_body'>
        
      </div>
      <div class="modal-footer" id='modal_buttons'>
        
      </div>
    </div>
  </div>
</div>
    `)
    response.write(`
    <div id='dia' style="text-align: center">
        <div style="text-align: center; display: inline-block">
            <h3 id="speedtext">Speed: 0</h3>
            <canvas id="speedbar"></canvas>
        </div>
        <div style="text-align: center; display: inline-block;">
            <h3 id="tortatext">Throttle: 0</h3>
          <canvas id="tortabar"></canvas>
        </div>
   
        <div style="text-align: center; display: inline-block;">
            <h3 id="volttext">Voltage: 0</h3>
            <canvas id="voltbar"></canvas>
        </div>
        <div style="text-align: center; display: inline-block;">
            <h3 id="watttext">Watts: 0</h3>
            <canvas id="wattbar"></canvas>
        </div>
        
    </div>
    <div id="buts" style="text-align: center">
    
    <div style="text-align: center; display: inline-block; margin: 20px">
        <h4>Starter</h4>
        <button id="starter" class="btn btn-primary" style="display: inline-block; width: 48px; height: 48px;"><i class="bi bi-power"></i></button>
    </div>
    <div style="text-align: center; display: inline-block; margin: 20px">
        <h4>Connect gen</h4>
        <button id="genconnect" class="btn btn-primary" style="display: inline-block; width: 48px; height: 48px;"><i class="bi bi-power"></i></button>
    </div>
    
    ${gb}
    <div style="text-align: center; display: inline-block; margin: 20px">
        <h4>Stop</h4>
        <button id="stop" class="btn btn-primary" style="display: inline-block; width: 48px; height: 48px;"><i class="bi bi-power"></i></button>
    </div>
    <div style="text-align: center; display: inline-block; margin: 20px">
        <h4>Power</h4>
        <button id="power" class="btn btn-primary" style="display: inline-block; width: 48px; height: 48px;"><i class="bi bi-power"></i></button>
    </div>
    
    
    
    
    
    </div>
    <div>
    
    <input id="modipot" type="text" class="form-control" placeholder="Set wattage multiplier" style="width: 25%"></input>
    <button onclick="modifyMulti()" style="display: inline-block" class="btn btn-primary">Set wattage multiplier!</button>
    
    
    </div>
    `)
    response.write(`
    <div class="spinner-grow text-secondary position-absolute top-50 start-50 translate-middle" role="status" id="loader" style="display:block">
        <span class="visually-hidden">Loading...</span>
    </div>
    `)
    /*response.write(`
    <label>tuc</label><span class="badge rounded-pill bg-primary">BOT</span>
    `)*/
    response.write(`
    <div class="toast position-absolute bottom-50 end-0" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
            <svg class="bd-placeholder-img rounded me-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#007aff"></rect></svg>
            <strong class="me-auto" id='toast_header'></strong>
            <small class="text-muted" id='toast_time'></small>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body" id='toast_data'>
            
        </div>
    </div>
    <script>
    
    
    async function modifyMulti() {
        let pat = document.getElementById("modipot")
        await fetch("./api.jsx"+window.location.search+"&mode=setWattsMulti&value="+pat.value)
        pat.value = ""
    }
    
    
    var opts = {
  angle: -0.1, // The span of the gauge arc
  lineWidth: 0.2, // The line thickness
  radiusScale: 1, // Relative radius
  pointer: {
    length: 0.6, // // Relative to gauge radius
    strokeWidth: 0.06, // The thickness
    color: '#000000' // Fill color
  },
  limitMax: false,     // If false, max value increases automatically if value > maxValue
  limitMin: false,     // If true, the min value of the gauge will be fixed
  colorStart: '#6F6EA0',   // Colors
  colorStop: '#C0C0DB',    // just experiment with them
  strokeColor: '#EEEEEE',  // to see which ones work best for you
  generateGradient: true,
  highDpiSupport: true,     // High resolution support
  // renderTicks is Optional
  renderTicks: {
    divisions: 11,
    divWidth: 1.1,
    divLength: 0.7,
    divColor: '#333333',
    subDivisions: 3,
    subLength: 0.5,
    subWidth: 1,
    subColor: '#666666'
  },
  
  staticLabels: {
  font: "10px sans-serif",  // Specifies font
  labels: [0, 10, 20, 30, 40, 50,60,70,80,90,100],  // Print labels at these values
  color: "#000000",  // Optional: Label text color
  fractionDigits: 0  // Optional: Numerical precision. 0=round off.
},
staticZones: [
   
   
   {strokeStyle: "#30B32D", min: 0, max: 75}, // Green
   {strokeStyle: "#FFDD00", min: 75, max: 80}, // Yellow
   {strokeStyle: "#F03E3E", min: 80, max: 100}  // Red
],
  
};
var targeta = document.getElementById('tortabar'); // your canvas elemen
var toartagag = new Gauge(targeta).setOptions(opts); // create sexy gauge!
toartagag.maxValue = 100; // set max gauge value
toartagag.setMinValue(0);  // Prefer setter over gauge.minValue = 0
toartagag.animationSpeed = 64; // set animation speed (32 is default value)
toartagag.set(0); // set actual value



opts = {
  angle: -0.1, // The span of the gauge arc
  lineWidth: 0.2, // The line thickness
  radiusScale: 1, // Relative radius
  pointer: {
    length: 0.6, // // Relative to gauge radius
    strokeWidth: 0.06, // The thickness
    color: '#000000' // Fill color
  },
  limitMax: false,     // If false, max value increases automatically if value > maxValue
  limitMin: false,     // If true, the min value of the gauge will be fixed
  colorStart: '#6F6EA0',   // Colors
  colorStop: '#C0C0DB',    // just experiment with them
  strokeColor: '#EEEEEE',  // to see which ones work best for you
  generateGradient: true,
  highDpiSupport: true,     // High resolution support
  // renderTicks is Optional
  renderTicks: {
    divisions: 11,
    divWidth: 1.1,
    divLength: 0.7,
    divColor: '#333333',
    subDivisions: 3,
    subLength: 0.5,
    subWidth: 1,
    subColor: '#666666'
  },
  
  staticLabels: {
  font: "10px sans-serif",  // Specifies font
  labels: [0,200,400,600,800,1000],  // Print labels at these values
  color: "#000000",  // Optional: Label text color
  fractionDigits: 0  // Optional: Numerical precision. 0=round off.
},
staticZones: [
   {strokeStyle: "#F03E3E", min: 0, max: 650}, // Red from 100 to 130
   {strokeStyle: "#FFDD00", min: 650, max: 700}, // Yellow
   {strokeStyle: "#30B32D", min: 700, max: 840}, // Green
   {strokeStyle: "#FFDD00", min: 840, max: 900}, // Yellow
   {strokeStyle: "#F03E3E", min: 900, max: 1000}  // Red
],
  
};
var target = document.getElementById('speedbar'); // your canvas elemen
var speedgag = new Gauge(target).setOptions(opts); // create sexy gauge!
speedgag.maxValue = 1000; // set max gauge value
speedgag.setMinValue(0);  // Prefer setter over gauge.minValue = 0
speedgag.animationSpeed = 64; // set animation speed (32 is default value)
speedgag.set(0); // set actual value



opts = {
  angle: -0.1, // The span of the gauge arc
  lineWidth: 0.2, // The line thickness
  radiusScale: 1, // Relative radius
  pointer: {
    length: 0.6, // // Relative to gauge radius
    strokeWidth: 0.06, // The thickness
    color: '#000000' // Fill color
  },
  limitMax: false,     // If false, max value increases automatically if value > maxValue
  limitMin: false,     // If true, the min value of the gauge will be fixed
  colorStart: '#6F6EA0',   // Colors
  colorStop: '#C0C0DB',    // just experiment with them
  strokeColor: '#EEEEEE',  // to see which ones work best for you
  generateGradient: true,
  highDpiSupport: true,     // High resolution support
  // renderTicks is Optional
  renderTicks: {
    divisions: 11,
    divWidth: 1.1,
    divLength: 0.7,
    divColor: '#333333',
    subDivisions: 3,
    subLength: 0.5,
    subWidth: 1,
    subColor: '#666666'
  },
  
  staticLabels: {
  font: "10px sans-serif",  // Specifies font
  labels: [0, 400, 800, 1200, 1600, 2000,2400,2800,3200,3600,4000],  // Print labels at these values
  color: "#000000",  // Optional: Label text color
  fractionDigits: 0  // Optional: Numerical precision. 0=round off.
},
staticZones: [
   {strokeStyle: "#F03E3E", min: 0, max: 2000}, // Red from 100 to 130
   {strokeStyle: "#FFDD00", min: 2000, max: 3200}, // Yellow
   {strokeStyle: "#30B32D", min: 3200, max: 3600}, // Green
   {strokeStyle: "#FFDD00", min: 3600, max: 4000}, // Yellow
   {strokeStyle: "#F03E3E", min: 4000, max: 4200}  // Red
],
  
};
var targete = document.getElementById('voltbar'); // your canvas elemen
var voltgag = new Gauge(targete).setOptions(opts); // create sexy gauge!
voltgag.maxValue = 4200; // set max gauge value
voltgag.setMinValue(0);  // Prefer setter over gauge.minValue = 0
voltgag.animationSpeed = 64; // set animation speed (32 is default value)
voltgag.set(0); // set actual value






opts = {
  angle: -0.1, // The span of the gauge arc
  lineWidth: 0.2, // The line thickness
  radiusScale: 1, // Relative radius
  pointer: {
    length: 0.6, // // Relative to gauge radius
    strokeWidth: 0.06, // The thickness
    color: '#000000' // Fill color
  },
  limitMax: false,     // If false, max value increases automatically if value > maxValue
  limitMin: false,     // If true, the min value of the gauge will be fixed
  colorStart: '#6F6EA0',   // Colors
  colorStop: '#C0C0DB',    // just experiment with them
  strokeColor: '#EEEEEE',  // to see which ones work best for you
  generateGradient: true,
  highDpiSupport: true,     // High resolution support
  // renderTicks is Optional
  renderTicks: {
    divisions: 11,
    divWidth: 1.1,
    divLength: 0.7,
    divColor: '#333333',
    subDivisions: 3,
    subLength: 0.5,
    subWidth: 1,
    subColor: '#666666'
  },
  
  staticLabels: {
  font: "10px sans-serif",  // Specifies font
  labels: [0, 10000, 20000, 30000, 40000, 50000,60000,70000,80000,90000,100000],  // Print labels at these values
  color: "#000000",  // Optional: Label text color
  fractionDigits: 0  // Optional: Numerical precision. 0=round off.
},
staticZones: [
   
   
   {strokeStyle: "#30B32D", min: 0, max: 75000}, // Green
   {strokeStyle: "#FFDD00", min: 75000, max: 85000}, // Yellow
   {strokeStyle: "#F03E3E", min: 85000, max: 100000}  // Red
],
  
};
var targetee = document.getElementById('wattbar'); // your canvas elemen
var wattgag = new Gauge(targetee).setOptions(opts); // create sexy gauge!
wattgag.maxValue = 100000; // set max gauge value
wattgag.setMinValue(0);  // Prefer setter over gauge.minValue = 0
wattgag.animationSpeed = 64; // set animation speed (32 is default value)
wattgag.set(0); // set actual value




    
    
        function modal_ok() {
            window.location.href = "./?ok=true&usr=" + document.getElementById("tuc").value
        }
        $(document).ready(function() {
            document.getElementById('toast_header').innerText = "Generator Panel"
            document.getElementById('toast_time').innerText = "just now"
            document.getElementById('toast_data').innerText = "In heavy development!"
            $(".toast").toast('show');
            /*document.getElementById('modal_title').innerText = "Safe"
            document.getElementById('modal_body').innerText = "Are you sure to go in your task?"
            document.getElementById('modal_buttons').innerHTML = '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick="modal_ok()">Ok</button>'
            $(".modal").modal('show');*/
            document.getElementById('loader').style.display = "none"
            try {
                
                
                
                auto()
            } catch {

            }
        });
        </script>
    `)

    let cfg = JSON.parse(fs.readFileSync("./genman/datas.json", "utf8"));
    if (cfg[args.server] != undefined) {
        response.write(`
        <script>
        auto()
            function auto() {
                setTimeout(async function () {
                    auto()
                    try {
                        console.log("teried???")
                        let macska = await fetch("./api.jsx"+window.location.search+"&mode=getSpeed")
                let spem = await macska.text()
                
                let asdasdasdaaaaa = await fetch("./api.jsx"+window.location.search+"&mode=getWattsMulti")
                let wattMultiply = await asdasdasdaaaaa.text()
                
                speedgag.set(Number(spem)*1000);
                let togi = document.getElementById('speedtext');
                togi.innerHTML = "Speed: "+(Math.floor(Number(spem)*1000))+" rpm"
                
                let macskar = await fetch("./api.jsx"+window.location.search+"&mode=getTorta")
                let sperm = await macskar.text()
                toartagag.set(Number(sperm)*100);
                
                let togir = document.getElementById('tortatext');
                togir.innerHTML = "Throttle: "+(Math.floor(Number(sperm)*1000)/10)+"%"
                
                
                let macskart = await fetch("./api.jsx"+window.location.search+"&mode=getVolt")
                let sperma = await macskart.text()
                voltgag.set(Number(sperma)*4200);
                
                let togirt = document.getElementById('volttext');
                
                let macskarta = await fetch("./api.jsx"+window.location.search+"&mode=getWatt")
                let spermaa = await macskarta.text()
                wattgag.max = Number(wattMultiply)
                wattgag.set(Number(spermaa)*Number(wattMultiply));
                console.log("MULTIPLIER IS ::::::::::::::::::::::::: "+Number(wattMultiply))
                
                let togirta = document.getElementById('watttext');
                togirta.innerHTML = "Per sector watts: "+Math.floor(Number(spermaa)*Number(wattMultiply))+"W (avg)"
                
                
                
                
                
                
                
                
                let asdasdasda = await fetch("./api.jsx"+window.location.search+"&mode=getStarter")
                let starter = await asdasdasda.text()
                
                let asdasdasdasd = await fetch("./api.jsx"+window.location.search+"&mode=getGrid")
                let grid = await asdasdasdasd.text()
                
                let asdasdasdara = await fetch("./api.jsx"+window.location.search+"&mode=getGens")
                let gens = await asdasdasdara.text()
                
                let asdasdasd = await fetch("./api.jsx"+window.location.search+"&mode=getStop")
                let stop = await asdasdasd.text()
                
                let asdasdasdaaa = await fetch("./api.jsx"+window.location.search+"&mode=getPower")
                let power = await asdasdasdaaa.text()
                let stats = []
                let maks = []
                let paks = []
                if(window.location.search == "?server=Builder_Base") {
                     stats = [starter,gens,stop,power]
                 maks = ["starter","genconnect","stop","power"]
                 paks = ["setStarter","setGens","setStop","setPower"]
                } else {
                     stats = [starter,gens,grid,stop,power]
                 maks = ["starter","genconnect","gridconnect","stop","power"]
                 paks = ["setStarter","setGens","setGrid","setStop","setPower"]
                }
                
                for (let i=0; i<stats.length; i++) {
                    
                    
                    let elem = document.getElementById(maks[i])
                    
                    if (stats[i] == "on") {
                        elem.setAttribute("class","btn btn-danger")
                        elem.onclick = async function(){console.log("ONNN_______"+maks[i]);await fetch("./api.jsx"+window.location.search+"&mode="+paks[i]+"&value=off")}
                    } else {
                        elem.setAttribute("class","btn btn-success")
                        elem.onclick = async function(){console.log("OF____________"+maks[i]);await fetch("./api.jsx"+window.location.search+"&mode="+paks[i]+"&value=on")}
                    }
                
                
                }
                togirt.innerHTML = "Voltage: "+(Math.floor(Number(sperma)*4200))+"V"
                    } catch (err) {
                        console.log("ERROR: "+err)
                        console.log("ERROR: "+err)
                        auto()
                    }
                    
                }, 1500)
            }
        </script>
        `)
    } else {
        response.write("this server not exists")
    }
    
    response.end()
}