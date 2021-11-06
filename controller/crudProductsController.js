
import connection from "../database/connection.js"

export const readProducts = (req, resp) => {

    // Traer la categorias de productos
    let query = 'SELECT * FROM CATEGORIES'
    connection.query(query, (error, categories) => {
        if (error) return('productos', {"msg":"Error al consultar a la base de datos"});
        query = 'SELECT * FROM PRODUCTS'
        connection.query(query, (error, results) => {
            if (error) return('productos', {"msg":"Error al consultar a la base de datos"});
            resp.render('productos', {
                "products": results,
                "categories":categories
            })
        })
    })
}

export const insertProduct = (req, resp) => {
    const {productName, price, productStock, category, description} = req.body

    if (!productName || !price || !productStock || !category || !description) {
        console.log("Debe de ingresar todos los campops")
        return resp.redirect('/')
    }

    let query = `INSERT INTO PRODUCTS 
                    (PRODUCT_NAME, PRODUCT_PRICE, PRODUCT_STOCK, CATEGORY_ID, PRODUCT_DESCRIPTION) 
                VALUES (?, ?, ?, ?, ?)
    `;
    connection.query(query, [productName, price, productStock, category, description], error => {
        if (error) return('productos', {"msg":"Error al consultar a la base de datos"})
        console.log("se guardaron los productos existasamente")
    })
    resp.redirect('/')
}

export const updateProduct = (req, resp) => {
    if (req.method === "GET") {
        let productId = req.params.uid;
        
        // Traer todas los campos de producto para la tabla a mostrar
        let query = 'SELECT * FROM PRODUCTS'
        connection.query(query, (error, resultProducts) => {
            if (error) return('productos', {"msg":"Error al consultar a la base de datos"});
            
            //Traer todas las categorias para el combo-box de categoria
            query = 'SELECT * FROM CATEGORIES'
            connection.query(query, (error, resultCategories) =>{
                if (error) return('productos', {"msg":"Error al consultar a la base de datos"});

                //Traer la informacion para los campos del formulario
                query = `SELECT * FROM PRODUCTS P 
                        INNER JOIN CATEGORIES C ON P.CATEGORY_ID = C.CATEGORY_ID
                        WHERE P.PRODUCT_ID = ?
                `;
                connection.query(query,[productId],(error,resultOfProductId) => {
                    if (error) return('productos', {"msg":"Error al consultar a la base de datos"});

                    resp.render('productos', {
                        "products":resultProducts,
                        "categories": resultCategories,
                        "product": resultOfProductId,
                    })
                })
            })
        })
    } else if (req.method === "POST") {
        let productId = req.params.uid;
        const {productName, price, productStock, category, description} = req.body

        if (!productName || !price || !productStock || !category || !description) {
            console.log("Debe de ingresar todos los campops")
            return resp.redirect('/')
        }

        let query = `
            UPDATE PRODUCTS SET PRODUCT_NAME = ?, PRODUCT_PRICE = ?, PRODUCT_STOCK = ?, CATEGORY_ID = ?, PRODUCT_DESCRIPTION = ?
            WHERE PRODUCT_ID = ?
        `;
        connection.query(query,[productName, price, productStock, category, description, productId], (error) => {
            if (error) return('productos', {"msg":"Error al consultar a la base de datos"});
            console.log("se actualizo el producto")
    
        })
        resp.redirect('/')
    }
}

export const deleteProduct = (req, resp) => {
    let productId = req.params.uid;
    let query = 'DELETE FROM PRODUCTS WHERE PRODUCT_ID = ?';
    connection.query(query,[productId], (error) => {
        if (error) return('productos', {"msg":"Error al consultar a la base de datos"})

        console.log("se borro el producto selecionado")
    })
    resp.redirect('/')

}

export const ifIdProductExists = (req, resp, next) => {
    let query  = 'SELECT * FROM PRODUCTS WHERE PRODUCT_ID = ?'
    connection.query(query,[req.params.uid] ,(error, resultId) => {
        if (error) return resp.redirect('/')
        if(!resultId.length) return resp.status(400).send('No existe ese id en la base de datos')
        next()
    
    })
    

}