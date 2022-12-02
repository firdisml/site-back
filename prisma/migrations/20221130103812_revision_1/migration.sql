-- CreateEnum
CREATE TYPE "Account" AS ENUM ('EMPLOYEE', 'EMPLOYER', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "password" TEXT NOT NULL,
    "account_type" "Account" NOT NULL,
    "refresh_token" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employer_Profile" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "employer_verification_status" BOOLEAN NOT NULL DEFAULT false,
    "employer_verification_submission" BOOLEAN NOT NULL DEFAULT false,
    "employer_name" TEXT NOT NULL,
    "employer_size" TEXT NOT NULL,
    "employer_industry" TEXT NOT NULL,
    "employer_register_number" TEXT NOT NULL,
    "employer_type" TEXT NOT NULL,
    "employer_website" TEXT NOT NULL,

    CONSTRAINT "Employer_Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employer_Address" (
    "id" TEXT NOT NULL,
    "employer_profile_id" TEXT NOT NULL,
    "employer_street" TEXT NOT NULL,
    "employer_city" TEXT NOT NULL,
    "employer_state" TEXT NOT NULL,
    "employer_country" TEXT NOT NULL,

    CONSTRAINT "Employer_Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employer_File" (
    "id" TEXT NOT NULL,
    "employer_profile_id" TEXT NOT NULL,
    "employer_picture" TEXT NOT NULL,
    "employer_document" TEXT NOT NULL,

    CONSTRAINT "Employer_File_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Employer_Profile_user_id_key" ON "Employer_Profile"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Employer_Address_employer_profile_id_key" ON "Employer_Address"("employer_profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "Employer_File_employer_profile_id_key" ON "Employer_File"("employer_profile_id");

-- AddForeignKey
ALTER TABLE "Employer_Profile" ADD CONSTRAINT "Employer_Profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employer_Address" ADD CONSTRAINT "Employer_Address_employer_profile_id_fkey" FOREIGN KEY ("employer_profile_id") REFERENCES "Employer_Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employer_File" ADD CONSTRAINT "Employer_File_employer_profile_id_fkey" FOREIGN KEY ("employer_profile_id") REFERENCES "Employer_Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
