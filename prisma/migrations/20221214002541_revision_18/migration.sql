/*
  Warnings:

  - You are about to drop the column `stripe_id` on the `Employer_Transaction` table. All the data in the column will be lost.
  - Added the required column `intent_id` to the `Employer_Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `session_id` to the `Employer_Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employer_Transaction" DROP COLUMN "stripe_id",
ADD COLUMN     "intent_id" TEXT NOT NULL,
ADD COLUMN     "session_id" TEXT NOT NULL;
