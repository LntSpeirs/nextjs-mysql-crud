import Link from "next/link";

const ProductCard = ({ producto }) => {
  return (
    <Link
      href={`/products/${producto.id}`}
      className="bg-white rounded-lg border-gray-800 mb-3  hover:bg-gray-100 hover:cursor-pointer"
    >
      {producto.image && (
        <img
          src={producto.image}
          className="w-full rounded-t-lg"
          alt="Imagen del producto"
        />
      )}
      <div className="p-4">
        <h1 className="text-lg font-bold text-black">{producto.name}</h1>
        <h2 className="text-2xl text-slate-600">{producto.price}</h2>
        <p className="text-2xl text-slate-600">{producto.description}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
