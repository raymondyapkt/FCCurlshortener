require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
let bodyParser = require('body-parser')
let dns  = require('dns')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Basic Configuration
const port = process.env.PORT || 3000;

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


app.route("/api/shorturl").get((req, res) => {
  const url = req.body.url;
  res.json({url:url});
}).post((req, res) => {
  console.log(req.body.url)
  
  try{ 
    var {hostname} = new URL(req.body.url)
    console.log(hostname)
  } catch (e) {
    res.json({ error: 'invalid url' })
    console.error(e); }

   // if ( hostname.substring(0, 3) === "joh" ) {
   //   res.json({ error: 'invalid url' })
   // }    

   dns.lookup(hostname, (err, address, family) => {
    if (err) {
      res.json({ error: 'invalid url' })
    } else {
      console.log(`The IP address is ${address} and the IP version is ${family}`);
    }
});


    
  res.json({original_url:req.body.url,short_url:1})

});


// ####################
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
