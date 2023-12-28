/*
  Warnings:

  - Added the required column `updated_at` to the `Assembly_item_category` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Assembly_item_category] ADD [created_at] DATETIME2 NOT NULL CONSTRAINT [Assembly_item_category_created_at_df] DEFAULT CURRENT_TIMESTAMP,
[updated_at] DATETIME2 NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[Tool_assembly] ADD [name] NVARCHAR(1000);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
