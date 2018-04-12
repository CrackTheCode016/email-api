const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var request = require("request");


const app = express();

app.use(bodyParser.json());
var corsOptions = {
  orgin: 'http://example.com',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.route('/email-signup').post((req, res) => {
  MailChimpEmailSignup(req.body.email);
  res.status(201).send(req.body);
});

function MailChimpEmailSignup(email) {
  var options = { method: 'POST',
    url: 'https://us18.api.mailchimp.com/3.0/lists/3ee39b51df/members/',
    headers:
      { 'Postman-Token': '02c0221b-a726-4e75-8bda-6d5828e8eefb',
        'Cache-Control': 'no-cache',
        Authorization: 'Basic Y3J5cHRvY29uZmlybTphMzI1NmZmMTcyYTUyODg4NGNlM2JkZWY2N2I3MmRmMS11czE4',
        'Content-Type': 'application/json' },
    body: { email_address: email, status: 'subscribed' },
    json: true };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
  });
}


app.listen(8000, () => {
  console.log('server started');
});
