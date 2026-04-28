import Product from '../models/productModel.js';
import {
  createOne,
  deleteAll,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from './hendlerFactory.js';

// Create Product -----------------------------------------------------------------------------------
export const createProduct = createOne(Product);

// Get All Products -----------------------------------------------------------------------------------
export const getAllProducts = getAll(Product);

// Get One Product -----------------------------------------------------------------------------------
export const getProduct = getOne(Product);

// Update Product -----------------------------------------------------------------------------------
export const updateProduct = updateOne(Product);

// Delete Product -----------------------------------------------------------------------------------
export const deleteProduct = deleteOne(Product);

// Delete All Products -----------------------------------------------------------------------------------
export const deleteAllProducts = deleteAll(Product);
