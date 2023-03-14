import fs from "fs";

export default class CartManager {
  constructor(archivo) {
    this.archivo = archivo;
  }

  async addCart() {
    try {
      /* busco si el archivo no existe o si existe, si tiene datos*/
      if (!this.#exists(this.archivo)) {
        /* Si el archivo no existe, lo creo con el primer carrito agregado */
        console.log("Se crea archivo");
        let cartsArray = [];
        const cart = {
          id: this.#idGenerator(),
          products: [],
        };
        cartsArray.push(cart);
        console.log("Agregando carrito...");
        await this.#writeFile(this.archivo, cartsArray);
        console.log(`Se agrego el carrito con el id: ${cart.id}`);
        return cart.id;
      } else {
        /* si el archivo existe, primero verifico si esta vacio */
        if (this.#readFile(this.archivo)) {
          console.log("Leyendo archivo...");
          const cartsArray = await this.#readFile(this.archivo);
          if (cartsArray.length === 0 || !cartsArray) {
            /* si esta vacio no le paso parametro al idGenerator, por lo que le pondra id: 1 */
            const cart = {
              id: this.#idGenerator(),
              products: [],
            };
            cartsArray.push(cart);
          } else {
            /* si ya tiene algun producto, le paso el array de productos como parametro al idGenerator para que le ponga el id correspondiente */
            const cart = {
              id: this.#idGenerator(cartsArray),
              products: [],
            };
            cartsArray.push(cart);
          }
          console.log("Agregando carrito...");
          /* escribo el producto */
          this.#writeFile(this.archivo, cartsArray);
          console.log(`Se agrego el carrito con el id: ${cart.id}`);
          return cart.id;
        }
      }
    } catch (error) {
      console.log(`Error agregando producto: ${error.message}`);
    }
  }

  async getAll() {
    try {
      /* chequeo si existe el documento */
      if (this.#exists(this.archivo)) {
        const cartsArray = await this.#readFile(this.archivo);
        /* una vez que verifico que existe, veo si esta vacio o si tiene contenido */
        if (cartsArray.length !== 0) {
          return cartsArray;
        } else {
          throw new Error(`El archivo ${this.archivo} esta vacio`);
        }
      }
    } catch (error) {
      console.log(`Error obteniendo todos los carritos: ${error.message}`);
    }
  }

  async getById(id) {
    try {
      /* chequeo si existe el documento */
      if (this.#exists(this.archivo)) {
        const cartsArray = await this.#readFile(this.archivo);
        /* uso find para buscar el carrito que coincida con el id solicitado */
        const cartId = cartsArray.find(item => item.id === id);
        if (!cartId) {
          throw new Error("No se encontro el carrito con el id solicitado");
        } else {
          console.log(`Carrito con el id ${id} encontrado:\n`, cartId);
          return cartId;
        }
      }
    } catch (error) {
      console.log(`Error al buscar carrito con el id ${id}: ${error.message}`);
    }
  }

  async updateProduct(id, product) {
    try {
      /* chequeo si existe el documento */
      if (this.#exists(this.archivo)) {
        const productsArray = await this.#readFile(this.archivo);
        const productsIndex = productsArray.findIndex(item => item.id === id);
        if (productsIndex !== -1) {
          const updateProduct = { ...productsArray[productsIndex], ...product };
          productsArray.splice(productsIndex, 1, updateProduct);
          await this.#writeFile(this.archivo, productsArray);
          return updateProduct;
        } else {
          throw new Error(`No se encontro un producto con el id solicitado`);
        }
      }
    } catch (error) {
      console.log(
        `Error al modificar producto con el id ${id}: ${error.message}`
      );
    }
  }

  async deleteById(id) {
    try {
      /* chequeo si existe el documento */
      if (this.#exists(this.archivo)) {
        const cartsArray = await this.#readFile(this.archivo);
        /* verifico que exista el producto con el id solicitado */
        console.log(`Buscando producto con id: ${id}`);
        if (cartsArray.some(item => item.id === id)) {
          const removedCart = await this.getById(id);
          /* elimino el producto */
          console.log(`Eliminando producto con id solicitado...`);
          const newProductsArray = cartsArray.filter(item => item.id !== id);
          this.#writeFile(this.archivo, newProductsArray);
          console.log(`Producto con el id ${id} eliminado`);
          return removedCart;
        } else {
          throw new Error(`No se encontro el producto con el id ${id}`);
        }
      }
    } catch (error) {
      console.log(
        `Error al eliminar el producto con el id solicitado: ${error.message}`
      );
    }
  }

  async deleteAll() {
    try {
      /* chequeo si existe el documento */
      if (this.#exists(this.archivo)) {
        let newArray = [];
        console.log("Borrando datos...");
        await this.#writeFile(this.archivo, newArray);
        console.log(`Se borraron todos los datos del archivo ${this.archivo}`);
      } else {
        throw new Error(`El archivo ${this.archivo} no existe`);
      }
    } catch (error) {
      console.log(`Ocurrio un error eliminando los datos: ${error.message}`);
    }
  }

  #idGenerator(cartsArray = []) {
    const id =
      cartsArray.length === 0 ? 1 : cartsArray[cartsArray.length - 1].id + 1;
    return id;
  }

  #exists(archivo) {
    /* verifico si existe el archivo */
    try {
      if (!fs.existsSync(archivo)) {
        throw new Error("El archivo no existe");
      } else {
        return true;
      }
    } catch (error) {
      console.log(`Error buscando el archivo: ${error.message}`);
    }
  }

  async #readFile(archivo) {
    try {
      /* leo el archivo */
      const data = await fs.readFileSync(archivo);
      return JSON.parse(data);
    } catch (error) {
      console.log(`Error leyendo el archivo: ${error.message}`);
    }
  }

  async #writeFile(archivo, data) {
    try {
      await fs.writeFileSync(archivo, JSON.stringify(data, null, 2));
    } catch (error) {
      console.log(`Error escribiendo el archivo: ${error.message}`);
    }
  }
}
