-- CreateTable
CREATE TABLE "Contact" (
    "id" SERIAL NOT NULL,
    "first" TEXT NOT NULL,
    "last" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);
