-- CreateTable
CREATE TABLE "OrderItem" (
    "OrderItemID" TEXT NOT NULL,
    "OrderID" TEXT NOT NULL,
    "FoodItemID" TEXT NOT NULL,
    "Quantity" INTEGER NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("OrderItemID")
);

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_OrderID_fkey" FOREIGN KEY ("OrderID") REFERENCES "Order"("OrderID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_FoodItemID_fkey" FOREIGN KEY ("FoodItemID") REFERENCES "FoodItem"("FoodItemID") ON DELETE CASCADE ON UPDATE CASCADE;
