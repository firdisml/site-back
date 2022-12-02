/*
  Warnings:

  - You are about to drop the column `account_type` on the `User` table. All the data in the column will be lost.
  - Added the required column `account_type` to the `Employer_Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employer_Profile" ADD COLUMN     "account_type" "Account" NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "account_type";
