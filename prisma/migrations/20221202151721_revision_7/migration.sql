/*
  Warnings:

  - Added the required column `product_description` to the `Employer_Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_price` to the `Employer_Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employer_Product" ADD COLUMN     "product_description" TEXT NOT NULL,
ADD COLUMN     "product_features" TEXT[],
ADD COLUMN     "product_price" DECIMAL(65,30) NOT NULL;
