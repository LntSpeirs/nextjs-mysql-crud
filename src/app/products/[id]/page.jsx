import axios from "axios";
import Buttons from "./Buttons";

async function cargarProducto(idProducto) {
  const { data } = await axios.get(
    `http://localhost:3000/api/products/${idProducto}`
  );
  return data;
}

const ProductPage = async ({ params }) => {
  const producto = await cargarProducto(params.id);
  //console.log("producto", producto);
  return (
    <section className="flex justify-center items-center">
      <div className="p-6 bg-white text-black">
        <p>Nombre: {producto.name}</p>
        <p>Precio: {producto.price}</p>
        <p>Descripción: {producto.description}</p>
        <Buttons productId={producto.id} />
      </div>
    </section>
  );
};

export default ProductPage;
