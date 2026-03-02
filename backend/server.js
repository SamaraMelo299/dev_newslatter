import express from "express";
import cors from "cors";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "subscribers.json");

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function readSubscribers() {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

async function saveSubscribers(subscribers) {
  await fs.writeFile(filePath, JSON.stringify(subscribers, null, 2), "utf-8");
}

app.get("/", (req, res) => {
  res.send("API da Dev Newsletter funcionando ✅");
});

app.get("/api/subscribers", async (req, res) => {
  try {
    const subscribers = await readSubscribers();
    return res.status(200).json({
      ok: true,
      data: subscribers
    });
  } catch (error) {
    console.error("Erro ao buscar inscritos:", error);

    return res.status(500).json({
      ok: false,
      message: "Erro ao buscar inscritos."
    });
  }
});

app.post("/api/subscribe", async (req, res) => {
  try {
    const name = req.body.name?.trim();
    const email = req.body.email?.trim().toLowerCase();

    if (!name || name.length < 2) {
      return res.status(400).json({
        ok: false,
        message: "Digite um nome válido."
      });
    }

    if (!email || !isValidEmail(email)) {
      return res.status(400).json({
        ok: false,
        message: "Digite um e-mail válido."
      });
    }

    const subscribers = await readSubscribers();

    const alreadyExists = subscribers.some((item) => item.email === email);

    if (alreadyExists) {
      return res.status(409).json({
        ok: false,
        message: "Este e-mail já está inscrito."
      });
    }

    const newSubscriber = {
      id: Date.now(),
      name,
      email,
      createdAt: new Date().toISOString()
    };

    subscribers.push(newSubscriber);
    await saveSubscribers(subscribers);

    return res.status(201).json({
      ok: true,
      message: "Inscrição realizada com sucesso.",
      data: newSubscriber
    });
  } catch (error) {
    console.error("Erro na rota /api/subscribe:", error);

    return res.status(500).json({
      ok: false,
      message: "Erro interno do servidor."
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});