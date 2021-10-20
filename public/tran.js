exports.run = (request, response) => {
var synaptic = require('synaptic');
  var net = new synaptic.Architect.Perceptron(1, 10, 7, 8, 4, 3, 2, 1)
var trainer = new synaptic.Trainer(net)

var trainingSet = [
  {
    input: ["yes"],
    output: ["igen"]
  },
  {
    input: ["no"],
    output: ["nem"]
  },
  {
    input: ["why"],
    output: ["miért"]
  },
  {
    input: ["so"],
    output: ["szóval"]
  },
  {
    input: ["idiot"],
    output: ["idióta"]
  },
  {
    input: ["why not"],
    output: ["miért ne"]
  },
  {
    input: ["nothing"],
    output: ["semmi"]
  }
]
//trainer.iterations = 10000;
console.log(trainer);
for (var i = 0; i < 1000; i++) {
  console.log( trainer.train(trainingSet,{
	iterations: 1000,
  error: 0.1,
  shuffle: true,
}));
}

  var url = require('url');
  var fs = require('fs');
  response.write(`<title>transtuc 2020</title> <meta charset="utf-8">`)
  var quka = url.parse(request.url, true).query;
  var fordi = JSON.parse(fs.readFileSync("./ford.json", "utf8"));
  //var fordi = [["dude", "DURDA"], ["bed", "rossz"], ["me", "én"], ["type", "ird be"], ["text", "szoveg"]]
  var back = net.activate(quka.ford)[0]


  response.end(back);

}
