import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const ConfirmDialog = ({ open, handleClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <div>Are you sure?</div>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Cancel
        </Button>
        <Button onClick={onConfirm} color='primary'>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
