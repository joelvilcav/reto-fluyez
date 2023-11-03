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
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const MoviesList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/movies')
      .then((response) => response.json())
      .then((data) => setMovies(data));
  }, []);

  return (
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
              <StyledTableCell align='center'>{movie.category}</StyledTableCell>
              <StyledTableCell align='center'>
                {movie.description}
              </StyledTableCell>
              <StyledTableCell align='center'>{movie.url}</StyledTableCell>
              <StyledTableCell align='center'>
                <button>
                  <EditIcon />
                </button>
                <button>
                  <DeleteIcon />
                </button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MoviesList;
