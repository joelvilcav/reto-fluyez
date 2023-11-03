import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import MovieEditForm from './MovieEditForm';
import ConfirmDialog from './ConfirmDialog';
import MovieCreationForm from './MovieCreationForm';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  '&.movies-cell': {
    width: '20%',
    minWidth: '100px',
  },
  '&.description-cell': {
    width: '40%',
    minWidth: '150px',
  },
  '&.url-cell': {
    width: '40%',
    minWidth: '150px',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const MoviesList = () => {
  const [movies, setMovies] = useState([]);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedMovie, setEditedMovie] = useState(null);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [movieToDelete, setMovieToDelete] = useState(null);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/api/movies')
      .then((response) => response.json())
      .then((data) => setMovies(data));
  }, []);

  const handleEditClick = (movie) => {
    setEditedMovie(movie);
    setIsEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setIsEditDialogOpen(false);
    setEditedMovie(null);
  };

  const handleSaveEditedMovie = async (editedMovieData) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/movies/${editedMovieData._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editedMovieData),
        }
      );

      if (!response.ok) {
        throw new Error('Error updating movie');
      }

      const updatedMovie = await response.json();

      setMovies((prevMovies) =>
        prevMovies.map((movie) =>
          movie._id === updatedMovie._id ? updatedMovie : movie
        )
      );

      setIsEditDialogOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteClick = (movie) => {
    setMovieToDelete(movie);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (movieToDelete) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/movies/${movieToDelete._id}`,
          {
            method: 'DELETE',
          }
        );

        if (response.ok) {
          setMovies((prevMovies) =>
            prevMovies.filter((movie) => movie._id !== movieToDelete._id)
          );
        } else {
          throw new Error('Error deleting the movie');
        }
      } catch (error) {
        console.error(error);
      }
    }
    setIsDeleteDialogOpen(false);
    setMovieToDelete(null);
  };

  const handleCreateClick = () => {
    setIsCreateDialogOpen(true);
  };

  const handleCreate = async (newMovieData) => {
    try {
        const response = await fetch('http://localhost:3000/api/movies', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newMovieData),
        });
    
        if (response.ok) {
          const newMovie = await response.json();
    
          setMovies((prevMovies) => [...prevMovies, newMovie]);
    
          setIsCreateDialogOpen(false);
        } else {
          throw new Error('Error al crear la película');
        }
      } catch (error) {
        console.error(error);
      }
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell className='movies-cell'>Movies</StyledTableCell>
              <StyledTableCell align='center'>Category</StyledTableCell>
              <StyledTableCell className='description-cell' align='center'>
                Description
              </StyledTableCell>
              <StyledTableCell className='url-cell' align='center'>
                URL Image
              </StyledTableCell>
              <StyledTableCell align='center'>Options</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movies.map((movie) => (
              <StyledTableRow key={movie.name}>
                <StyledTableCell component='th' scope='row'>
                  {movie.name}
                </StyledTableCell>
                <StyledTableCell align='center'>
                  {movie.category}
                </StyledTableCell>
                <StyledTableCell align='center'>
                  {movie.description}
                </StyledTableCell>
                <StyledTableCell align='center'>{movie.url}</StyledTableCell>
                <StyledTableCell align='center'>
                  <button onClick={() => handleEditClick(movie)}>
                    <EditIcon />
                  </button>
                  <button onClick={() => handleDeleteClick(movie)}>
                    <DeleteIcon />
                  </button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <button onClick={handleCreateClick}>Create Movie</button>

      {editedMovie && (
        <MovieEditForm
          open={isEditDialogOpen}
          handleClose={handleEditDialogClose}
          movie={editedMovie}
          onSave={handleSaveEditedMovie}
        />
      )}

      {movieToDelete && (
        <ConfirmDialog
          open={isDeleteDialogOpen}
          handleClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={handleConfirmDelete}
        />
      )}

      {isCreateDialogOpen && (
        <MovieCreationForm
          open={isCreateDialogOpen}
          handleClose={() => setIsCreateDialogOpen(false)}
          onCreate={handleCreate}
        />
      )}
    </div>
  );
};

export default MoviesList;
