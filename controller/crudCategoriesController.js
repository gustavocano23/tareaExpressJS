import { render } from "pug";
import connection from "../database/connection.js"

export const readCategories = (req, resp) => {
    let query = 'SELECT * FROM CATEGORIES';
    connection.query(query,(error, result) => {
        if (error) throw error
        console.log("Se trajo la informacion de la tabla de categorias")

        resp.render('categoria', {
            "infoCategories": result
        })
    })

}

export const insertCategory = (req, resp) => {
    
    const {categoryName, description} = req.body;

    if (!categoryName || !description) {
        resp.render('categoria', {
            "msg": "Debe de llenar todos los campos o no hay datos que mostrar"
        })
        return;
    }
    
    let query = 'INSERT INTO CATEGORIES(CATEGORY_NAME,CATEGORY_DESCRIPTION) VALUES (?, ?)'
    connection.query(query, [categoryName, description],(error, result)   => {
        if (error) return render('categoria', {"msg":"Error al insertar en la base de datos"})
        console.log("se ha registrado correctamente")
    });

    //Redirigir a la pagina de categoria
    resp.redirect('/categoria')
}



export const updateCategory = (req, resp) => {
    if (req.method == "GET") {
        let query = 'SELECT * FROM CATEGORIES WHERE CATEGORY_ID = ?'
        connection.query(query, [req.params.uid], (error, resultOfCategoryId) => {
            if (error) throw error
            
            query = 'SELECT * FROM CATEGORIES';
            connection.query(query, (error,resultOfAllCategories) => {
                if (error) throw error;
                resp.render('categoria', {
                    "category": resultOfCategoryId, 
                    "infoCategories":resultOfAllCategories,
                })
            })
            
        })
    } else if (req.method == "POST") {
        const {categoryName, description} = req.body;

        if (!categoryName || !description) {
            resp.render('categoria', {
                "msg": "Debe de llenar todos los campos o no hay datos que mostrar"
            })
            return;
        }
        
        let query = 'UPDATE CATEGORIES SET CATEGORY_NAME = ?, CATEGORY_DESCRIPTION=? WHERE CATEGORY_ID = ?';
        connection.query(query, [categoryName, description, req.params.uid], (error, result) => {
            if(error) {return render('categoria', {"msg":"Error al actualizar la base de datos"})};
            console.log("Se actualizo la categoria")
        
        })
        resp.redirect('/categoria')
    }

}

export const deleteCategory = (req, resp) => {
    let query = 'DELETE FROM CATEGORIES WHERE CATEGORY_ID = ?'

    connection.query(query, [req.params.uid], error => {
        if (error) throw error
        console.log("Se borro la categoria")
    })
    
    resp.redirect('/categoria')
}

export const ifIdCategoryExists = (req, resp, next) => {
    let query = 'SELECT * FROM CATEGORIES WHERE CATEGORY_ID = ?'
    connection.query(query, [req.params.uid], (error, resultId) => {
        if (error) throw error
        console.log(resultId)
        if(!resultId.length) return resp.status(400).send('No existe ese id en la base de datos')
        next()
    })

}