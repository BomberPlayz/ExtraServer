local com = require("component")
if com.isAvailable("chat_box") == false then
    print("component not found: chat_box")
    os.exit()
end
if com.isAvailable("modem") == false then
    print("component not found: modem")
    os.exit()
end
if com.isAvailable("internet") == false then
    print("component not found: internet")
    os.exit()
end
if com.isAvailable("ElnProbe") == false then
    print("component not found: ElnProbe")
    os.exit()
end
local chat = com.chat_box
local modem = com.modem
local eln = com.ElnProbe
local internet = require("internet")
local event = require("event")
local thread = require("thread")
local ver = "1.0.0"
local pop = 1010
local url = "http://win.crackpixel.hu:1026"
local server = "LL_Dev"
chat.setName("Bapp")
--chat.say("Loading version: "..ver)
local admins = {[1] = "Bagi_Adam"}

--chat.say("Loading chat man...")
function say(msg, data)
    if data == "info" then
        chat.say("§3[Info] "..msg)
    end
    if data == "warn" then
        chat.say("§6[Warn] "..msg)
    end
    if data == "error" then
        chat.say("§4[ERROR] "..msg)
    end
end

--say("Loading functions...", "info")

function cont(table, data)
    for _, value in pairs(table) do
        if value == data then
            return true
        end
    end
    return false
end

function mysplit (inputstr, sep)
    if sep == nil then
            sep = "%s"
    end
    local t={}
    for str in string.gmatch(inputstr, "([^"..sep.."]+)") do
            table.insert(t, str)
    end
    return t
end

--say("Loading system....","info")

local started = false
local power = "off"
local gens = "off"
local grid = "off"
local start = "off"
local stop = "on"
while true do
    if started == false then
        internet.request(url.."/api?server="..server.."&mode=genServer")
        say("Panel aviable at: "..url.."/?server="..server,"info") 
        started = true
    end
    local data = ""
    for chunk in internet.request(url.."/api?server="..server.."&mode=getPower") do
        data = data..chunk
    end
    if data == "on" then
        eln.wirelessSet("bapp_on",1)
        if power == "off" then
            say("Turbines mode changed to on","info")
            power = "on"
        end
    end
    if data == "off" then
        eln.wirelessSet("bapp_on",0)
        if power == "on" then
            say("Turbines mode changed to off","info")
            power = "off"
        end
    end
    if data == "err_server_not_exists" then
        eln.wirelessSet("bapp_stop",1)
        eln.wirelessSet("bapp_on",0)
    end
    local datab = ""
    for chunk in internet.request(url.."/api?server="..server.."&mode=getGens") do
        datab = datab..chunk
    end
    if datab == "on" then
        eln.wirelessSet("bapp_gens",1)
        if gens == "off" then
            say("Gens mode changed to on","info")
            gens = "on"
        end
    end
    if datab == "off" then
        eln.wirelessSet("bapp_gens",0)
        if gens == "on" then
            say("Gens mode changed to off","info")
            gens = "off"
        end
    end
    if data == "err_server_not_exists" then
        eln.wirelessSet("bapp_gens",0)
    end
    local datac = ""
    for chunk in internet.request(url.."/api?server="..server.."&mode=getGrid") do
        datac = datac..chunk
    end
    if datac == "on" then
        eln.wirelessSet("bapp_grid",1)
        if grid == "off" then
            say("Grid mode changed to on","info")
            grid = "on"
        end
    end
    if datac == "off" then
        eln.wirelessSet("bapp_grid",0)
        if grid == "on" then
            say("Grid mode changed to off","info")
            grid = "off"
        end
    end
    if data == "err_server_not_exists" then
        eln.wirelessSet("bapp_grid",0)
    end
    local datad = ""
    for chunk in internet.request(url.."/api?server="..server.."&mode=getStarter") do
        datad = datad..chunk
    end
    if datad == "on" then
        eln.wirelessSet("bapp_start",1)
        if start == "off" then
            say("Starter mode changed to on","info")
            start = "on"
        end
    end
    if datad == "off" then
        eln.wirelessSet("bapp_start",0)
        if start == "on" then
            say("Starter mode changed to off","info")
            start = "off"
        end
    end
    if datad == "err_server_not_exists" then
        eln.wirelessSet("bapp_start",0)
    end
    local datae = ""
    for chunk in internet.request(url.."/api?server="..server.."&mode=getStop") do
        datae = datae..chunk
    end
    if datae == "on" then
        eln.wirelessSet("bapp_stop",1)
        if stop == "off" then
            say("Stop mode changed to on","info")
            stop = "on"
        end
    end
    if datae == "off" then
        eln.wirelessSet("bapp_stop",0)
        if stop == "on" then
            say("Stop mode changed to off","info")
            stop = "off"
        end
    end
    if datae == "err_server_not_exists" then
        eln.wirelessSet("bapp_stop",1)
    end
    internet.request(url.."/api?server="..server.."&mode=setTorta&value="..eln.wirelessGet("bapp_tor"))
    internet.request(url.."/api?server="..server.."&mode=setSpeed&value="..eln.wirelessGet("bapp_speed"))
    internet.request(url.."/api?server="..server.."&mode=setVolt&value="..eln.wirelessGet("bapp_volt"))
    os.sleep(0)
end