-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "schedule" TIMESTAMP(3),
ALTER COLUMN "title" DROP NOT NULL;
