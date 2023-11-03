import express from 'express';
import {
  getAll,
  create,
  update,
  deleteOne,
} from '../controllers/movieController.js';

const router = express.Router();

router.get('/', getAll);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', deleteOne);

export default router;
