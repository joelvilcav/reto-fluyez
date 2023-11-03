import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const MovieCreationForm = ({ open, handleClose, onCreate }) => {
  const [newMovie, setNewMovie] = useState({
    title: '',
    category: '',
    description: '',
    url: '',
  });

  const handleCreate = () => {
    onCreate(newMovie);
    handleClose();
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <div>Create a new movie</div>
      <TextField
        label='Name'
        value={newMovie.name}
        onChange={(e) => setNewMovie({ ...newMovie, name: e.target.value })}
      />
      <TextField
        label='Category'
        value={newMovie.category}
        onChange={(e) => setNewMovie({ ...newMovie, category: e.target.value })}
      />
      <TextField
        label='Description'
        value={newMovie.description}
        onChange={(e) =>
          setNewMovie({ ...newMovie, description: e.target.value })
        }
      />
      <TextField
        label='URL Img'
        value={newMovie.url}
        onChange={(e) => setNewMovie({ ...newMovie, url: e.target.value })}
      />
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Cancelar
        </Button>
        <Button onClick={handleCreate} color='primary'>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MovieCreationForm;
