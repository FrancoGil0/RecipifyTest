import RecipeServices from "@/services/recipeServices";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import AdminServices from "@/services/adminServices";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const recipeServicio = new RecipeServices();

cloudinary.config({
  cloud_name: "di6gfh51q",
  api_key: "929986752331611",
  api_secret: "u-zV3YnVo1zycMeFYEhDZcH-g_M",
});

interface ReportedID{

  idRecipe:String,

  idReported:String

}

export async function GET(_request: Request) {
  const session=await getServerSession(authOptions)
  const role= String(session?.user.role)
  const recipes = await recipeServicio.getRecetasConAutor(role);
  return NextResponse.json(recipes);
}

export async function DELETE(request: Request) {

  const body:ReportedID = await request.json()


  const adminServices = new AdminServices();

  adminServices.borrarReportes(body.idRecipe);

  recipeServicio.deleteRecipe(body.idRecipe)

  return NextResponse.json(

    { message: "Borrado exitosamente" },

    { status: 200 }

  );

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

    operations:{

        restorations:{

            upscale: "photo"

        },

        resizing:{

            width: 600,

            height: 600,

            fit: "cover"

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

        Authorization: "Bearer ed645d8971da49d58308a186ddc10b05",

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

export async function PATCH(request: NextRequest) {
  const data = await request.formData();
  const id = data.get("id") as string;
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
    formData.append("data", JSON.stringify({
      operations:{
          restorations:{
              upscale: "photo"
          },
          resizing:{
              width: 600,
              height: 600,
              fit: "cover"
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
          Authorization: "Bearer d6fee75e6ff342e6a03779cf1594af56",
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
  
  
    if (linkImage) {
      recipeServicio.updateReceta(
        id,
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
  recipeServicio.updateReceta(
    id,
    titulo,
    image,
    descripcion,
    pasos,
    ingredientes,
    categoria,
    idUsuario
    );

  
  return NextResponse.json(
    { message: "Receta creada con éxito" },
    { status: 200 }
  );
}


