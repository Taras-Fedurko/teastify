/*
  Warnings:

  - You are about to drop the column `ownerId` on the `projects` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "projects" DROP CONSTRAINT "projects_ownerId_fkey";

-- AlterTable
ALTER TABLE "projects" DROP COLUMN "ownerId";
