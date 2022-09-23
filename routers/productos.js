const { Router, json } = require("express");
const router = Router();
const Contenedor = require("../controllers/productosController.js");
const productos = new Contenedor("./controllers/productos.txt");
const notFound = { error: "Producto no encontrado" };

/* ok: 200
   created: 201
   no content: 204
   not found: 404 */

/* Todos los productos */
router.get("/", async (req, res) => {
  console.log(`Get req recibida`);
  const arrayProductos = await productos.getAll();
  !arrayProductos && res.status(404).json(notFound);
  res.status(200).json(arrayProductos);
});

/* Obtener por id */
router.get("/:id", async (req, res) => {
  console.log(`Get by id req recibida`);
  const id = parseInt(req.params.id);
  const producto = await productos.getById(id);
  !producto && res.status(404).json(notFound);
  res.status(200).json(producto);
});

/* Agregar un producto */
router.post("/", async (req, res) => {
  console.log(`Post req recibida`);
  const data = req.body;
  console.log(data);
  const nuevoProducto = await productos.save(data);

  res.status(201).end();
});

/* Modificar un producto */
router.put("/:id", async (req, res) => {
  console.log(`Put req recibida`);
  const id = parseInt(req.params.id);
  const producto = await productos.getById(id);
  const data = req.body;
  const arrayProductos = await productos.change(id, data);
  !arrayProductos && res.status(404).json(notFound);
  res.status(204).end();
});

router.delete("/:id", async (req, res) => {
  console.log(`Delete req recibida`);
  const id = parseInt(req.params.id);
  const producto = await productos.getById(id);
  if (producto) {
    const eliminar = await productos.deleteById(id);
    res.status(204).end();
  } else {
    !producto && res.status(404).json(notFound);
  }
});

module.exports = router;
