-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "time_format" TEXT,
ADD COLUMN     "time_zone" TEXT,
ADD COLUMN     "user_time_settings" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "time_format" TEXT,
ADD COLUMN     "time_zone" TEXT;
