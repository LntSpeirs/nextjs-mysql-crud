"use client";
import axios from "axios";
import { useRouter } from "next/navigation";

const Buttons = ({ productId }) => {
  const router = useRouter();
  return (
    <div className="flex gap-x-2 justify-center mt-2">
      {" "}
      <button
        className="text-white bg-gray-500 hover-gray-red-700 py-2 px-3 rounded"
        onClick={() => {
          router.push(`/products/edit/${productId}`);
        }}
      >
        Editar
      </button>
      <button
        className="text-white bg-red-500 hover:bg-red-700 py-2 px-3 rounded"
        onClick={async () => {
          if (confirm("¿Está seguro de que quiere eliminarlo?")) {
            //console.log("Eliminando " + productId);
            const respuesta = await axios.delete(`/api/products/${productId}`);
            if (respuesta.status === 204) {
              router.push("/products");
              router.refresh();
            }
          }
        }}
      >
        Eliminar
      </button>
    </div>
  );
};

export default Buttons;
