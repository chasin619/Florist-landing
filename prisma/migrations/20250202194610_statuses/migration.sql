/*
  Warnings:

  - The values [PendingVAN] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('Inquiry', 'ReadyToSign', 'Pending', 'Signed', 'Booked', 'VendorApprovalNeeded', 'ApprovedAfterBooked');
ALTER TABLE "Event" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Event" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
ALTER TABLE "Event" ALTER COLUMN "status" SET DEFAULT 'Pending';
COMMIT;
