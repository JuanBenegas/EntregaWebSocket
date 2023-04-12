import express from 'express'
import { engine } from 'express-handlebars'
import { resolve } from 'path'
import { Server } from 'socket.io'

void(async() => {
    try{
        const SERVER_PORT = 8080

        const app = express()
        app.use(express.json())
        app.use(express.urlencoded({extended:true}))

        const viewsPath = resolve('src/views')

        app.engine('handlebars', engine({
            layoutsDir: `${viewsPath}/layouts`,
            defaultLayout: `${viewsPath}/layouts/index.handlebars`
        }))
        app.set('view engine', 'handlebars')
        app.set('views', viewsPath)

        app.get("/", function(req, res){
            res.render('greetings' , {name: "Jose", title: "Mi primera pagina"})
        })

        app.get("/", async(req, res) => {
            
        })

        const httpServer = app.listen(SERVER_PORT, () => {
            console.log(`Conectado al server en el puerto: ${SERVER_PORT}`)
        })

        const socketServer = new Server(httpServer)

        socketServer.on('connection', socket => {
            console.log("Nuevo cliente conectado")
            socket.on('message', (data) => {
                console.log(data)
            })
        })
    }
    catch(e){
        console.log(e)
    }
})()