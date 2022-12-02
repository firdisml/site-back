/*
  Warnings:

  - You are about to drop the column `employer_street` on the `Employer_Address` table. All the data in the column will be lost.
  - Added the required column `employer_address` to the `Employer_Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employer_postal` to the `Employer_Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employer_Address" DROP COLUMN "employer_street",
ADD COLUMN     "employer_address" TEXT NOT NULL,
ADD COLUMN     "employer_postal" TEXT NOT NULL;
