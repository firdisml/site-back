/*
  Warnings:

  - Added the required column `account_type` to the `Employer_Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employer_Transaction" ADD COLUMN     "account_type" "Account" NOT NULL,
ADD COLUMN     "transaction_status" BOOLEAN NOT NULL DEFAULT true;
