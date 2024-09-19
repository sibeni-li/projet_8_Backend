// Imports
const express = require('express');
const Mailjet = require('node-mailjet');

// Create an Express application
const app = express();

//Connect to Mailjet API using environment variables for authentication
const mailjet = Mailjet.apiConnect(
    process.env.MJ_APIKEY_PUBLIC,
    process.env.MJ_APIKEY_PRIVATE,
    {
      config: {},
      options: {}
    } 
);

// Middleware to parse JSON request bodies
app.use(express.json());

//CORS middleware to allow cross-origin requests
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// POST route handler for sending emails
app.post('/send-email', (req, res) => {
    // Extract data from request body
    const { name, nameSociety, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
        return res.status(400).send('Données manquantes');
    }

    // Prepare and send email using Mailjet
    const request = mailjet.post('send', { version: 'v3.1' }).request({
        Messages: [
            {
                From: {
                    Email: process.env.SENDEREMAIL,
                    Name: "Lisa Sibeni",
                },
                To: [
                    {
                        Email: process.env.RECEIPTEMAIL,
                        Name: "Lisa Sibeni",
                    },
                ],
                Subject: `Nouveau message de ${name}`,
                TextPart: `Nom: ${name}\nSociété: ${nameSociety}\nEmail: ${email}\nMessage: ${message}`,
            },
        ],
    });
    // Handle the response from Mailjet
    request
    .then((result) => {
        console.log(result.body);
        res.status(200).json({ message : 'Email envoyé avec succès!'});
    })
        .catch((err) => {
            console.error(err.statusCode);
            res.status(500).json({message : 'Erreur lors de l\'envoi de l\'email.'});
        });
});

// Export the Express application
module.exports = app;
