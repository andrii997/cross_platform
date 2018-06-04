/**
 * Created by akv on 11.08.17.
 */
var Coin = require("./coin"),
    uuid = require("node-uuid");

Object.values = Object.values || function(obj) {
    var resp = [];
    for (var p in obj) {
        resp.push(obj[p]);
    }
    return resp;
};

function CoinsList(data) {
    if (typeof data === "string") {
        data = JSON.parse(data);
    }

    if (!Array.isArray(data)) {
        throw new Error("Only coins array supported!");
    }

    this.__data = {};
    data.forEach(this.set, this);
}

function ensureCoinInstance(u) {
    return u instanceof Coin ? u : new Coin(u);
}

CoinsList.prototype = {
    get: function(id) {
        return this.__data[id.toLowerCase()];
    },
    list: function() {
        return Object.values(this.__data);
    },
    set: function(coin) {
        coin = ensureCoinInstance(coin);
        return this.__data[coin.id.toLowerCase()] = coin;
    },
    add: function(coin) {
        coin = ensureCoinInstance(coin);
        coin.id = uuid.v1();
        return this.set(coin);
    },
    replace: function(oldCoin, newCoin) {
        oldCoin = ensureCoinInstance(oldCoin);
        newCoin = ensureCoinInstance(newCoin);

        if (this.contains(oldCoin) && oldCoin.isSame(newCoin)) {
            this.remove(oldCoin);
            return this.set(newCoin);
        } else {
            throw new Error("You cannot replace. Specified coin does not exists or have different id.");
        }
    },
    remove: function(coin) {
        coin = ensureCoinInstance(coin);
        if(this.contains(coin)) {
            delete this.__data[coin.id];
        }
    },
    contains: function(coin) {
        coin = coin || {};

        // if coin is an id of coins
        if (typeof coin === "string") {
            coin = this.get(coin) || {};
        }

        return coin.id in this.__data;
    }
};

module.exports = CoinsList;