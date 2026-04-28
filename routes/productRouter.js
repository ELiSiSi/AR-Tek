import express from 'express';

import {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  deleteAllProducts,
} from '../controller/productController.js';


const router = express.Router();

router.route('/').post(createProduct).get(getAllProducts).delete(deleteAllProducts);

router.route('/:id').delete(deleteProduct).patch(updateProduct);

export default router;
