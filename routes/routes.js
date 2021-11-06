import express from "express";
import {  readCategories,insertCategory, updateCategory, deleteCategory } from "../controller/crudCategoriesController.js";
import { readProducts, insertProduct, updateProduct, deleteProduct } from "../controller/crudProductsController.js";
const router = express.Router()

// Method GET PARA PRODUCTOS
router.get('/', readProducts)
router.get('/update/:uid',updateProduct)
router.get('/delete/:uid', deleteProduct)


//METHOD GET PARA CATEGORIAS
router.get('/categoria', readCategories)
router.get('/categoria/update/:uid',updateCategory)
router.get('/categoria/delete/:uid',deleteCategory )


//Method POST PARA PRODUCTOS
router.post('/', insertProduct)
router.post('/update/:uid', updateProduct)


//METHOD POST PARA PRODUCTOS
router.post('/categoria', insertCategory )
router.post('/categoria/update/:uid', updateCategory)



export default router