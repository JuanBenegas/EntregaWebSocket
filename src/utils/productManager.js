import fs from "fs"

class ProductManager {
    idAuto = 1
    #products = []

    constructor() {
        this.path = './src/utils/products.json'
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

    async getProductById(id) {
        try {
            // let productoEncontrado = {}
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
}

export default ProductManager