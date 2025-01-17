import express from "express";
import fs from "fs";
import { route as movieRoutes } from "./modules/movies/routes/moviesRoutes.js";
import { nanoid } from "nanoid";

const verifyKey = (req, res, next) => {
  const { moviekey } = req.headers;

  const key = JSON.parse(fs.readFileSync("./key.txt"));

  if (moviekey !== key) {
    return res.send({ ok: false, message: "Invalid Key" });
  }

  next();
};

const app = express();

app.use(express.json());

app.use(verifyKey);

app.use("/movies", movieRoutes);

app.get("/keyRequest", (req, res) => {
  const key = nanoid();

  fs.writeFileSync("./key.txt", JSON.stringify(key));

  res.send({ key });
});

app.get("/", (req, res) => {
  //html info page
  const html = fs.readFileSync("./index.html");

  res.setHeader("Content-type", "text/html");
  res.send(html);
});

export { app };
