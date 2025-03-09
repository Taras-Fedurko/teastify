/*
  Warnings:

  - A unique constraint covering the columns `[projectId,provider]` on the table `integrations` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "integrations_projectId_provider_key" ON "integrations"("projectId", "provider");
