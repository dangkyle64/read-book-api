/*
  Warnings:

  - You are about to drop the `Dummy` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Dummy";

-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
    "bookName" TEXT NOT NULL,
    "lastChapterRead" INTEGER,
    "novelUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);
