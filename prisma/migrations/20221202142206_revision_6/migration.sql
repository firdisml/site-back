/*
  Warnings:

  - Changed the type of `product_credit_value` on the `Employer_Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Employer_Product" DROP COLUMN "product_credit_value",
ADD COLUMN     "product_credit_value" INTEGER NOT NULL;
