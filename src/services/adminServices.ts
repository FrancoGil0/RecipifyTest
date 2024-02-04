import prisma from '@/libs/prisma'
class AdminServices{


    async todosLosReportes() {
        const reportes=await prisma.reported.findMany({
            include: {
                reportedBy: { select: { id:true,name: true } },
                reportedRecipe: { select: { id:true,title: true } },
              },
        });
       
        return reportes
    }


    async crearReported(id:string, idUser:string){
        const idRecipe=await prisma.recipe.findFirst({
            where: {id: Number(id)}
         })
        const idUserFind= await prisma.user.findFirst({
            where: {id: Number(idUser)}
        })
        if (!idRecipe) {
            throw new Error("No se pudo encontrar al usuario al cual le querés cambiar dar un rol");
          }
        if (!idUserFind) {
            throw new Error("No se pudo encontrar al usuario al cual le querés cambiar dar un rol");
          }
        const reported= await prisma.reported.create({
            data:{
                recipeID: idRecipe.id,
                userID: idUserFind.id
            },
        })
        return reported
    };

    async borrarTodosReportes(){
      await prisma.reported.deleteMany()
    }

    async borrarReportes(idRecipe:String){
        const idRecipeNumber=Number(idRecipe)
        await prisma.reported.deleteMany({
            where:{
                recipeID:idRecipeNumber
            }
        })
    }
    async borrarReporteEspecifico(idReport:string){
      const deletedReport=  await prisma.reported.delete({
            where:{
                id:Number(idReport)
            }
        })

        if (deletedReport) return {message:"Reporte eliminado correctamente",status:200}

        return {message:"Problemas al eliminar reporte.",status:500}
    }

    async resetReceta(idRecipe:String){
        const recetaExiste=await prisma.recipe.findFirst({
            where:{
                id:Number(idRecipe),
                visibility:false
            }
        })

        if(recetaExiste){
            const recetaActualizada= await prisma.recipe.update({
                where:{
                    id:Number(idRecipe),
                    visibility:false
                },
                data:{
                    visibility:true
                }
            })
            
            return {message:`La receta "${recetaActualizada.title}" ha sido reestablecida correctamente`,status:200}
        }

        return {
            "message":"Recipe not Found",
            "status":404
        }



    }
    



}
export default  AdminServices;