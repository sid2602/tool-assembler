BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Tool_item] ADD [number_of_possible_connections] INT NOT NULL CONSTRAINT [Tool_item_number_of_possible_connections_df] DEFAULT 1;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
