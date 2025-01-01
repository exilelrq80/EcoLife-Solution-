const express = require('express');
const crypto = require('crypto');
const app = express();
const port = 3000;

app.use(express.json());

const privateKey = `-----BEGIN PRIVATE KEY-----
...Your private key here...
-----END PRIVATE KEY-----`;

app.post('/decrypt', (req, res) => {
    const encryptedMessage = req.body.encryptedMessage;
    const buffer = Buffer.from(encryptedMessage, 'base64');

    // فك تشفير الرسالة باستخدام المفتاح الخاص
    crypto.privateDecrypt(privateKey, buffer, (err, decrypted) => {
        if (err) {
            return res.status(500).send('Error decrypting message');
        }

        // إعادة الرسالة المفكوك تشفيرها
        const decryptedMessage = decrypted.toString('utf-8');
        res.json({ decryptedMessage });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
