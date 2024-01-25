import { cloudinaryUpload } from "@/libs/types/imageHelpers";
import RecipeServices from "@/services/recipeServices";
import { NextRequest, NextResponse } from "next/server";

const recipeServicio = new RecipeServices();



export async function POST(request: NextRequest) {
  const data = await request.formData();
  // const titulo = data.get("title") as string;
  // const descripcion = data.get("description") as string;
  // const ingredientes = data.get("ingredients") as string;
  // const pasos = data.get("pasos") as string;
  // const categoria = data.get("categoria") as string;
  // const idUsuario = data.get("idUsuario") as string;
  const image = data.get("file");

  const linkImage = await cloudinaryUpload(image as Blob || null)

  console.log(linkImage)




  // const imageBlob = image as Blob | null;
  // let buffer: any;
  // let linkImage;
  // if (imageBlob) {
  //   const bytes = await imageBlob.arrayBuffer();
  //   buffer = Buffer.from(bytes);
  //   const response = await new Promise((resolve, reject) => {
  //     cloudinary.uploader
  //       .upload_stream({}, (err, result) => {
  //         if (err) {
  //           reject(err);
  //         }
  //         resolve(result);
  //         if (result) {
  //           linkImage = result.secure_url;
  //         }
  //       })
  //       .end(buffer);
  //   });
  //   console.log(response, "response de otra cosa xd");
  // }

  //Funcion de mejora.

  // const recipeServicio = new RecipeServices();

  // if (linkImage) {
  //   recipeServicio.addRecipe(
  //     titulo,
  //     linkImage,
  //     descripcion,
  //     pasos,
  //     ingredientes,
  //     categoria,
  //     idUsuario
  //   );
  // }
  // return NextResponse.json(
  //   { message: "Receta creada con éxito" },
  //   { status: 200 }
  // );
}

export async function GET(_request: Request) {
  //verificamos si el token está en el encabezado
  // let response = NextResponse.next()
  // const accessToken = request.headers.get("authorization");
  //si el token no esta o no es válido (no podemos verificarlo) devolvemos un 401
  // if (!accessToken || !verifyJwt(accessToken)) {
  //   return new Response(
  //     JSON.stringify({
  //       error: "No autorizado",
  //     }),
  //     {
  //       status: 401,
  //     }
  //   );
  // }

  const recipes = await recipeServicio.getRecetasConAutor();

  //Sacar PASSWORD de la respuesta.

  // const data=recipes.map(recipe =>{

  // })

  return NextResponse.json(recipes);
}
