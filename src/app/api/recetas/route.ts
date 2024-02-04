import RecipeServices from "@/services/recipeServices";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import AdminServices from "@/services/adminServices";

const recipeServicio = new RecipeServices();

cloudinary.config({
  cloud_name: "dseagqpd0",
  api_key: "989994138848722",
  api_secret: "MCLCr24PMzwAQd0XnFi7Uy-lRFM",
});

interface ReportedID{

  idRecipe:String,

  idReported:String

}

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const titulo = data.get("title") as string;
  const descripcion = data.get("description") as string;
  const ingredientes = data.get("ingredients") as string;
  const pasos = data.get("pasos") as string;
  const categoria = data.get("categoria") as string;
  const idUsuario = data.get("idUsuario") as string;
  const image = data.get("file");

  const formData = new FormData();
  if (image !== null) {
    formData.append("file", image);
  }

  formData.append("data", JSON.stringify({
      operations: {
        operations:{
          restorations:{
              upscale: "photo"
          },
          resizing:{
              width: 600,
              height: 600,
              fit: "cover"
            }
          }
      },
      output: {
          format: {
              type:"jpeg",
              quality: 80,
              progressive: true
          }
      }
  }));

  
  const options = {
    method: "POST",
    headers: {
        Host: "api.claid.ai",
        Authorization: "Bearer 18d0453f5350401eb57e59c7562eebaa",
    },
    body: formData,
};

const response = await fetch("https://api.claid.ai/v1-beta1/image/edit/upload", options);
const datas = await response.json();
const imageBlob = await fetch(datas.data.output.tmp_url)
  .then(response => {
    if (!response.ok) {
      throw new Error("Error al descargar la imagen");
    }
    return response.blob();
  });

  let buffer: any;
  let linkImage;
  if (imageBlob) {
    const bytes = await imageBlob.arrayBuffer();
    buffer = Buffer.from(bytes);
    const response = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({}, (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
          if (result) {
            linkImage = result.secure_url;
          }
        })
        .end(buffer);
    });
  }

  const recipeServicio = new RecipeServices();

  if (linkImage) {
    recipeServicio.addRecipe(
      titulo,
      linkImage,
      descripcion,
      pasos,
      ingredientes,
      categoria,
      idUsuario
    );
  }
  return NextResponse.json(
    { message: "Receta creada con éxito" },
    { status: 200 }
  );
}

export async function GET(request: Request) {
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

export async function DELETE(request: Request) {

  const body:ReportedID = await request.json()

  const recipeServicio = new RecipeServices();

  const adminServices = new AdminServices();

  adminServices.borrarReportes(body.idRecipe);

  recipeServicio.deleteRecipe(body.idRecipe)

  return NextResponse.json(

    { message: "Borrado exitosamente" },

    { status: 200 }

  );

}


