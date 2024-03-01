-- CreateEnum
CREATE TYPE "GiftType" AS ENUM ('PHYSICAL', 'DIGITAL', 'MONEY');

-- CreateTable
CREATE TABLE "Gift" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "bought" BOOLEAN NOT NULL,
    "type" "GiftType" NOT NULL,
    "boughtBy" TEXT,
    "descripton" TEXT,
    "messages" TEXT,
    "photoUrl" TEXT NOT NULL,

    CONSTRAINT "Gift_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Gift_name_idx" ON "Gift"("name");
