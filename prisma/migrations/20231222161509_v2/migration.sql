BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Tool_assembly] DROP CONSTRAINT [Tool_assembly_customer_id_fkey];

-- AlterTable
ALTER TABLE [dbo].[Tool_assembly] ALTER COLUMN [customer_id] INT NULL;

-- AddForeignKey
ALTER TABLE [dbo].[Tool_assembly] ADD CONSTRAINT [Tool_assembly_customer_id_fkey] FOREIGN KEY ([customer_id]) REFERENCES [dbo].[Customer]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
