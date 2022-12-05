-- AlterTable
ALTER TABLE "Employer_Profile" ADD COLUMN     "employer_CreditId" TEXT;

-- CreateTable
CREATE TABLE "Employer_Credit" (
    "id" TEXT NOT NULL,
    "employer_profile_id" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "employer_credit_status" BOOLEAN NOT NULL DEFAULT true,
    "employer_credit_balance" INTEGER NOT NULL,

    CONSTRAINT "Employer_Credit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employer_Credit_employer_profile_id_key" ON "Employer_Credit"("employer_profile_id");

-- AddForeignKey
ALTER TABLE "Employer_Credit" ADD CONSTRAINT "Employer_Credit_employer_profile_id_fkey" FOREIGN KEY ("employer_profile_id") REFERENCES "Employer_Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
