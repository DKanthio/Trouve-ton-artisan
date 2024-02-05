const express = require('express');
const MailDev = require('maildev');

const app = express();
const maildev = new MailDev({
  disableWeb: true // Désactive l'interface Web MailDev
});

// Écoute le serveur MailDev sur le port 1080
maildev.listen(function(err) {
  if (err) {
    console.error('Erreur lors de l\'écoute de MailDev:', err);
  } else {
    console.log('MailDev est en écoute sur le port 1080!');
  }
});

// Middleware pour ajouter les en-têtes CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // Permettre toutes les origines (à ajuster en fonction de vos besoins)
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Autres routes et configurations de mon application Express...

const port = 1025;
app.listen(port, () => {
  console.log(`Le serveur est démarré sur le port ${port}`);
});
