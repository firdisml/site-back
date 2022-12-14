/*
  Warnings:

  - You are about to drop the column `product_description` on the `Employer_Product` table. All the data in the column will be lost.
  - You are about to drop the column `product_features` on the `Employer_Product` table. All the data in the column will be lost.
  - You are about to drop the column `product_description` on the `Employer_Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `product_feature_1` on the `Employer_Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `product_feature_2` on the `Employer_Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `product_feature_3` on the `Employer_Transaction` table. All the data in the column will be lost.
  - Added the required column `amount_discount` to the `Employer_Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount_subtotal` to the `Employer_Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount_tax` to the `Employer_Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount_total` to the `Employer_Transaction` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `product_credit_value` on the `Employer_Transaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Employer_Product" DROP COLUMN "product_description",
DROP COLUMN "product_features";

-- AlterTable
ALTER TABLE "Employer_Transaction" DROP COLUMN "product_description",
DROP COLUMN "product_feature_1",
DROP COLUMN "product_feature_2",
DROP COLUMN "product_feature_3",
ADD COLUMN     "amount_discount" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "amount_subtotal" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "amount_tax" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "amount_total" DECIMAL(65,30) NOT NULL,
DROP COLUMN "product_credit_value",
ADD COLUMN     "product_credit_value" INTEGER NOT NULL;
