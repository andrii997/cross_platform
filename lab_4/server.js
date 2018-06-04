var express = require("express");
var bodyParser = require('body-parser');
var mongodb = require("mongodb");


var app = express();
var db;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var coins = [
    {
        "id": "20CD6BE6-E533-FFA4-2DFB-D0AF3D7F64BB",
        "fullName": "Bitcoin",
        "email": "erat@adipiscingligulaAenean.net",
        "birthday": "1986-03-27T10:29:15-08:00",
        "profession": "8104.42",
        "address": "Ap #456-3906 Dui. Ave",
        "country": "Tanzania",
        "shortInfo": "1",
        "fullInfo": "fermentum fermentum arcu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Phasellus ornare. Fusce mollis. Duis sit amet diam eu dolor egestas rhoncus. Proin nisl sem, consequat nec, mollis vitae, posuere at, velit. Cras lorem lorem, luctus ut, pellentesque eget, dictum placerat,"
    },
    {
        "id": "778A57F2-95A2-5C6C-D012-AA89AE56D69E",
        "fullName": "Ethereum",
        "email": "ligula@gravidaPraesenteu.co.uk",
        "birthday": "1982-03-14T16:13:47-08:00",
        "profession": "540",
        "address": "2025 Magnis Rd.",
        "country": "Monaco",
        "shortInfo": "2",
        "fullInfo": "Cras vehicula aliquet libero. Integer in magna. Phasellus dolor elit, pellentesque a, facilisis non, bibendum sed, est. Nunc laoreet lectus quis massa. Mauris vestibulum, neque sed dictum eleifend, nunc risus varius orci, in consequat enim diam vel arcu. Curabitur ut"
    },
    {
        "id": "313ABDBD-4396-5A42-32B9-7B86A256408C",
        "fullName": "Ripple",
        "email": "mauris@litoratorquent.ca",
        "birthday": "1992-05-07T00:04:12-07:00",
        "profession": "0.80",
        "address": "1653 Dolor Rd.",
        "country": "Russian Federation",
        "shortInfo": "3",
        "fullInfo": "consectetuer, cursus et, magna. Praesent interdum ligula eu enim. Etiam imperdiet dictum magna. Ut tincidunt orci quis lectus. Nullam suscipit, est ac facilisis facilisis, magna tellus faucibus leo, in lobortis tellus justo sit amet nulla. Donec non justo. Proin non massa non ante bibendum ullamcorper. Duis cursus, diam at pretium"
    },
    {
        "id": "0E47B463-F9EB-B099-DF83-A8D2DF386381",
        "fullName": "Litecoin",
        "email": "sed.pede.nec@fermentum.org",
        "birthday": "1981-07-09T21:06:35-07:00",
        "profession": "142.44",
        "address": "Ap #948-617 Tortor St.",
        "country": "Namibia",
        "shortInfo": "4",
        "fullInfo": "erat. Etiam vestibulum massa rutrum magna. Cras convallis convallis dolor. Quisque tincidunt pede ac urna. Ut tincidunt vehicula risus. Nulla eget metus eu erat semper rutrum. Fusce dolor quam, elementum at, egestas a, scelerisque sed, sapien. Nunc pulvinar arcu et pede. Nunc sed"
    },
    {
        "id": "27135F38-39C7-2936-BB53-5B414F957F4C",
        "fullName": "Bitcoin Cash",
        "email": "nec.orci@semelitpharetra.net",
        "birthday": "1998-02-14T07:39:48-08:00",
        "profession": "770.757",
        "address": "Ap #803-938 Iaculis Av.",
        "country": "Guatemala",
        "shortInfo": "5",
        "fullInfo": "orci. Ut sagittis lobortis mauris. Suspendisse aliquet molestie tellus. Aenean egestas hendrerit neque. In ornare sagittis felis. Donec tempor, est ac mattis semper, dui lectus rutrum urna, nec luctus felis purus ac tellus. Suspendisse sed dolor. Fusce mi lorem, vehicula et, rutrum eu, ultrices sit amet,"
    },
    {
        "id": "31932307-63DC-A669-A9CF-74231F85809E",
        "fullName": "EOS",
        "email": "mattis.Integer.eu@laciniaat.com",
        "birthday": "1983-08-31T00:00:50-07:00",
        "profession": "8.12",
        "address": "3056 Sollicitudin Rd.",
        "country": "Qatar",
        "shortInfo": "6",
        "fullInfo": "mollis nec, cursus a, enim. Suspendisse aliquet, sem ut cursus luctus, ipsum leo elementum sem, vitae aliquam eros turpis non enim. Mauris quis turpis vitae purus gravida sagittis. Duis gravida. Praesent eu nulla at sem molestie sodales. Mauris blandit enim consequat purus. Maecenas"
    },
    {
        "id": "29E67D55-02FE-F988-1422-96E628D1C5E8",
        "fullName": "Cardano",
        "email": "senectus.et.netus@auguescelerisque.org",
        "birthday": "1983-04-17T00:47:47-08:00",
        "profession": "0.24",
        "address": "9586 Suspendisse St.",
        "country": "Comoros",
        "shortInfo": "7",
        "fullInfo": "Morbi metus. Vivamus euismod urna. Nullam lobortis quam a felis ullamcorper viverra. Maecenas iaculis aliquet diam. Sed diam lorem, auctor quis, tristique ac, eleifend vitae, erat. Vivamus nisi. Mauris nulla. Integer urna. Vivamus molestie dapibus ligula. Aliquam erat volutpat. Nulla dignissim. Maecenas ornare egestas"
    },
    {
        "id": "F9F5F534-8C59-F8EA-AEE9-60A12F18BE0F",
        "fullName": "Stellar",
        "email": "ante.Vivamus@pellentesqueegetdictum.com",
        "birthday": "1997-05-13T13:16:29-07:00",
        "profession": "0.28",
        "address": "Ap #472-7690 Mus. St.",
        "country": "Belgium",
        "shortInfo": "8",
        "fullInfo": "gravida molestie arcu. Sed eu nibh vulputate mauris sagittis placerat. Cras dictum ultricies ligula. Nullam enim. Sed nulla ante, iaculis nec, eleifend non, dapibus rutrum, justo. Praesent luctus. Curabitur egestas nunc sed libero. Proin sed turpis nec mauris blandit mattis. Cras eget nisi dictum augue malesuada malesuada. Integer id"
    },
    {
        "id": "99580D67-3A3F-F763-029C-29E9DAF15CF3",
        "fullName": "IOTA",
        "email": "vehicula.Pellentesque.tincidunt@cubiliaCurae.co.uk",
        "birthday": "1999-02-18T11:13:50-08:00",
        "profession": "1.59",
        "address": "P.O. Box 322, 8978 Ligula. Rd.",
        "country": "Peru",
        "shortInfo": "9",
        "fullInfo": "vulputate eu, odio. Phasellus at augue id ante dictum cursus. Nunc mauris elit, dictum eu, eleifend nec, malesuada ut, sem. Nulla interdum. Curabitur dictum. Phasellus in felis. Nulla tempor augue ac ipsum. Phasellus vitae mauris sit amet lorem semper auctor. Mauris vel turpis. Aliquam adipiscing lobortis risus."
    }
];

app.get("/", function (req, res) {
   res.send("Start API")
});

app.get('/coins', function (req, res) {
   res.send(coins);
});

app.get('/coins/:id', function (req, res) {
    console.log(req.params);
    var coin = coins.find(function (coin) {
       return coin.id === Number(req.params.id);
    });
    res.send(coin);
});

app.post('/coins', function (req, res) {
    var coin = {
        id: Date.now(),
        name: req.body.name
    };
    coins.push(coin);
   res.send(coin);
});

app.listen(3012, function () {
   console.log("API app started");
});