/*
  Warnings:

  - Added the required column `schDate` to the `ScheduledRecipes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ScheduledRecipes" ADD COLUMN     "schDate" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "schTime" SET DATA TYPE TEXT;
