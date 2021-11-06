import mysql from 'mysql2'

const connection = mysql.createConnection({
    host: process.env.DB_HOST, 
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

connection.connect((error) => { 
    if (error) throw error
    console.log("Database connected")

})

export default connection;