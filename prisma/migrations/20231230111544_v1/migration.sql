BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Customer] (
    [id] INT NOT NULL IDENTITY(1,1),
    [first_name] NVARCHAR(1000) NOT NULL,
    [last_name] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Customer_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Customer_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[Dictonary] (
    [id] INT NOT NULL IDENTITY(1,1),
    [property_name] NVARCHAR(1000) NOT NULL,
    [full_property_name] NVARCHAR(1000),
    [unit] NVARCHAR(1000),
    [unit_explanation] NVARCHAR(1000),
    CONSTRAINT [Dictonary_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Tool_assembly] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000),
    [customer_id] INT,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [Tool_assembly_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    CONSTRAINT [Tool_assembly_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Assembly_item_category] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [img] NVARCHAR(1000) NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [Assembly_item_category_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    CONSTRAINT [Assembly_item_category_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Assembly_item] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [category_id] INT,
    [img] NVARCHAR(1000),
    [adjby] INT,
    [dcbx] NVARCHAR(1000),
    [dcbn] NVARCHAR(1000),
    [ccms] NVARCHAR(1000),
    [ccws] NVARCHAR(1000),
    [dinn] FLOAT(53),
    [diout] FLOAT(53),
    [hand] NVARCHAR(1000),
    [hth] FLOAT(53),
    [ssc] NVARCHAR(1000),
    [sc] NVARCHAR(1000),
    [lth] FLOAT(53),
    [pnes] NVARCHAR(1000),
    [pnfx] NVARCHAR(1000),
    [scty] NVARCHAR(1000),
    [sfdm] FLOAT(53),
    [sftl] FLOAT(53),
    [spcf] FLOAT(53),
    [ta] FLOAT(53),
    [tg] FLOAT(53),
    CONSTRAINT [Assembly_item_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Adaptive_item_category] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [img] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Adaptive_item_category_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Adaptive_item_matching] (
    [id] INT NOT NULL IDENTITY(1,1),
    [machine_direction_adaptive_id] INT NOT NULL,
    [worpiece_direction_adaptive_id] INT NOT NULL,
    CONSTRAINT [Adaptive_item_matching_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Adaptive_item] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [img] NVARCHAR(1000),
    [number_of_possible_connections] INT NOT NULL CONSTRAINT [Adaptive_item_number_of_possible_connections_df] DEFAULT 0,
    [can_have_tool_item] BIT NOT NULL CONSTRAINT [Adaptive_item_can_have_tool_item_df] DEFAULT 0,
    [category_id] INT,
    [adc] NVARCHAR(1000),
    [atc] NVARCHAR(1000),
    [asp] FLOAT(53),
    [blq] NVARCHAR(1000),
    [bbd] BIT,
    [bd] FLOAT(53),
    [bdx] FLOAT(53),
    [bhta] FLOAT(53),
    [htb] FLOAT(53),
    [lb] FLOAT(53),
    [lbx] FLOAT(53),
    [bmc] NVARCHAR(1000),
    [btel] FLOAT(53),
    [wb] FLOAT(53),
    [casc] NVARCHAR(1000),
    [mxc] FLOAT(53),
    [lsc] FLOAT(53),
    [lscx] FLOAT(53),
    [lscn] NVARCHAR(1000),
    [wsc] FLOAT(53),
    [cbdp] FLOAT(53),
    [dcb] FLOAT(53),
    [dcbx] NVARCHAR(1000),
    [dcbn] NVARCHAR(1000),
    [ccms] NVARCHAR(1000),
    [ccws] NVARCHAR(1000),
    [cconws] INT,
    [dcon] NVARCHAR(1000),
    [crks] NVARCHAR(1000),
    [czc] NVARCHAR(1000),
    [cub] NVARCHAR(1000),
    [dcsfms] FLOAT(53),
    [dcsfws] FLOAT(53),
    [csp] BIT,
    [dpc] BIT,
    [dcp] BIT,
    [dkty] NVARCHAR(1000),
    [hf] FLOAT(53),
    [lf] FLOAT(53),
    [lfn] FLOAT(53),
    [wf] FLOAT(53),
    [kapr] FLOAT(53),
    [kyp] BIT,
    [oah] FLOAT(53),
    [oal] FLOAT(53),
    [oaw] FLOAT(53),
    [phi] FLOAT(53),
    [lpr] FLOAT(53),
    [rho] FLOAT(53),
    [rpm] NVARCHAR(1000),
    [dmm] FLOAT(53),
    [h] FLOAT(53),
    [ls] FLOAT(53),
    [b] FLOAT(53),
    [side] NVARCHAR(1000),
    [dix] NVARCHAR(1000),
    [lin] NVARCHAR(1000),
    [tsyc] NVARCHAR(1000),
    [ust] NVARCHAR(1000),
    [lu] FLOAT(53),
    [lux] NVARCHAR(1000),
    [wt] FLOAT(53),
    CONSTRAINT [Adaptive_item_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Cutting_item_category] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [img] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Cutting_item_category_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Cutting_item] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [category_id] INT,
    [img] NVARCHAR(1000),
    [bnp] BIT,
    [cpp] BIT,
    [cbp] BIT,
    [cb] INT,
    [lbb] FLOAT(53),
    [mtp] NVARCHAR(1000),
    [an] FLOAT(53),
    [ann] NVARCHAR(1000),
    [as] FLOAT(53),
    [ctp] BIT,
    [ccms] NVARCHAR(1000),
    [kch] FLOAT(53),
    [bch] FLOAT(53),
    [chw] FLOAT(53),
    [cnc] INT,
    [cnid] INT,
    [re] FLOAT(53),
    [cdx] FLOAT(53),
    [krins] FLOAT(53),
    [psirl] FLOAT(53),
    [psirr] FLOAT(53),
    [cecp] BIT,
    [cecc] NVARCHAR(1000),
    [cedc] INT,
    [cecv] FLOAT(53),
    [le] FLOAT(53),
    [ceid] INT,
    [l] FLOAT(53),
    [cw] FLOAT(53),
    [apmx] FLOAT(53),
    [drprfp] BIT,
    [gb] FLOAT(53),
    [flsc] NVARCHAR(1000),
    [bn] FLOAT(53),
    [fxhlp] BIT,
    [d1] FLOAT(53),
    [flid] INT,
    [gad] FLOAT(53),
    [gads] FLOAT(53),
    [gdsc] INT,
    [gppfp] BIT,
    [inclp] BIT,
    [ic] FLOAT(53),
    [ibw] FLOAT(53),
    [cdi] FLOAT(53),
    [insd] FLOAT(53),
    [ih] FLOAT(53),
    [epsr] FLOAT(53),
    [noi] INT,
    [iic] NVARCHAR(1000),
    [psirins] FLOAT(53),
    [insl] FLOAT(53),
    [ifs] INT,
    [gan] FLOAT(53),
    [ssc] NVARCHAR(1000),
    [sc] NVARCHAR(1000),
    [s] FLOAT(53),
    [w1] FLOAT(53),
    [iep] BIT,
    [m] FLOAT(53),
    [m2] FLOAT(53),
    [oln] FLOAT(53),
    [pal] FLOAT(53),
    [par] FLOAT(53),
    [pdx] FLOAT(53),
    [pdy] FLOAT(53),
    [pna] FLOAT(53),
    [prfrad] FLOAT(53),
    [prspc] NVARCHAR(1000),
    [ral] FLOAT(53),
    [ra] FLOAT(53),
    [rar] FLOAT(53),
    [rcp] BIT,
    [tg] FLOAT(53),
    [thft] NVARCHAR(1000),
    [hc] FLOAT(53),
    [hb] FLOAT(53),
    [ha] FLOAT(53),
    [tp] FLOAT(53),
    [tpdlt] NVARCHAR(1000),
    [tpx] FLOAT(53),
    [tpn] FLOAT(53),
    [tpt] NVARCHAR(1000),
    [ttp] NVARCHAR(1000),
    [thl] FLOAT(53),
    [thpf] BIT,
    [tpi] FLOAT(53),
    [tpix] FLOAT(53),
    [tpin] FLOAT(53),
    [tce] NVARCHAR(1000),
    [tcins] NVARCHAR(1000),
    [wep] BIT,
    [nt] INT,
    [wt] FLOAT(53),
    [bs] FLOAT(53),
    [bsr] FLOAT(53),
    CONSTRAINT [Cutting_item_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Tool_item_category] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [img] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Tool_item_category_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Tool_item] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [category_id] INT,
    [img] NVARCHAR(1000),
    [lfa] FLOAT(53),
    [wfa] FLOAT(53),
    [adjby] NVARCHAR(1000),
    [daxx] FLOAT(53),
    [daxn] FLOAT(53),
    [blq] NVARCHAR(1000),
    [bbd] BIT,
    [blrad] FLOAT(53),
    [bcdp] FLOAT(53),
    [bd] FLOAT(53),
    [bdx] FLOAT(53),
    [bhta] FLOAT(53),
    [htb] FLOAT(53),
    [lb] FLOAT(53),
    [lbx] FLOAT(53),
    [bmc] NVARCHAR(1000),
    [wb] FLOAT(53),
    [btc] NVARCHAR(1000),
    [casc] NVARCHAR(1000),
    [lsc] FLOAT(53),
    [lscx] FLOAT(53),
    [lscn] NVARCHAR(1000),
    [mtp] NVARCHAR(1000),
    [wsc] FLOAT(53),
    [alp] FLOAT(53),
    [aln] FLOAT(53),
    [alo] FLOAT(53),
    [alf] FLOAT(53),
    [ctp] BIT,
    [cbdp] FLOAT(53),
    [dcb] FLOAT(53),
    [ccms] NVARCHAR(1000),
    [ccws] NVARCHAR(1000),
    [cconws] INT,
    [dcon] NVARCHAR(1000),
    [crks] NVARCHAR(1000),
    [czc] NVARCHAR(1000),
    [cub] NVARCHAR(1000),
    [dcsfms] FLOAT(53),
    [csp] BIT,
    [cdx] NVARCHAR(1000),
    [dc] FLOAT(53),
    [dcin] FLOAT(53),
    [dcinx] FLOAT(53),
    [dcinn] FLOAT(53),
    [dcx] FLOAT(53),
    [dcn] FLOAT(53),
    [dcsc] NVARCHAR(1000),
    [znc] INT,
    [nce] INT,
    [cict] INT,
    [clmbd] FLOAT(53),
    [cpdn] NVARCHAR(1000),
    [cpdf] BIT,
    [cw] FLOAT(53),
    [cwx] NVARCHAR(1000),
    [cwn] NVARCHAR(1000),
    [dpc] BIT,
    [dcp] BIT,
    [apmx] NVARCHAR(1000),
    [dcc] NVARCHAR(1000),
    [dbt] NVARCHAR(1000),
    [drva] FLOAT(53),
    [drvct] INT,
    [dhd] BIT,
    [zeff] INT,
    [znf] INT,
    [nof] INT,
    [fdc] NVARCHAR(1000),
    [fha] FLOAT(53),
    [fhh] NVARCHAR(1000),
    [fhp] FLOAT(53),
    [flw] FLOAT(53),
    [hf] FLOAT(53),
    [lf] FLOAT(53),
    [lfn] FLOAT(53),
    [lfs] FLOAT(53),
    [wf] FLOAT(53),
    [wf2] FLOAT(53),
    [wfs] FLOAT(53),
    [gdmb] FLOAT(53),
    [gep] BIT,
    [gpd] FLOAT(53),
    [hand] NVARCHAR(1000),
    [hbkl] FLOAT(53),
    [hbw] FLOAT(53),
    [hbh] FLOAT(53),
    [hbl] FLOAT(53),
    [hdd] FLOAT(53),
    [lh] FLOAT(53),
    [dhub] FLOAT(53),
    [hbp] BIT,
    [thub] FLOAT(53),
    [lams] FLOAT(53),
    [zadj] INT,
    [iic] NVARCHAR(1000),
    [ssc] NVARCHAR(1000),
    [lcb] BIT,
    [kyp] BIT,
    [lcf] FLOAT(53),
    [miid] NVARCHAR(1000),
    [dmin] FLOAT(53),
    [mha] FLOAT(53),
    [mhd] FLOAT(53),
    [mhd2] FLOAT(53),
    [mhh] FLOAT(53),
    [dn] FLOAT(53),
    [ln] FLOAT(53),
    [oah] FLOAT(53),
    [oal] FLOAT(53),
    [oaln] FLOAT(53),
    [oaw] FLOAT(53),
    [zefp] INT,
    [znp] INT,
    [pdp] FLOAT(53),
    [ppl] FLOAT(53),
    [tcpd] FLOAT(53),
    [tcs] NVARCHAR(1000),
    [az] FLOAT(53),
    [sig] FLOAT(53),
    [pl] FLOAT(53),
    [phd] FLOAT(53),
    [prspc] NVARCHAR(1000),
    [lpr] FLOAT(53),
    [qtc] NVARCHAR(1000),
    [gamp] FLOAT(53),
    [gamn] FLOAT(53),
    [gamo] FLOAT(53),
    [gamf] FLOAT(53),
    [rmpx] NVARCHAR(1000),
    [rpmx] NVARCHAR(1000),
    [rid] NVARCHAR(1000),
    [sx] NVARCHAR(1000),
    [dmm] FLOAT(53),
    [h] FLOAT(53),
    [ls] FLOAT(53),
    [b] FLOAT(53),
    [shian] FLOAT(53),
    [nos] INT,
    [sdl] FLOAT(53),
    [sd] FLOAT(53),
    [sta] FLOAT(53),
    [srx] NVARCHAR(1000),
    [srn] NVARCHAR(1000),
    [srr] NVARCHAR(1000),
    [tmins] BIT,
    [ttpid] NVARCHAR(1000),
    [ta] FLOAT(53),
    [tg] FLOAT(53),
    [tpd] BIT,
    [td] FLOAT(53),
    [tdz] NVARCHAR(1000),
    [tctr] NVARCHAR(1000),
    [dix] NVARCHAR(1000),
    [lin] NVARCHAR(1000),
    [kapr] FLOAT(53),
    [ceatc] NVARCHAR(1000),
    [thsc] NVARCHAR(1000),
    [psir] FLOAT(53),
    [tsyc] NVARCHAR(1000),
    [ust] NVARCHAR(1000),
    [lu] FLOAT(53),
    [uldr] FLOAT(53),
    [lux] NVARCHAR(1000),
    [wbtp] NVARCHAR(1000),
    [wbthk] FLOAT(53),
    [wt] FLOAT(53),
    [cutdia] NVARCHAR(1000),
    CONSTRAINT [Tool_item_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Tool_adaptive] (
    [id] INT NOT NULL IDENTITY(1,1),
    [tool_item_id] INT NOT NULL,
    [adaptive_item_id] INT NOT NULL,
    CONSTRAINT [Tool_adaptive_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Tool_cutting] (
    [id] INT NOT NULL IDENTITY(1,1),
    [tool_item_id] INT NOT NULL,
    [cutting_item_id] INT NOT NULL,
    CONSTRAINT [Tool_cutting_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Adaptive_assembly] (
    [id] INT NOT NULL IDENTITY(1,1),
    [adaptive_item_id] INT NOT NULL,
    [assembly_item_id] INT NOT NULL,
    CONSTRAINT [Adaptive_assembly_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Tool_assembly_cutting_item] (
    [id] INT NOT NULL IDENTITY(1,1),
    [order] INT NOT NULL,
    [row] INT NOT NULL,
    [tool_assembly_id] INT NOT NULL,
    [cutting_item_id] INT NOT NULL,
    CONSTRAINT [Tool_assembly_cutting_item_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Tool_assembly_adaptive_item] (
    [id] INT NOT NULL IDENTITY(1,1),
    [order] INT NOT NULL,
    [row] INT NOT NULL,
    [tool_assembly_id] INT NOT NULL,
    [adaptive_item_id] INT NOT NULL,
    CONSTRAINT [Tool_assembly_adaptive_item_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Tool_assembly_tool_item] (
    [id] INT NOT NULL IDENTITY(1,1),
    [order] INT NOT NULL,
    [row] INT NOT NULL,
    [tool_assembly_id] INT NOT NULL,
    [tool_item_id] INT NOT NULL,
    CONSTRAINT [Tool_assembly_tool_item_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Tool_assembly_assembly_item] (
    [id] INT NOT NULL IDENTITY(1,1),
    [tool_assembly_id] INT NOT NULL,
    [assembly_item_id] INT NOT NULL,
    CONSTRAINT [Tool_assembly_assembly_item_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Tool_assembly] ADD CONSTRAINT [Tool_assembly_customer_id_fkey] FOREIGN KEY ([customer_id]) REFERENCES [dbo].[Customer]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Assembly_item] ADD CONSTRAINT [Assembly_item_category_id_fkey] FOREIGN KEY ([category_id]) REFERENCES [dbo].[Assembly_item_category]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Adaptive_item_matching] ADD CONSTRAINT [Adaptive_item_matching_machine_direction_adaptive_id_fkey] FOREIGN KEY ([machine_direction_adaptive_id]) REFERENCES [dbo].[Adaptive_item]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Adaptive_item_matching] ADD CONSTRAINT [Adaptive_item_matching_worpiece_direction_adaptive_id_fkey] FOREIGN KEY ([worpiece_direction_adaptive_id]) REFERENCES [dbo].[Adaptive_item]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Adaptive_item] ADD CONSTRAINT [Adaptive_item_category_id_fkey] FOREIGN KEY ([category_id]) REFERENCES [dbo].[Adaptive_item_category]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Cutting_item] ADD CONSTRAINT [Cutting_item_category_id_fkey] FOREIGN KEY ([category_id]) REFERENCES [dbo].[Cutting_item_category]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Tool_item] ADD CONSTRAINT [Tool_item_category_id_fkey] FOREIGN KEY ([category_id]) REFERENCES [dbo].[Tool_item_category]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Tool_adaptive] ADD CONSTRAINT [Tool_adaptive_tool_item_id_fkey] FOREIGN KEY ([tool_item_id]) REFERENCES [dbo].[Tool_item]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Tool_adaptive] ADD CONSTRAINT [Tool_adaptive_adaptive_item_id_fkey] FOREIGN KEY ([adaptive_item_id]) REFERENCES [dbo].[Adaptive_item]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Tool_cutting] ADD CONSTRAINT [Tool_cutting_tool_item_id_fkey] FOREIGN KEY ([tool_item_id]) REFERENCES [dbo].[Tool_item]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Tool_cutting] ADD CONSTRAINT [Tool_cutting_cutting_item_id_fkey] FOREIGN KEY ([cutting_item_id]) REFERENCES [dbo].[Cutting_item]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Adaptive_assembly] ADD CONSTRAINT [Adaptive_assembly_adaptive_item_id_fkey] FOREIGN KEY ([adaptive_item_id]) REFERENCES [dbo].[Adaptive_item]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Adaptive_assembly] ADD CONSTRAINT [Adaptive_assembly_assembly_item_id_fkey] FOREIGN KEY ([assembly_item_id]) REFERENCES [dbo].[Assembly_item]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Tool_assembly_cutting_item] ADD CONSTRAINT [Tool_assembly_cutting_item_tool_assembly_id_fkey] FOREIGN KEY ([tool_assembly_id]) REFERENCES [dbo].[Tool_assembly]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Tool_assembly_cutting_item] ADD CONSTRAINT [Tool_assembly_cutting_item_cutting_item_id_fkey] FOREIGN KEY ([cutting_item_id]) REFERENCES [dbo].[Cutting_item]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Tool_assembly_adaptive_item] ADD CONSTRAINT [Tool_assembly_adaptive_item_tool_assembly_id_fkey] FOREIGN KEY ([tool_assembly_id]) REFERENCES [dbo].[Tool_assembly]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Tool_assembly_adaptive_item] ADD CONSTRAINT [Tool_assembly_adaptive_item_adaptive_item_id_fkey] FOREIGN KEY ([adaptive_item_id]) REFERENCES [dbo].[Adaptive_item]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Tool_assembly_tool_item] ADD CONSTRAINT [Tool_assembly_tool_item_tool_assembly_id_fkey] FOREIGN KEY ([tool_assembly_id]) REFERENCES [dbo].[Tool_assembly]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Tool_assembly_tool_item] ADD CONSTRAINT [Tool_assembly_tool_item_tool_item_id_fkey] FOREIGN KEY ([tool_item_id]) REFERENCES [dbo].[Tool_item]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Tool_assembly_assembly_item] ADD CONSTRAINT [Tool_assembly_assembly_item_tool_assembly_id_fkey] FOREIGN KEY ([tool_assembly_id]) REFERENCES [dbo].[Tool_assembly]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Tool_assembly_assembly_item] ADD CONSTRAINT [Tool_assembly_assembly_item_assembly_item_id_fkey] FOREIGN KEY ([assembly_item_id]) REFERENCES [dbo].[Assembly_item]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
