/*
  Warnings:

  - A unique constraint covering the columns `[intent_id]` on the table `Employer_Transaction` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[session_id]` on the table `Employer_Transaction` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Employer_Transaction_intent_id_key" ON "Employer_Transaction"("intent_id");

-- CreateIndex
CREATE UNIQUE INDEX "Employer_Transaction_session_id_key" ON "Employer_Transaction"("session_id");
