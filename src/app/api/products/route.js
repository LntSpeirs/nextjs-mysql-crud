import { NextResponse } from "next/server";
import { conexion } from "@/libs/mysql";
import { writeFile, unlink } from "fs/promises";
import path from "path";
/* import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.API_USER,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
}); */
import cloudinary from "@/libs/cloudinary";
import { processImage } from "@/libs/processImage";

export async function GET() {
  try {
    const results = await conexion.query("SELECT * FROM product");
    return NextResponse.json(results);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.formData();
    /* console.log(data.get("name"));
    console.log(data.get("price"));
    console.log(data.get("description"));
    console.log(data.get("image")); */

    if (!data.get("name")) {
      return NextResponse.json(
        {
          message: "El nombre es requerido",
        },
        { status: 400 }
      );
    }

    if (!data.get("price")) {
      return NextResponse.json(
        {
          message: "El precio es requerido",
        },
        { status: 400 }
      );
    }

    if (!data.get("description")) {
      return NextResponse.json(
        {
          message: "La descripción es requerida",
        },
        { status: 400 }
      );
    }

    const image = data.get("image");
    if (!image) {
      return NextResponse.json(
        {
          message: "La imágen es requerida",
        },
        { status: 400 }
      );
    }

   /*  const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filePath = path.join(process.cwd(), "public", image.name);
    await writeFile(filePath, buffer); //GUARDAR EN LA CARPETA PUBLIC */
    let filePath = await processImage(image)
    //guardar en cloudinary
   const respuesta = await cloudinary.uploader.upload(filePath, {public_id: image.name})
   //console.log(respuesta)

   if(respuesta) {
    await unlink(filePath)//borrar la imagen de public una vez se haya guardado en cloudinary
   }

    const resultado = await conexion.query("INSERT INTO product SET ?", {
      name: data.get("name"),
      description: data.get("description"),
      price: data.get("price"),
      image: respuesta.secure_url
    });

    //console.log(resultado);

    return NextResponse.json({
      id: resultado.insertId,
      name: data.get("name"),
      description: data.get("description"),
      price: data.get("price"),
      image: respuesta.secure_url
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

/* export async function POST(request) {
  try {
    const data = await request.json();
    const { name, description, price } = data;

    const resultado = await conexion.query("INSERT INTO product SET ?", {
      name,
      description,
      price,
    });

    //console.log(resultado);

    return NextResponse.json({
      id: resultado.insertId,
      name,
      description,
      price,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
} */
