const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/decrypt', (req, res) => {
    const encryptedMessage = req.body.encryptedMessage;

    // هنا يتم فك التشفير باستخدام المفتاح الخاص
    // هذا مجرد مثال بسيط لفك التشفير

    const decryptedMessage = "تم فك التشفير: " + encryptedMessage; // يجب استخدام مكتبة لفك التشفير بشكل حقيقي

    res.json({ message: decryptedMessage });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
