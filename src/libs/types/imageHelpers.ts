import { v2 as cloudinary } from "cloudinary";
import { link } from "fs";

cloudinary.config({
    cloud_name: "dseagqpd0",
    api_key: "989994138848722",
    api_secret: "MCLCr24PMzwAQd0XnFi7Uy-lRFM",
  });




  export async function cloudinaryUpload(imageBlob: Blob) {
    let buffer: any;
    let linkImage: string;
    if (imageBlob) {
      const bytes = await imageBlob.arrayBuffer();
      buffer = Buffer.from(bytes);
      return new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({}, (err, result) => {
            if (err) {
              reject(err);
            }
            if (result) {
              linkImage = result.secure_url;
              resolve(linkImage);
            }
          })
          .end(buffer);
      });
    }
  }



const options = {
    method: "POST",
    headers: {
      Host: "api.claid.ai",
      Authorization: `Bearer ${process.env.API_KEY_IMAGES}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      input: "url de la imagen",
      operations: {
        restorations: {
          upscale:"photo",
        },
        resizing: {
          width:600,
          height:600,
          fit:"cover",
        },
      },
      output: {
        format: "webp",
      },
    }),
  };