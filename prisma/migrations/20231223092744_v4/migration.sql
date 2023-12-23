/*
  Warnings:

  - Added the required column `order` to the `Tool_assembly_adaptive_item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `Tool_assembly_cutting_item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `row` to the `Tool_assembly_cutting_item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `Tool_assembly_tool_item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `row` to the `Tool_assembly_tool_item` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Tool_assembly_adaptive_item] ADD [order] INT NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[Tool_assembly_cutting_item] ADD [order] INT NOT NULL,
[row] INT NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[Tool_assembly_tool_item] ADD [order] INT NOT NULL,
[row] INT NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
