// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});




// Your Timestamp API endpoint
app.get('/api/:date?', (req, res) => {
  let dateInput = req.params.date;
  let date;

  // Case 1: No date provided
  if (!dateInput) {
    date = new Date();
  } 
  // Case 2: If input is a number (Unix timestamp in ms)
  else if (!isNaN(dateInput)) {
    date = new Date(parseInt(dateInput));
  } 
  // Case 3: Try parsing as a regular date string
  else {
    date = new Date(dateInput);
  }

  // If the date is invalid
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Return the date in both Unix and UTC format
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3003, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
