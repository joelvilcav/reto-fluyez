import Movie from '../models/Movie.js';

const getAll = async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
};

const create = async (req, res) => {
  const { name } = req.body;
  const movieFound = await Movie.findOne({ name });

  if (movieFound) {
    const error = new Error('That movie already exists');
    return res.status(400).json({ msg: error.message });
  }

  try {
    const movie = new Movie(req.body);
    const movieSaved = await movie.save();
    res.json(movieSaved);
  } catch (error) {
    console.log(error);
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const movie = await Movie.findById(id);

  if (!movie) {
    const error = new Error('Movie not found');
    return res.status(404).json({ msg: error.message });
  }

  movie.name = req.body.name || movie.name;
  movie.category = req.body.category || movie.category;
  movie.description = req.body.description || movie.description;
  movie.url = req.body.url || movie.url;

  try {
    const movieUpdated = await movie.save();
    return res.json(movieUpdated);
  } catch (error) {
    console.log(error);
  }
};

const deleteOne = async (req, res) => {
  const { id } = req.params;
  const movie = await Movie.findById(id);

  if (!movie) {
    const error = new Error('Movie not found');
    return res.status(404).json({ msg: error.message });
  }

  try {
    await movie.deleteOne();
    res.json({ msg: 'Movie deleted' });
  } catch (error) {
    console.log(error);
  }
};

export { getAll, create, update, deleteOne };
