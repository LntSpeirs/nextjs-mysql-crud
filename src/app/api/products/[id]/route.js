import { conexion } from "@/libs/mysql";
import { NextResponse } from "next/server";
import cloudinary from "@/libs/cloudinary";
import { processImage } from "@/libs/processImage";

export async function GET(request, { params }) {
  try {
    const resultado = await conexion.query(
      "SELECT * FROM product WHERE id = ?",
      [params.id]
    );

    if (resultado.length === 0) {
      return NextResponse.json(
        { message: "Producto no encontrado." },
        { status: 404 }
      );
    }

    return NextResponse.json(resultado[0]);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const resultado = await conexion.query("DELETE FROM product WHERE id = ?", [
      params.id,
    ]);

    if (resultado.affectedRows === 0) {
      return NextResponse.json(
        {
          message:
            "Producto no encontrado. No se ha eliminado ningún registro. ",
        },
        { status: 404 }
      );
    }
    //return NextResponse.json(resultado, { status: 200 });
    return new Response(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.formData();
    const image = data.get("image");
    const updatedProduct = {
      name: data.get("name"),
      price: data.get("price"),
      description: data.get("description"),
    };

    if (!data.get("name")) {
      return NextResponse.json(
        { message: "Nombre es requerido" },
        { status: 400 }
      );
    }

    if (image) {
      let path = await processImage(image);
      const respuesta = await cloudinary.uploader.upload(path);
      updatedProduct.image = respuesta.secure_url;
      console.log(respuesta);
      if (res) {
        await unlink(path);
      }
    }

    const resultado = await conexion.query(
      "UPDATE product SET ? WHERE id = ?",
      [updatedProduct, params.id]
    );

    if (resultado.affectedRows === 0) {
      return NextResponse.json(
        { message: "Producto no encontrado." },
        { status: 404 }
      );
    }

    const productoActualizado = await conexion.query(
      "SELECT * FROM product WHERE id = ?",
      [params.id]
    );
    return NextResponse.json(productoActualizado[0]);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

/* export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const resultado = await conexion.query(
      "UPDATE product SET ? WHERE id = ?",
      [data, params.id]
    );

    if (resultado.affectedRows === 0) {
      return NextResponse.json(
        { message: "Producto no encontrado." },
        { status: 404 }
      );
    }

    const productoActualizado = await conexion.query(
      "SELECT * FROM product WHERE id = ?",
      [params.id]
    );
    return NextResponse.json(productoActualizado[0]);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
} */
