/*
  Warnings:

  - Added the required column `employer_email` to the `Employer_Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employer_Transaction" ADD COLUMN     "employer_email" TEXT NOT NULL;
