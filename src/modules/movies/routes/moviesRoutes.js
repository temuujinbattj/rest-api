import express from "express";

import {
  movieList,
  movieDetail,
  movieAdd,
  movieEdit,
  moviePatch,
  movieDelete,
} from "../controllers/controller.js";

const route = express.Router();

route.get("/", movieList);

route.get("/:id", movieDetail);

route.post("/:id", movieAdd);

route.put("/:id", movieEdit);

route.patch("/:id", moviePatch);

route.delete("/:id", movieDelete);

export { route };
