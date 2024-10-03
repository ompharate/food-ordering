-- CreateTable
CREATE TABLE "FoodItem" (
    "FoodItemID" TEXT NOT NULL,
    "FoodName" TEXT NOT NULL,
    "Image" TEXT NOT NULL,
    "Price" DOUBLE PRECISION NOT NULL,
    "Category" TEXT NOT NULL,
    "Description" TEXT NOT NULL,

    CONSTRAINT "FoodItem_pkey" PRIMARY KEY ("FoodItemID")
);

-- CreateTable
CREATE TABLE "Customer" (
    "CustomerID" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Phone" TEXT NOT NULL,
    "Address" TEXT NOT NULL,
    "Password" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("CustomerID")
);

-- CreateTable
CREATE TABLE "Order" (
    "OrderID" TEXT NOT NULL,
    "OrderDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "TotalAmount" DOUBLE PRECISION NOT NULL,
    "CustomerID" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("OrderID")
);

-- CreateTable
CREATE TABLE "Review" (
    "ReviewID" TEXT NOT NULL,
    "RDescription" TEXT NOT NULL,
    "FoodItemID" TEXT NOT NULL,
    "CustomerID" TEXT NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("ReviewID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_Email_key" ON "Customer"("Email");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_CustomerID_fkey" FOREIGN KEY ("CustomerID") REFERENCES "Customer"("CustomerID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_FoodItemID_fkey" FOREIGN KEY ("FoodItemID") REFERENCES "FoodItem"("FoodItemID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_CustomerID_fkey" FOREIGN KEY ("CustomerID") REFERENCES "Customer"("CustomerID") ON DELETE RESTRICT ON UPDATE CASCADE;
