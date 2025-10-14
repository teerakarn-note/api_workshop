-- CreateTable
CREATE TABLE "User" (
    "in" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "pass" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'use',

    CONSTRAINT "User_pkey" PRIMARY KEY ("in")
);
