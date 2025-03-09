-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "projectId" TEXT NOT NULL DEFAULT 'cm4p2i1p90001rjyfstqeeflo';

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
