/*
  Warnings:

  - You are about to drop the column `job_benefit` on the `Employer_Job_Post` table. All the data in the column will be lost.
  - You are about to drop the column `job_country` on the `Employer_Job_Post` table. All the data in the column will be lost.
  - You are about to drop the column `job_description` on the `Employer_Job_Post` table. All the data in the column will be lost.
  - You are about to drop the column `job_requirement` on the `Employer_Job_Post` table. All the data in the column will be lost.
  - Added the required column `approved_at` to the `Employer_Job_Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `job_about` to the `Employer_Job_Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `job_arrangement` to the `Employer_Job_Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `job_experience` to the `Employer_Job_Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `job_post_credit` to the `Employer_Job_Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `job_post_duration` to the `Employer_Job_Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `job_post_package` to the `Employer_Job_Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `renewed_at` to the `Employer_Job_Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employer_Job_Post" DROP COLUMN "job_benefit",
DROP COLUMN "job_country",
DROP COLUMN "job_description",
DROP COLUMN "job_requirement",
ADD COLUMN     "approved_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "job_about" TEXT NOT NULL,
ADD COLUMN     "job_arrangement" TEXT NOT NULL,
ADD COLUMN     "job_descriptions" TEXT[],
ADD COLUMN     "job_experience" TEXT NOT NULL,
ADD COLUMN     "job_post_credit" INTEGER NOT NULL,
ADD COLUMN     "job_post_duration" INTEGER NOT NULL,
ADD COLUMN     "job_post_package" TEXT NOT NULL,
ADD COLUMN     "job_requirements" TEXT[],
ADD COLUMN     "job_skills" TEXT[],
ADD COLUMN     "job_tags" TEXT[],
ADD COLUMN     "renewed_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "job_minimum_pay_range" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "job_maximum_pay_range" SET DATA TYPE DECIMAL(65,30);
