/*
  Warnings:

  - Added the required column `quantity` to the `Adaptive_assembly` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Assembly_tool` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Adaptive_assembly] ADD [quantity] INT NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[Assembly_tool] ADD [quantity] INT NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
