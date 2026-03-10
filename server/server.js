const admin = require("firebase-admin");
const serviceAccount = require("./firebaseServiceKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

console.log("Firebase connected successfully");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("SafeLink Emergency System Backend Running");
});

  /* This is the post API */
app.post("/alert", async (req, res) => {
  try {
    const { name, message, status } = req.body;

    const db = admin.firestore();

    const docRef = await db.collection("emergency_alerts").add({
      name,
      message,
      status,
      createdAt: new Date()
    });

    res.json({
      success: true,
      id: docRef.id,
      message: "Emergency alert saved"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error saving alert"
    });
  }
});

    /* This is the get API foe dashboard */
app.get("/alerts", async (req, res) => {
  try {
    const db = admin.firestore();
    const snapshot = await db.collection("emergency_alerts").get();

    let alerts = [];

    snapshot.forEach(doc => {
      alerts.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.json(alerts);

  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching alerts");
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});