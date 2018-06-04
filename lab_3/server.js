var express = require("express"),
	nodeStatic = require("node-static"),
	file = new nodeStatic.Server("."),
	bodyParser = require("body-parser"),
	fs = require("fs"),
	app = express(),
	coinHandlerInit = require("./backend/handlers/coin-handler"),
	COINS_PATH = __dirname + "/resources/data.json",
	LISTEN_PORT = 8081;

app.use(bodyParser.json());

var coins = [];

fs.readFile(COINS_PATH, "utf8", function(err, coinsJsonStr) {
	coins = JSON.parse(coinsJsonStr);
	var coinHandler = coinHandlerInit(coins);
	app.post("/coin", coinHandler.add);

	app.put("/coin", coinHandler.update);

	app.get("/coin", coinHandler.get);

	app.delete("/coin", coinHandler.del);

	app.get("/countries", function(req, res) {
		var c = [];
		for (var i = 0; i < coins.length; i++) {
			if (c.indexOf(coins[i].country) === -1) {
				c.push(coins[i].country);
			}
		}

		res.send(c);
	});

	console.log("coins API is ready...");

});


app.get("/", function(req, res) {
	file.serve(req, res);
});

app.get("/sample", function(req, res) {
	res.send({
		data: JSON.stringify(req.query)
	});
});

app.post("/sample", function(req, res) {
	res.send({
		data: JSON.stringify(req.body)
	});
});

app.get("/ping", function(req, res) {
	var expect = req.query.expect,
		course = req.query.course;
	if (!expect) {
		res.status(401)
			.send({
				message: "Parameter 'expect' is required! It is a string value."
			});
	} else if (!course) {
		res.status(401)
			.send({
				message: "Provide 'course' parameter value to success"
			});
	} else if (course !== "frontend") {
			res.status(403)
				.send({
					message: "Parameter 'course' is invalid."
				});
	} else {
		res.send({
			message: expect,
			secret: course
		});
	}
});

app.get("/css*", function(req, res) {
	file.serve(req, res);
});
app.get("/js*", function(req, res) {
	file.serve(req, res);
});
app.get("/node_modules*", function(req, res) {
	file.serve(req, res);
});

app.listen(LISTEN_PORT);
console.log("Listen port " + LISTEN_PORT);