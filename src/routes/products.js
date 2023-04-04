import { Router } from "express"
import ProductManager from "../utils/productManager.js"

const manager = new ProductManager()

const productsRouter = Router()

const jsonProds = './src/router/utils/products.json'

productsRouter.get("/api/products/", async (req, res) => {
    const limit = +req.query.limit
    const prod = await manager.getProduct(limit)
    res.send(prod)
})

productsRouter.get("/api/products/:prodId", async (req, res) => {
    const prodId = +req.params.prodId
    const productoId = await manager.getProductById(prodId)
    res.send(productoId)
})

productsRouter.post("/api/products/", async (req, res) =>{
    // const { title, description, code, price, status, stock, category, thumbnails } = req.body
    const products = []
    const prodReciv = req.body
    const { title, description, code, price, status, stock, category, thumbnails } = prodReciv
    if(!prodReciv.title || !prodReciv.description || !prodReciv.code || !prodReciv.price || !prodReciv.status || !prodReciv.stock || !prodReciv.category || !prodReciv.thumbnails){
        console.log("Falta completa un campo")
        res.status(404).json({ error: "Faltan campos por completar o pusiste 'false' en status" })
    }else{
        try{

        }
        catch{

        }
        products.push(prodReciv)
        res.status(201).json(prodReciv)
    }
})



export default productsRouter