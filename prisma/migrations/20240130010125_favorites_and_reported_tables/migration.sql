-- AlterTable
ALTER TABLE "User" ADD COLUMN     "photo" TEXT NOT NULL DEFAULT 'https://i.pinimg.com/236x/2f/97/f0/2f97f05b32547f54ef1bdf99cd207c90.jpg',
ADD COLUMN     "profileDescription" TEXT NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE "Favorite" (
    "id" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,
    "recipeID" INTEGER NOT NULL,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reported" (
    "id" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,
    "recipeID" INTEGER NOT NULL,

    CONSTRAINT "Reported_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_recipeID_fkey" FOREIGN KEY ("recipeID") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reported" ADD CONSTRAINT "Reported_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reported" ADD CONSTRAINT "Reported_recipeID_fkey" FOREIGN KEY ("recipeID") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
