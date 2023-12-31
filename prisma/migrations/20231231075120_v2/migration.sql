BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Assembly_tool] (
    [id] INT NOT NULL IDENTITY(1,1),
    [tool_item_id] INT NOT NULL,
    [assembly_item_id] INT NOT NULL,
    CONSTRAINT [Assembly_tool_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Assembly_tool] ADD CONSTRAINT [Assembly_tool_tool_item_id_fkey] FOREIGN KEY ([tool_item_id]) REFERENCES [dbo].[Tool_item]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Assembly_tool] ADD CONSTRAINT [Assembly_tool_assembly_item_id_fkey] FOREIGN KEY ([assembly_item_id]) REFERENCES [dbo].[Assembly_item]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
