import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const MovieEditForm = ({ open, handleClose, movie, onSave }) => {
  const [editedMovie, setEditedMovie] = useState(movie);
  const handleSave = () => {
    onSave(editedMovie);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Editar Película</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          value={editedMovie.name}
          onChange={(e) => setEditedMovie({ ...editedMovie, name: e.target.value })}
        />
        <TextField
          label="Category"
          value={editedMovie.category}
          onChange={(e) => setEditedMovie({ ...editedMovie, category: e.target.value })}
        />
        <TextField
          label="Description"
          value={editedMovie.description}
          onChange={(e) => setEditedMovie({ ...editedMovie, description: e.target.value })}
        />
        <TextField
          label="URL Image"
          value={editedMovie.url}
          onChange={(e) => setEditedMovie({ ...editedMovie, url: e.target.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MovieEditForm;
