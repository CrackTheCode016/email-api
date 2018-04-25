const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var request = require("request");


const app = express();

app.use(bodyParser.json());
var corsOptions = {
  orgin: 'http://localhost:4200',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.route('/email-signup').post((req, res) => {
  res.status(201).send(req.body);
    addContact(req.body.email);
});

function addContact(email) {
    var options = { method: 'POST',
        url: 'https://api.sendinblue.com/v3/contacts',
        headers: {
            "api-key": "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"
        },
        body:
            { listIds: [ 2 ],
                email: email,
                emailBlacklisted: 'false',
                smsBlacklisted: 'false',
                updateEnabled: 'false' },
        json: true };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

    });
}


app.listen(process.env.PORT || 8000, () => {
  console.log('server started');
});
