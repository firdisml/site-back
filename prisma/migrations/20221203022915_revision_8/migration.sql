/*
  Warnings:

  - Added the required column `updated_at` to the `Employer_Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Employer_File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Employer_Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Employer_Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employer_Address" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Employer_File" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Employer_Product" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Employer_Profile" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Employer_Transaction" (
    "id" TEXT NOT NULL,
    "employer_profile_id" TEXT,
    "employer_product_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "stripe_id" TEXT NOT NULL,
    "product_name" TEXT NOT NULL,
    "product_price" TEXT NOT NULL,
    "product_credit_value" TEXT NOT NULL,
    "product_description" TEXT NOT NULL,
    "product_feature_1" TEXT NOT NULL,
    "product_feature_2" TEXT NOT NULL,
    "product_feature_3" TEXT NOT NULL,

    CONSTRAINT "Employer_Transaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Employer_Transaction" ADD CONSTRAINT "Employer_Transaction_employer_profile_id_fkey" FOREIGN KEY ("employer_profile_id") REFERENCES "Employer_Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employer_Transaction" ADD CONSTRAINT "Employer_Transaction_employer_product_id_fkey" FOREIGN KEY ("employer_product_id") REFERENCES "Employer_Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
