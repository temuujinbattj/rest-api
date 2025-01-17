import express from "express";
import fs from "fs";
import { route as movieRoutes } from "./modules/movies/routes/moviesRoutes.js";

const app = express();

app.use(express.json());

app.use("/movies", movieRoutes);

app.get("/", (req, res) => {
  //html info page
  const html = fs.readFileSync("./index.html");

  res.setHeader("Content-type", "text/html");
  res.send(html);
});

export { app };
