const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.json());

app.post('/webhook', async (req, res) => {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  
  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    res.status(200).send('OK');
  } catch (err) {
    res.status(500).send('Error');
  }
});

app.listen(process.env.PORT || 3000);