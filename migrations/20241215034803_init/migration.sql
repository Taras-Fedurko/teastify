/*
  Warnings:

  - Added the required column `provider` to the `projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "projects" DROP COLUMN "provider",
ADD COLUMN     "provider" "ProviderEnum" NOT NULL;
