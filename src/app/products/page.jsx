/* Una manera es conectar directamente con la BD
import { conexion } from "@/libs/mysql";

async function cargarProductos() {
  const resultado = await conexion.query("SELECT * FROM product");
  console.log(resultado);
} */

import ProductCard from "@/components/ProductCard";
import axios from "axios";

async function cargarProductos() {
  const { data } = await axios.get("http://localhost:3000/api/products");
  //console.log(resultado);
  return data;
}

const ProductsPage = async () => {
  const productos = await cargarProductos();
  //console.log(productos);
  return (
    <div className="text-white grid gap-4 grid-cols-4">
      {productos.map((producto) => (
        <ProductCard key={producto.id} producto={producto} />
      ))}
    </div>
  );
};

export default ProductsPage;
