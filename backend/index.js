// express api server
//
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');
const speakeasy = require('speakeasy');

app.use(bodyParser.json());
app.use(cors());

app.use(express.static("public"))



app.get('/', (req, res) => {
    res.send('Hello World!')
    }
);

app.get('/api/v1/otp', async (req, res) => {
    const authorization = req.query.token;
    const key = req.query.key;
    const otp = req.query.otp;
    //verify the otp against the key using totp
    const verified = speakeasy.totp.verify({
        secret: key,
        encoding: 'base32',
        token: otp,
    });
    console.log(verified);
    if (verified) {
        const response = await fetch(`https://peerbrain.teckhawk.be/api/v1/me/otp?key=${key}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authorization}`,
            }
        });
        if (response.ok) {
            console.log('verified');
            res.send('verified');
        } else {
            console.log('failed sending ota');
            res.status(401).send('not verified');
        }

    } else {
        //if not verified, send a 401
        console.log('not verified');
        res.status(401).send('not verified');
    }
    });

app.get('/api/v1/token-test', async (req, res) => {
    const token = req.headers.token;
    const response = await fetch('https://peerbrain.teckhawk.be/api/v1/token-test', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
    });
    if (response.ok) {
        console.log(response.status)
        res.send(response.status)
    } else {
        console.log(response.status)
        res.send(response.status)
    }
});

app.use(cors({
    origin: ['https://mfa.peerbrain.net', '127.0.0.1', 'mfa.peerbrain.net', 'api.mfa.peerbrain.net']
}));

app.listen(port, () => {
    console.log(`PeerMFA listening at http://localhost:${port}`)
    }
);
