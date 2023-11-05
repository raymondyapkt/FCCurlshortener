require('dotenv').config();
const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3000;
const app = express();
let bodyParser = require('body-parser')
let dns  = require('dns')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));
app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

// ####################

const { promisify } = require('util');
const dnsLookup = promisify(dns.lookup);
let uidN = 0;
let exlist = {};

app.route("/api/shorturl").get((req, res) => {
  const url = req.body.url;
  res.json({url:url});
}).post(async (req, res) => {
  try {
    const { hostname } = new URL(req.body.url);
    // Perform DNS lookup
    const { address, family } = await dnsLookup(hostname);
    console.log(`The IP address is ${address} and the IP version is ${family}`);
    urlN ++ ;
    sUrlJson[urlN] =  req.body.url;
    console.log(sUrlJson);
    console.log(sUrlJson[urlN]);
    res.json({ original_url: req.body.url, short_url: urlN });
  } catch (e) {
    // console.error(e);
    res.json({ error: 'invalid url' });
  }
});

app.get("/api/shorturl/:urlN", function (req, res) {
  var { urlN } = req.params
  console.log(sUrlJson[urlN]);
  res.redirect(sUrlJson[urlN])

});

// ####################
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
