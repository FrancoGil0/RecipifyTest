import { updateData } from "@/app/api/userback/perfil/route";
import { IUserInfo } from "@/interfaces/userInterfaces";
import prisma from '@/libs/prisma'
import { compare } from 'bcryptjs';
import { hash } from 'bcryptjs';


class UserServices {


  validarCampos(name:string,email:string ,password:string, repeatPassword?:string){
    if(name=="" || email== "" ||password == "" || repeatPassword == ""){
      return false
    }
    return true
   }

   compararPassword(password:string, repeatPassword?:string){
    const resultado= password == repeatPassword ? true : false
    return resultado
   }
    dbHelper = prisma
   
    async findByMail(email:string){
      const emailExiste=  await this.dbHelper.user.findFirst({
        where: {email : email}
     })
     return emailExiste
    }
    async existeNameEnBaseDedatos(name:string){
      const nameExiste=  await this.dbHelper.user.findFirst({
        where: {name : name}
     })
     return nameExiste
    }
    validarMail(email:string){
        return !email || email==="" ? false : true
    }
    validarPass(pass:string){
        return !pass||pass===""? false:true
    }
    async getUsers() {
        const users: IUserInfo[] = await this.dbHelper.user.findMany();
        if (!users) {
          throw new Error("Error 404: Lamentamos informar que no se pudo encontrar los usuarios");
        }
        return users;
      }
    async getUserId(id: number){
        const usuario = await this.dbHelper.user.findUnique({
            where: {
                id: Number(id)
            },
            include:{
              posts:{select:{title:true,author:true}},
              reviews:{select:{id:true,recipeID:true,authorID:true,rating:true}},
            }
        })
        if (!usuario) {
            throw new Error(`Usuario con ID ${id} no encontrado`);
        }
        return usuario;
    }


    
    async giveRole({ id, role }: {id:number,role:string}) {
        const userExiste = await this.dbHelper.user.findFirst({ where: { id: id } });
        if (!userExiste) {
          throw new Error("No se pudo encontrar al usuario al cual le querés cambiar dar un rol");
        }
        const updatedUser = await this.dbHelper.user.update({
          where: { id: id },
          data: { role: role },
        });
        return updatedUser;
      }



    async getUserByEmail(email: string){
        const usuario = await this.dbHelper.user.findUnique({
            where: {
                email: email
            }
        })
        if (!usuario) {
            return undefined;
        }
        return usuario;
    }
    async comparePassword(password:string,hashedPass:string){
        return await compare(password,hashedPass)
    }
    async hashPassword(pass:string){
        return await hash(pass,10)
    };
   
  /////
  validarPassword(password:string, repeatPassword?:string){
    if(password == "" || repeatPassword == ""){
      throw new Error("Todos los campos son obligatorios")
    }
}
validarEmail(email:string){
    return !email || email==="" ? false : email.includes("@")
}
compararPasswordYrepeatPassword(password:string, repeatPassword?:string){
    const resultado=this.compararPassword(password,repeatPassword)
    if(!resultado){
      throw new Error("Las contraseñas deben ser iguales")
    }
}
async comprobarEmailSinoError(email:string){
    if(!this.validarEmail(email)){
      throw new Error("El email debe contener @")
  }
}
async existNameDatabase(name:string){
    const nameExiste=  await this.dbHelper.user.findFirst({
      where: {name : name}
   })
    if(nameExiste){
      throw new Error ("El nombre ingresado existe en la base de datos")
    }
} 
async existEmailDatabase(email:string){
    const emailExiste=  await this.dbHelper.user.findFirst({
      where: {email : email}
   })
    if(emailExiste){
      throw new Error ("El email ingresado existe en la base de datos")
    }
  }
async changePassword(data:{id:number,password:string,repeatPassword:string}) {
        this.validarPassword(data.password,data.repeatPassword)
        this.compararPasswordYrepeatPassword(data.password,data.repeatPassword)
        const idNumber=Number(data.id)
        const newHashedPassword = await this.hashPassword(data.password);
        const updatedUser = await this.dbHelper.user.update({
            where: { id: idNumber },
             data: {
                password: newHashedPassword
              },
            });
        return updatedUser;
      }

async editarUsuario(data:updateData){
  try{
    const userExiste=await this.dbHelper.user.findFirst({
      where:{
        id:Number(data.id),
      }
    })

    if (!userExiste) throw new Error("El usuario que intenta actualizar no existe.")

    const name = data.name? data.name : userExiste.name
    const photo = data.photo? data.photo : userExiste.photo
    const profileDescription = data.profileDescription? data.profileDescription : userExiste.profileDescription

    const updatedUser = await this.dbHelper.user.update({
      where:{
        id:Number(userExiste.id)
      },
      data:{
        name,
        photo,
        profileDescription
      }
    })

    return updatedUser

  }catch(error){
    throw new Error("No se pudo actualizar. 505 :D")
  }
}


async getPhoto(idUser:number){
  return await this.dbHelper.user.findFirst({
    where:{
      id:idUser
    },
    select:{
      id:true,
      photo:true
    }
  })
}



  ////

     async registrarUser(data: IUserInfo) {
         const hashedPass = await this.hashPassword(data.password);
         const newUser = await this.dbHelper.user.create({
           data: {
             email: data.email.toString(),
             name: data.name.toString(),
             password: hashedPass.toString(),
             country: data.country.toString(),
             role:data.role?.toString()
           },
         });
        return newUser;
       }

      async authorizeUser(email:string,password:string){
        const userExist= await this.getUserByEmail(email);
        const passwordMatches=await this.compararPassword(password,userExist?.password as string);//matchea la pass
        if(!userExist || !passwordMatches){
          return null;
        }
        const authorizedUser={
          id:userExist?.id.toString() as string,
          name:userExist?.name as string,
          email:userExist?.email as string,
          password:userExist?.password as string,
          country:userExist?.country as string,
          role:userExist?.role as string,
        }
        return authorizedUser
        
        
        //Si el usuario existe y la pass matchea, devuelve true :D
      }


      async givePremium(id:string){
        const idUsuario= id.split("|")[2]
        if(idUsuario !== "ANON"){
          const usuario= await prisma.user.findFirst({
           where:{
             id: Number(idUsuario)
           }
          })
          // if(usuario?.role==="ADMIN") return false
          if(usuario){
            const userPremium= await prisma.user.update({
              where: { id: usuario?.id },
              data: {
                role: "PREMIUM"
              },
            })
            if (userPremium) return userPremium
            return false
          }
          return null


        }
        return false
       }

};

export const userServices = new UserServices();

export default UserServices;
