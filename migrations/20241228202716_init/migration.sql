/*
  Warnings:

  - The `time_format` column on the `projects` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "TimeFormatEnum" AS ENUM ('24-hour', '12-hour');

-- AlterTable
ALTER TABLE "projects" DROP COLUMN "time_format",
ADD COLUMN     "time_format" "TimeFormatEnum" NOT NULL DEFAULT '24-hour';
