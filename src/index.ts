
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import loginRoutes from "./login.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({
    mensaje: "API Login funcionando correctamente"
  });
});

// Rutas del login
app.use("/api", loginRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor funcionando en puerto ${PORT}`);
});