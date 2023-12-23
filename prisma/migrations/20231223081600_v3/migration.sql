BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Adaptive_item] ADD [number_of_possible_tool_items] INT NOT NULL CONSTRAINT [Adaptive_item_number_of_possible_tool_items_df] DEFAULT 0;

-- CreateTable
CREATE TABLE [dbo].[Adaptive_item_matching] (
    [id] INT NOT NULL IDENTITY(1,1),
    [machine_direction_adaptive_id] INT NOT NULL,
    [worpiece_direction_adaptive_id] INT NOT NULL,
    CONSTRAINT [Adaptive_item_matching_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Adaptive_item_matching] ADD CONSTRAINT [Adaptive_item_matching_machine_direction_adaptive_id_fkey] FOREIGN KEY ([machine_direction_adaptive_id]) REFERENCES [dbo].[Adaptive_item]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Adaptive_item_matching] ADD CONSTRAINT [Adaptive_item_matching_worpiece_direction_adaptive_id_fkey] FOREIGN KEY ([worpiece_direction_adaptive_id]) REFERENCES [dbo].[Adaptive_item]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
