"use client";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

const ProductForm = () => {
  const [producto, setProducto] = useState({
    name: "",
    price: 0,
    description: "",
  });
  const [file, setFile] = useState(null);

  const form = useRef(null);
  const router = useRouter();
  const params = useParams();

  const handleChange = (e) => {
    /*  console.log(e.target.name);
    console.log(e.target.value); */
    setProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (params.id) {
      axios.get(`/api/products/${params.id}`).then((res) => {
        //console.log(res);
        setProducto({
          name: res.data.name,
          price: res.data.price,
          description: res.data.description,
        });
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", producto.name);
    formData.append("price", producto.price);
    formData.append("description", producto.description);
    if (file) {
      formData.append("image", file);
    }

    if (!params.id) {
      //Creando producto
      //const respuesta = await axios.post("/api/products", producto);
      const respuesta = await axios.post("/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      // console.log(respuesta);
    } else {
      //Editando producto
      //const respuesta = await axios.put(`/api/products/${params.id}`, producto);

      const respuesta = await axios.put(
        `/api/products/${params.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log(respuesta);
    }

    form.current.reset();
    router.push("/products");
    router.refresh();
  };

  return (
    <div className="flex">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4"
        ref={form}
      >
        <label
          htmlFor="name"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Nombre de producto:
        </label>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={producto.name}
          autoFocus
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-black"
        />

        <label
          htmlFor="price"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Precio de producto:
        </label>
        <input
          type="text"
          name="price"
          placeholder="00.00"
          value={producto.price}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-black"
        />

        <label
          htmlFor="description"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Descripción de producto:
        </label>
        <textarea
          name="description"
          placeholder="Descripción"
          value={producto.description}
          rows={3}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-black"
        />

        <label
          htmlFor="productImage"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Imagen de producto:
        </label>
        <input
          type="file"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-black mb-4"
          onChange={(e) => {
            //console.log(e.target.files[0]);
            setFile(e.target.files[0]);
          }}
        />

        {file && (
          <Image
            width={450}
            height={450}
            src={URL.createObjectURL(file)}
            alt="Vista previa del archivo cargado"
            className="object-contain mx-auto my-4"
          />
        )}

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          {params.id ? "Editar producto" : "Guardar producto"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
