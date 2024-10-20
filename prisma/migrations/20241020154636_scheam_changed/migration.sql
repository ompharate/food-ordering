/*
  Warnings:

  - Added the required column `RestaurantID` to the `FoodItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FoodItem" ADD COLUMN     "RestaurantID" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Restaurant" (
    "RestaurantID" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Location" TEXT NOT NULL,
    "Phone" TEXT NOT NULL,

    CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("RestaurantID")
);

-- AddForeignKey
ALTER TABLE "FoodItem" ADD CONSTRAINT "FoodItem_RestaurantID_fkey" FOREIGN KEY ("RestaurantID") REFERENCES "Restaurant"("RestaurantID") ON DELETE RESTRICT ON UPDATE CASCADE;
