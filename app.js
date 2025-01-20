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

document.getElementById('contactFormPost').addEventListener('submit', async function(event) {
    event.preventDefault();
    const message = document.getElementById('message').value;
    const encodedMessage = new TextEncoder().encode(message);

    const encrypted = await window.crypto.subtle.encrypt(
        {
            name: "RSA-OAEP",
        },
        publicKey,
        encodedMessage
    );
    console.log("Encrypted message:", new Uint8Array(encrypted));

    const decrypted = await window.crypto.subtle.decrypt(
        {
            name: "RSA-OAEP",
        },
        privateKey,
        encrypted
    );

    const decodedMessage = new TextDecoder().decode(decrypted);
    console.log("Decrypted message:", decodedMessage );
});

