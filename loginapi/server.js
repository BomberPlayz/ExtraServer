const { fstat } = require('fs');
const http = require('http');
console.log("Loading libraries...")
var log4js = require("log4js");
var dirDo = require("./libaries/dirList.js")
dirDo.dirRun("./libaries/",function(file) {
  console.log("Loading libary "+file)
  try {
    let path = require("path")
    let fule = path.dirname(file)
    let falat = file.replace(fule+"/","")
    let folot = falat.replace(".js","")

    global[folot] = require(file)
    console.log("Loaded library "+folot+"!")
  } catch {
    console.log("Could not load library "+file+"! This may cause severe errors!")
  }

})

process.on("uncaughtException",function(err) {
  log4js.getLogger().fatal("uncaughtException: "+err.stack)
})

class webserver {
  constructor(port) {
    this.port = port
    this.stored = {}
    this.server = null
    this.logger = null
  }
  start() {
    try {
      this.server.listen(this.port)
      return true
    } catch(e) {
      return(false,e)
    }

  }
}

class extendedServer extends webserver {
  constructor(port,pluginFolder) {
    super(port)
    this.port = port
    this.stored = {}
    this.server = null
    this.pluginFolder = pluginFolder
    let datetime = new Date();
    let logFileName = ".log"
    let logFileCounter = 0
    let fs = require("fs")
    while(fs.existsSync("./logs/"+datetime.toISOString().slice(0,10)+"_"+logFileCounter+".log")) {
      logFileCounter++
    }
    logFileName = "../logs/"+datetime.toISOString().slice(0,10)+"_"+logFileCounter+".log"
    log4js.configure({
      appenders: { default: { type: "file", filename: logFileName },std: { type: "stdout" } },
      categories: { default: { appenders: ["default","std"], level: "error" } }
    })
    this.logger = log4js.getLogger()
    this.logger.level = "debug";
    this.logger.info("|-----------------|")
    this.logger.info("|ExtraServer START|")
    this.logger.info("|-----------------|")
    this.requestHandler = function(request,response) {
      log4js.getLogger().info("Got request ")
      response.end("No request handler plugins are installed on your server! Please install a reqest handler plugin on your server plugin folder.")
    }
  }



  start() {
    try {

      this.logger.info("starting newrelic...")
      require('newrelic');
      this.logger.info("creating server...")
      this.server = http.createServer()
      this.logger.info("Loading plugins...")

      let plugs = require("fs").readdirSync(this.pluginFolder)
      for (var i = 0; i < plugs.length; i++) {
        try {
          require("./"+this.pluginFolder+plugs[i]).onStart(this,log4js.getLogger(plugs[i]))
          this.logger.info("Loaded plugin "+plugs[i])
        } catch(e) {
          this.logger.error("Cloud not load plugin "+plugs[i]+": "+e)
        }
      }

      //
      // If we're not in production then log to the `console` with the format:
      // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
      //
      this.logger.info("Starting to listen...")
      this.server.listen(this.port)

      this.server.on("request",this.requestHandler)

      this.logger.info("Server started!")
      process.chdir("./public")
      return true
    } catch(e) {
      this.logger.fatal("Server was unable to start: "+e.stack)
      return(false,e)
    }

  }
}



let serv = new extendedServer(7777,"./server_plugins/")
let logger = serv.logger
serv.start()

logger.info("tictuc! elindult!")
