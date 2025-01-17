import fs from "fs";
import { readJSONFile, writeJSONFile } from "../../../utils/utils.js";

const movieList = (req, res) => {
  const movies = readJSONFile("movies");

  const { limit, search } = req.query;

  let result = [];

  if (limit) {
    for (let i = 0; i < limit; i++) {
      result.push(movies[i]);
    }
  }

  if (search) {
    result = movies.filter((movie) => movie.title.includes(search));
  }

  if (!result.length) {
    res.send(movies);
  }

  res.send(result);
};

const movieDetail = (req, res) => {
  const movies = readJSONFile("movies");
  const { id } = req.params;

  const movie = movies.find((movie) => movie.id === parseInt(id));

  res.send(movie);
};

const movieAdd = (req, res) => {
  const movie = req.body;

  const movies = readJSONFile("movies");

  movies.push(movie);

  writeJSONFile("movies", movies);

  res.send({ success: true, message: "movie added" });
};

const movieEdit = (req, res) => {
  const movies = readJSONFile("movies");

  const { id } = req.params;
  const movie = req.body;

  const movieIndex = movies.findIndex((movie) => movie.id === parseInt(id));

  movies[movieIndex] = movie;

  writeJSONFile("movies", movies);

  res.send({ success: true, message: "movie updated" });
};

const moviePatch = (req, res) => {
  const movies = readJSONFile("movies");

  const { id } = req.params;
  const movie = req.body;

  const targetMovie = movies.find((movie) => movie.id === parseInt(id));

  for (const key in movie) {
    if (targetMovie[key]) {
      targetMovie[key] = movie[key];
    }
  }

  writeJSONFile("movies", movies);

  res.send({ success: true, message: "movie updated" });
};

const movieDelete = (req, res) => {
  const { id } = req.params;

  const movies = readJSONFile("movies");

  const remainingMovies = movies.filter((movie) => movie.id !== Number(id));

  writeJSONFile("movies", remainingMovies);

  res.send({ success: true, message: "movie deleted" });
};

export { movieList, movieDetail, movieAdd, movieEdit, moviePatch, movieDelete };
