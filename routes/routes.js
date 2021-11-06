import express from "express";
import {  readCategories,insertCategory, updateCategory, deleteCategory, ifIdCategoryExists } from "../controller/crudCategoriesController.js";
import { readProducts, insertProduct, updateProduct, deleteProduct, ifIdProductExists} from "../controller/crudProductsController.js";
const router = express.Router()

// Method GET PARA PRODUCTOS
router.get('/', readProducts)
router.get('/update/:uid',ifIdProductExists,updateProduct)
router.get('/delete/:uid', ifIdProductExists ,deleteProduct)


//METHOD GET PARA CATEGORIAS
router.get('/categoria', readCategories)
router.get('/categoria/update/:uid',ifIdCategoryExists,updateCategory)
router.get('/categoria/delete/:uid',ifIdCategoryExists,deleteCategory )


//Method POST PARA PRODUCTOS
router.post('/', insertProduct)
router.post('/update/:uid', updateProduct)


//METHOD POST PARA PRODUCTOS
router.post('/categoria', insertCategory )
router.post('/categoria/update/:uid', updateCategory)



export default router