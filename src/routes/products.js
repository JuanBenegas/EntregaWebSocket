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
    const prodReciv = req.body
    const { title, description, code, price, status, stock, category, thumbnails } = prodReciv
    if(!prodReciv.title || !prodReciv.description || !prodReciv.code || !prodReciv.price || !prodReciv.status || !prodReciv.stock || !prodReciv.category){
        console.log("Falta completa un campo")
        res.status(404).json({ error: "Faltan campos por completar o pusiste 'false' en status" })
    }else{
        try{
            await manager.addProductFile(prodReciv)
        }
        catch{
            throw new Error("Algo salio mal en tu posteo")
        }
        res.status(201).json(prodReciv)
    }
})

productsRouter.put("/api/products/:prodId", async (req, res) => {
    let prodId = +req.params.prodId
    let prodReciv = req.body
    if(!prodReciv.title || !prodReciv.description || !prodReciv.code || !prodReciv.price || !prodReciv.status || !prodReciv.stock || !prodReciv.category){
        console.log("Falta completa un campo")
        res.status(400).json({ error: "Faltan campos por completar o pusiste 'false' en status" })
    }else{
        try{
            await manager.changeProduct(prodId, prodReciv)
        }
        catch{
            throw new Error("Algo salio mal en tu posteo")
        }
    res.status(200).send({status: "Success", message: "Producto modificado"})
}})



export default productsRouter