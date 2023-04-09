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
        res.status(503).json({ error: "Faltan campos por completar o pusiste 'false' en status" })
    }else{
        try{
            await manager.changeProduct(prodId, prodReciv)
        }
        catch{
            throw new Error("Algo salio mal en tu posteo")
        }
    res.status(200).send({status: "Success", message: "Producto modificado"})
}})

productsRouter.delete("/api/products/:prodId", async (req, res) => {
    let prodId = +req.params.prodId
    try{
        manager.deleteProduct(prodId)
        res.status(200).send({status: "Success", message: "Producto eliminado correctamente"})
    }
    catch{
        res.status(404).send({status: "Error", message: "Producto no encontrado"})
    }
})

productsRouter.post("/api/carts/", async (req, res) => {
    manager.createCart()
    res.status(200).send({status: "Success", message: "Carrito creado"})
})

productsRouter.get("/api/carts/:cartId", async (req, res) => {
    let cartId = +req.params.cartId
    let cart
    res.status(200).send(await manager.getCart(cartId, cart))
})

productsRouter.post("/api/carts/:cartId/product/:prodId", async (req, res) => {
    let cartId = +req.params.cartId
    let prodId = +req.params.prodId
    let prodsInCart
    await manager.addProductToCart(cartId, prodId, prodsInCart)
    res.status(200).send("Producto agregado")
})



export default productsRouter