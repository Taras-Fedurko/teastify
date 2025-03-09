/*
  Warnings:

  - You are about to drop the column `provider` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `telegram_bot_token` on the `projects` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "projects" DROP COLUMN "provider",
DROP COLUMN "telegram_bot_token";

-- CreateTable
CREATE TABLE "integrations" (
    "id" TEXT NOT NULL,
    "telegramBotToken" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "provider" "ProviderEnum" NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "integrations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "integrations" ADD CONSTRAINT "integrations_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
