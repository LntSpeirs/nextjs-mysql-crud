import { NextResponse } from "next/server";
import { conexion } from "@/libs/mysql";

/* export async function GET() {
  return NextResponse.json({mensaje: "Hola mundo"})
} */

export async function GET() {
  const resultado = await conexion.query("SELECT NOW()")
  return NextResponse.json(resultado)
}