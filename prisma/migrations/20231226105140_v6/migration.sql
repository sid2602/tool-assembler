BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Adaptive_item] DROP CONSTRAINT [Adaptive_item_category_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Assembly_item] DROP CONSTRAINT [Assembly_item_category_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Cutting_item] DROP CONSTRAINT [Cutting_item_category_id_fkey];

-- AlterTable
ALTER TABLE [dbo].[Adaptive_item] ALTER COLUMN [category_id] INT NULL;

-- AlterTable
ALTER TABLE [dbo].[Assembly_item] ALTER COLUMN [category_id] INT NULL;

-- AlterTable
ALTER TABLE [dbo].[Cutting_item] ALTER COLUMN [category_id] INT NULL;

-- AddForeignKey
ALTER TABLE [dbo].[Assembly_item] ADD CONSTRAINT [Assembly_item_category_id_fkey] FOREIGN KEY ([category_id]) REFERENCES [dbo].[Assembly_item_category]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Adaptive_item] ADD CONSTRAINT [Adaptive_item_category_id_fkey] FOREIGN KEY ([category_id]) REFERENCES [dbo].[Adaptive_item_category]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Cutting_item] ADD CONSTRAINT [Cutting_item_category_id_fkey] FOREIGN KEY ([category_id]) REFERENCES [dbo].[Cutting_item_category]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
