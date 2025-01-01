let privateKey, publicKey;

// Step 1: Generate RSA key pair
async function generateKeys() {
    const keyPair = await window.crypto.subtle.generateKey(
        {
            name: "RSA-OAEP",
            modulusLength: 2048,
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: "SHA-256",
        },
        true,
        ["encrypt", "decrypt"]
    );

    privateKey = keyPair.privateKey;
    publicKey = keyPair.publicKey;
    console.log("Keys generated successfully!");
}

generateKeys();

document.getElementById('encrypt-button').addEventListener('click', async () => {
    const message = document.getElementById('message').value;
    const encodedMessage = new TextEncoder().encode(message);

    const encrypted = await window.crypto.subtle.encrypt(
        {
            name: "RSA-OAEP",
        },
        publicKey,
        encodedMessage
    );

    const encryptedBase64 = btoa(String.fromCharCode(...new Uint8Array(encrypted)));
    document.getElementById('output').innerText = `Encrypted Message: ${encryptedBase64}`;
});

document.getElementById('decrypt-button').addEventListener('click', async () => {
    const encryptedBase64 = document.getElementById('output').innerText.replace("Encrypted Message: ", "");
    const encryptedBytes = Uint8Array.from(atob(encryptedBase64), c => c.charCodeAt(0));

    const decrypted = await window.crypto.subtle.decrypt(
        {
            name: "RSA-OAEP",
        },
        privateKey,
        encryptedBytes
    );

    const decodedMessage = new TextDecoder().decode(decrypted);
    document.getElementById('output').innerText = `Decrypted Message: ${decodedMessage}`;
});
// تعديل جزء التشفير ليشمل إرسال البيانات المشفرة عبر نموذج الاتصال
// Decrypt the message using the private key
document.getElementById('encrypt-button').addEventListener('click', async () => {
    const message = document.getElementById('message').value;
    const encodedMessage = new TextEncoder().encode(message);

    const encrypted = await window.crypto.subtle.encrypt(
        { name: "RSA-OAEP" },
        publicKey,
        encodedMessage
    );

    const encryptedBase64 = btoa(String.fromCharCode(...new Uint8Array(encrypted)));

    // إرسال البيانات المشفرة إلى الخادم عبر POST
    fetch('/decrypt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ encryptedMessage: encryptedBase64 })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Decrypted message:', data.decryptedMessage);
    });
});
