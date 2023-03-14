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
