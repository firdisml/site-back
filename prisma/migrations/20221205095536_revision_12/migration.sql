-- AlterTable
ALTER TABLE "Employer_Credit" ALTER COLUMN "employer_credit_balance" SET DEFAULT 0;

-- CreateTable
CREATE TABLE "Employer_Job_Post" (
    "id" TEXT NOT NULL,
    "employer_profile_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expired_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "job_title" TEXT NOT NULL,
    "job_description" TEXT[],
    "job_requirement" TEXT[],
    "job_benefit" TEXT[],
    "job_city" TEXT NOT NULL,
    "job_state" TEXT NOT NULL,
    "job_country" TEXT NOT NULL,
    "job_type" TEXT NOT NULL,
    "job_minimum_pay_range" INTEGER NOT NULL,
    "job_maximum_pay_range" INTEGER NOT NULL,
    "post_visibility" BOOLEAN NOT NULL DEFAULT false,
    "post_duration" INTEGER NOT NULL,

    CONSTRAINT "Employer_Job_Post_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Employer_Job_Post" ADD CONSTRAINT "Employer_Job_Post_employer_profile_id_fkey" FOREIGN KEY ("employer_profile_id") REFERENCES "Employer_Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
