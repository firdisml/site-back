/*
  Warnings:

  - Added the required column `product_api` to the `Employer_Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employer_Transaction" ADD COLUMN     "product_api" TEXT NOT NULL;
