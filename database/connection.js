import mysql from 'mysql2'

const connection = mysql.createConnection({
    host: 'localhost', 
    user: 'devuser', 
    password: '123ABcd.',
    database: 'tarea_productos'
})

connection.connect((error) => { 
    if (error) throw error
    console.log("Database connected")

})

export default connection;