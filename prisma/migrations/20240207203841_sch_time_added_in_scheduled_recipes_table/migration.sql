/*
  Warnings:

  - Added the required column `schTime` to the `ScheduledRecipes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ScheduledRecipes" ADD COLUMN     "schTime" TIMESTAMP(3) NOT NULL;
