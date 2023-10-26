import { NextResponse } from "next/server";
import { conexion } from "@/libs/mysql";

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
}
