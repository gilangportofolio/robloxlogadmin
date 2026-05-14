const express = require('express');
const https = require('https');
const app = express();

app.use(express.json());

app.post('/webhook', async (req, res) => {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    const body = JSON.stringify(req.body);
    
    const url = new URL(webhookUrl);
    
    const options = {
        hostname: url.hostname,
        path: url.pathname,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(body)
        }
    };

    const request = https.request(options, (response) => {
        res.status(200).send('OK');
    });

    request.on('error', (err) => {
        res.status(500).send('Error');
    });

    request.write(body);
    request.end();
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Proxy server running!');
});