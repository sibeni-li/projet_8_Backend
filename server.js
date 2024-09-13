const express = require('express');
const path = require('path');
const Mailjet = require('node-mailjet');

const app = express();
const port = 3000;

console.log(process.env);
const mailjet = Mailjet.apiConnect(
    process.env.MJ_APIKEY_PUBLIC,
    process.env.MJ_APIKEY_PRIVATE,
    {
      config: {},
      options: {}
    } 
);
// Middleware pour parser les données JSON
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.static(path.join(__dirname, '../frontend')));

// Route pour gérer la soumission du formulaire
app.post('/send-email', (req, res) => {
    const { name, nameSociety, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).send('Données manquantes');
    }

    // Configurer l'email à envoyer
    const request = mailjet.post('send', { version: 'v3.1' }).request({
        Messages: [
            {
                From: {
                    Email: "contact-portfolio@sibeni.li",
                    Name: `${name}`,
                },
                To: [
                    {
                        Email: "contact@sibeni.li",
                        Name: "Lisa Sibeni",
                    },
                ],
                Subject: `Nouveau message de ${name}`,
                TextPart: `Nom: ${name}\nSociété: ${nameSociety}\nEmail: ${email}\nMessage: ${message}`,
            },
        ],
    });
    // Envoyer l'email
    request
    .then((result) => {
        console.log(result.body);
        res.status(200).send('Email envoyé avec succès!');
    })
        .catch((err) => {
            console.error(err.statusCode);
            res.status(500).send('Erreur lors de l\'envoi de l\'email.');
        });
});

app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});