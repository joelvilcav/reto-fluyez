import Movie from '../models/Movie.js';

const getAll = (req, res) => {
  res.send('Desde api/movies');
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

const update = (req, res) => {
  res.send('Desde api/movies');
};

const deleteOne = (req, res) => {
  res.send('Desde api/movies');
};

export { getAll, create, update, deleteOne };
