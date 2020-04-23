// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get('/api/timestamp/:date_string?', function (req, res) {
  
  let letters = ['q','a','z','s','w','e','d','c','v','f','r','t','g','b','n','h','y','u','j','m','k','i','o','l','p'];
  
  let dateString = req.params.date_string;
  console.log(req.params.date_string)
  let temp1;
  if (dateString != undefined) {
  temp1 = dateString.split('-');
  }
  let dateString2 = new Date(dateString);

  let checkDate = String(dateString2)

  let isInvalid = ''
  if(dateString != undefined) {
  for (var i = 0; i < letters.length; i++) {
    if(letters[i] == temp1[0][0]) {
      isInvalid = "yes"
    }
  }
  }
    if (isInvalid == "yes"){
  return (res.json( {error : "Invalid Date" }))
}
  if (dateString == undefined) {
    return (res.json({'unix': Date.now(), 'utc': new Date().getTime()}))
  }
  if (temp1.length > 1 && parseInt(temp1[0]) != NaN) {
    return (res.json({'unix': dateString2.getTime(), 'utc': dateString2.toUTCString()}))
  }
  if (temp1.length == 1) {
    let dateNumber = parseInt(dateString)
    let dateString3 = new Date(dateNumber)
    let tempUnix = dateNumber / 1000;
    return (res.json({'unix': dateString3.getTime(), 'utc': dateString3.toUTCString()}))
  }

})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});