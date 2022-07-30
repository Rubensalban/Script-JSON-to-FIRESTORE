const admin = require('./node_modules/firebase-admin');
const serviceAccount = require("./service_key.json");

const data = require("./files/morceaux.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://xxxxxxx.firebaseio.com"
});

data && Object.keys(data).forEach(key => {
    const nestedContent = data[key];

    if (typeof nestedContent === "object") {
        Object.keys(nestedContent).forEach(docTitle => {
            admin.firestore()
                .collection(key)
                .doc(docTitle)
                .set(nestedContent[docTitle])
                .then((res) => {
                    console.log("Document écrit avec succès !");
                })
                .catch((error) => {
                    console.error("Erreur: ", error);
                });
        });
    }
});