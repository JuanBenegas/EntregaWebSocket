import fs from "fs"

class ProductManager {
    idAuto = 1
    #products = []

    constructor() {
        this.path = './src/utils/products.json'
        this.cartPath = './src/utils/carts.json'
        this.productFile = fs.readFileSync(this.path, "utf-8")
        this.cart = fs.readFileSync(this.cartPath, "utf-8")
        this.prodList = JSON.parse(this.productFile)
    }

    

    async getProduct(limit) {
        if(!limit){
            try {
                let products = []
                const productFile = await fs.promises.readFile(this.path, "utf-8")
                if (productFile) {
                    // const fileData = await fs.promises.readFile(this.path, 'utf-8')
                    products = JSON.parse(productFile)
                }
                return products
            } catch (e) {
                console.log('Error en getProducts:', e)
                throw e
            }
        }

        if(limit > 0){
            try {
                let products = []
                let productsLimit = []
                if (fs.existsSync(this.path)) {
                    const fileData = await fs.promises.readFile(this.path, 'utf-8')
                    products = JSON.parse(fileData)
                    for (let i = 0; i < limit; i++){
                        productsLimit.push(products[i])
                    }
                }
                return productsLimit
            }
            catch{
                throw new Error("ERROR EN LIMITPRODUCS")
            }
        }
    }

    async addProductFile(prodRecibido){
        try{
        let prodsList = JSON.parse(this.productFile)
        if(prodsList.length > 0){
            const ultimoProducto = prodsList[prodsList.length - 1]
            this.idAuto = ultimoProducto.id + 1
        }
        
        prodsList.push({id: this.idAuto, ...prodRecibido})

        fs.writeFileSync(this.path, JSON.stringify(prodsList, null, 2))
        return 'PRODUCTO AÑADIDO CORRECTAMENTE'
        }
        catch(error){
            throw new Error(`---->Algo salio mal en addProdcutFile<---- \n ${error}`)
        }
    }

    async getProductById(id) {
        try {
            const fileData = await fs.promises.readFile(this.path, 'utf-8')
            let productosJson = JSON.parse(fileData)
            let productoEncontrado = productosJson.find(p => p.id === id)
            if (productoEncontrado) {
                return productoEncontrado
            }
            else {
                return { error: "No existe tal producto" }
            }
        }
        catch {
            throw new Error("ERROR EN PRODUCTBYID")
        }
    }

    async changeProduct(prodId, prod){
        try{
            let prodsList = JSON.parse(this.productFile)
            let prodEncontrado = prodsList.find(p => p.id === prodId)
            prodEncontrado = prod
            prodsList.splice((prodId - 1), 1)
            prodEncontrado.id = prodId
            prodsList.push(prodEncontrado)
            fs.writeFileSync(this.path, JSON.stringify(prodsList, null, 2))
        }
        catch{
            throw new Error("Error al cambiar el producto")
        }
    }

    async deleteProduct(prodId){
        let prodsList = JSON.parse(this.productFile)
        let prodEncontrado = prodsList.find(p => p.id === prodId)
        if(prodEncontrado){
            let newProdList = prodsList.filter(p => p.id !== prodEncontrado.id)
            fs.writeFileSync(this.path, JSON.stringify(newProdList, null, 2))
        }
    }

    async createCart(){
        let cartList = await JSON.parse(this.cart)
        let cart = {id: (cartList.length + 1), products: []}
        cartList.push(cart)
        fs.writeFileSync(this.cartPath, JSON.stringify(cartList, null, 2))
    }

    async getCart(cartId, cart){
        let cartList = await JSON.parse(this.cart)
        let cartEncontrado = cartList.find(p => p.id === cartId)
        cart = cartEncontrado.products
        return cart
    }

    async addProductToCart(cartId, prodId, prodsInCart){
        let quantity = 0
        let position = 0
        let exist = false
        let cartList = await JSON.parse(this.cart)
        let prodsList = JSON.parse(this.productFile)
        let cartEncontrado = cartList.find(p => p.id === cartId)
        let prodEncontrado = prodsList.find(p => p.id === prodId)

        for(let i = 0; i < cartEncontrado.products.length; i++){
            
            if(cartEncontrado.products[i].id === prodId){
                exist = true
                position = i
            }
        }
        if(exist){
            cartEncontrado.products[position].quantity += 1
            console.log(cartEncontrado.products[position].quantity)
        }else{
            cartEncontrado.products.push({id: prodId, quantity: quantity + 1})
        }
        fs.writeFileSync(this.cartPath, JSON.stringify(cartList, null, 2))
        

        // if(cartEncontrado.products.id){
        //     if(cartEncontrado.products[0].id === prodId){
        //         cartEncontrado.products.id++
        //         fs.writeFileSync(this.cartPath, JSON.stringify(cartList, null, 2))
        //         console.log("Entramos al segundo if")
        //     }else{
        //         cartEncontrado.products.push({id: prodEncontrado.id, quantity: (cartEncontrado.products.id + 1)})
        //         // console.log(cartEncontrado)
        //         fs.writeFileSync(this.cartPath, JSON.stringify(cartList, null, 2))
        //     }
            
        // }else{
        //     cartEncontrado.products.push({id: prodEncontrado.id, quantity: (quantity + 1)})
        // console.log(cartEncontrado)
        // fs.writeFileSync(this.cartPath, JSON.stringify(cartList, null, 2))
        // }
    }
}

export default ProductManager