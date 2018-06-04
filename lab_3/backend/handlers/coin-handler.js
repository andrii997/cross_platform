var CoinsList = require("../models/coins-list"),
    errors = require("../errors/coin"),
    coins;

function init(coinsJson) {
    coins = new CoinsList(coinsJson);

    return {
        add: add,
        update: update,
        get: get,
        del: del
    };
}

function add(req, res) {
    var coin = req.body;
    if (!coin) {
        var error = {
            message: "Please check arguments you sent to server. Request body is empty!"
        };
        res.status(401)
            .send(error);
    } else {
        coin = coins.add(coin);
        res.send(coin);
    }
}

function update(req, res) {
    var updatedCoin = req.body || {};
    var id = updatedCoin.id;
    if (!id) {
        var error = new errors.UpdateNotFound(id);
        return res.status(404)
            .send(error);
    } else {
        var old = coins.get(id);
        coins.replace(old, updatedCoin);
        res.status(200)
            .send(updatedCoin);
    }
}

function get(req, res) {
    var id = req.query.id, // /coin?id=<coin id>
        responseRes = null,
        status = 200;
    if (id) {
        responseRes = coins.get(id);
        if (!responseRes) {
            responseRes = new errors.NotFound(id);
            status = 404;
        }
    } else {
        responseRes = coins.list();
    }

    res.status(status)
        .send(responseRes);
}

function del(req, res) {
    var id = req.query.id;
    if (!id || !coins.contains(id)) {
        var error = new errors.NotFound(id);
        res.status(404)
            .send(error);
    } else {
        var u = coins.get(id);
        coins.remove(u);
        res.send(id);
    }
}

module.exports = init;