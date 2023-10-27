import axios from "axios";

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
        <div className="flex gap-x-2 justify-center mt-2">
          {" "}
          <button className="text-white bg-gray-500 hover-gray-red-700 py-2 px-3 rounded">
            Editar
          </button>
          <button className="text-white bg-red-500 hover:bg-red-700 py-2 px-3 rounded">
            Eliminar
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
