import express from 'express'
import router from './routes/routes.js'
const app =  express()
const PORT = 3000



//Configurar el motor de plantillas
app.set('view engine', 'pug')

// Configuracion la carpeta publica
app.use(express.static('public'))

//Configuracion para los formulacrios
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// Configuracion para las rutas
app.use('/',router)

// Configuracion para el puerto donde se el servidor va escuchar
app.listen(PORT, _ => {
    console.log("El servido esta escuchando")
})