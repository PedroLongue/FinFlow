import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import router from "./routes/Router";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

app.use(router);

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
