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
    <section className="flex justify-center items-center h-[calc(100vh-10rem)]">
      <div className="flex w-4/6 justify-center">
        <div className="p-6 bg-white text-black w-1/3">
          <h3 className="text-2xl font-bold mb-3">{producto.name}</h3>
          <h4 className="text-4xl font-bold">{producto.price}€</h4>
          <p className="text-slate-700">{producto.description}</p>
          <Buttons productId={producto.id} />
        </div>
        <img
          src={producto.image}
          alt="Imagen del producto"
          className="w-80 w-1/3"
        />
      </div>
    </section>
  );
};

export default ProductPage;
