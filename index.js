const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const MARVEL_API_URL = "https://lereacteur-marvel-api.herokuapp.com";
const API_KEY = process.env.API_KEY;

const PORT = process.env.PORT || 5000;

if (!API_KEY) {
  console.error("Erreur : API_KEY manquante dans le fichier .env");
  process.exit(1);
}

app.get("/", (req, res) => {
  res.send("Marvel Backend API");
});

app.get("/api/characters", async (req, res) => {
  try {
    const { limit = 100, skip = 0, name } = req.query;

    const response = await axios.get(`${MARVEL_API_URL}/characters`, {
      params: {
        apiKey: API_KEY,
        limit,
        skip,
        name,
      },
    });

    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.error("Erreur lors de la récupération des personnages :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des personnages." });
  }
});

app.get("/api/comics", async (req, res) => {
  try {
    const { limit = 100, skip = 0, title } = req.query;

    const response = await axios.get(`${MARVEL_API_URL}/comics`, {
      params: {
        apiKey: API_KEY,
        limit,
        skip,
        title,
      },
    });

    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.error("Erreur lors de la récupération des comics :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des comics." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
