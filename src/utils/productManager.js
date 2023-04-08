import fs from "fs"

class ProductManager {
    idAuto = 1
    #products = []

    constructor() {
        this.path = './src/utils/products.json'
        this.productFile = fs.readFileSync(this.path, "utf-8")
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
    
}

export default ProductManager