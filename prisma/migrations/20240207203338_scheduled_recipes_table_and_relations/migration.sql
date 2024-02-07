-- CreateTable
CREATE TABLE "ScheduledRecipes" (
    "id" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,
    "recipeID" INTEGER NOT NULL,

    CONSTRAINT "ScheduledRecipes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ScheduledRecipes" ADD CONSTRAINT "ScheduledRecipes_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduledRecipes" ADD CONSTRAINT "ScheduledRecipes_recipeID_fkey" FOREIGN KEY ("recipeID") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
