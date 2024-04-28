import express from "express";
import cors from "cors";
import router from "./router.js";
import cookieParser from "cookie-parser";


const app = express();

const port = 3000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(port, () => {
  console.log(`Serveur : http://localhost:${port}`);
});
