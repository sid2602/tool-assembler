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
CREATE TABLE [dbo].[Tool_assembly] (
    [id] INT NOT NULL IDENTITY(1,1),
    [customer_id] INT NOT NULL,
    CONSTRAINT [Tool_assembly_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Assembly_item_category] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [img] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Assembly_item_category_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Assembly_item] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [category_id] INT NOT NULL,
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
CREATE TABLE [dbo].[Adaptive_item] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [img] NVARCHAR(1000),
    [category_id] INT NOT NULL,
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
    [category_id] INT NOT NULL,
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
    [LFA] FLOAT(53),
    [WFA] FLOAT(53),
    [ADJBY] NVARCHAR(1000),
    [DAXX] FLOAT(53),
    [DAXN] FLOAT(53),
    [BLQ] NVARCHAR(1000),
    [BBD] BIT,
    [BLRAD] FLOAT(53),
    [BCDP] FLOAT(53),
    [BD] FLOAT(53),
    [BDX] FLOAT(53),
    [BHTA] FLOAT(53),
    [HTB] FLOAT(53),
    [LB] FLOAT(53),
    [LBX] FLOAT(53),
    [BMC] NVARCHAR(1000),
    [WB] FLOAT(53),
    [BTC] NVARCHAR(1000),
    [CASC] NVARCHAR(1000),
    [LSC] FLOAT(53),
    [LSCX] FLOAT(53),
    [LSCN] NVARCHAR(1000),
    [MTP] NVARCHAR(1000),
    [WSC] FLOAT(53),
    [ALP] FLOAT(53),
    [ALN] FLOAT(53),
    [ALO] FLOAT(53),
    [ALF] FLOAT(53),
    [CTP] BIT,
    [CBDP] FLOAT(53),
    [DCB] FLOAT(53),
    [CCMS] NVARCHAR(1000),
    [CCWS] NVARCHAR(1000),
    [CCONWS] INT,
    [DCON] NVARCHAR(1000),
    [CRKS] NVARCHAR(1000),
    [CZC] NVARCHAR(1000),
    [CUB] NVARCHAR(1000),
    [DCSFMS] FLOAT(53),
    [CSP] BIT,
    [CDX] NVARCHAR(1000),
    [DC] FLOAT(53),
    [DCIN] FLOAT(53),
    [DCINX] FLOAT(53),
    [DCINN] FLOAT(53),
    [DCX] FLOAT(53),
    [DCN] FLOAT(53),
    [DCSC] NVARCHAR(1000),
    [ZNC] INT,
    [NCE] INT,
    [CICT] INT,
    [CLMBD] FLOAT(53),
    [CPDN] NVARCHAR(1000),
    [CPDF] BIT,
    [CW] FLOAT(53),
    [CWX] NVARCHAR(1000),
    [CWN] NVARCHAR(1000),
    [DPC] BIT,
    [DCP] BIT,
    [APMX] NVARCHAR(1000),
    [DCC] NVARCHAR(1000),
    [DBT] NVARCHAR(1000),
    [DRVA] FLOAT(53),
    [DRVCT] INT,
    [DHD] BIT,
    [ZEFF] INT,
    [ZNF] INT,
    [NOF] INT,
    [FDC] NVARCHAR(1000),
    [FHA] FLOAT(53),
    [FHH] NVARCHAR(1000),
    [FHP] FLOAT(53),
    [FLW] FLOAT(53),
    [HF] FLOAT(53),
    [LF] FLOAT(53),
    [LFN] FLOAT(53),
    [LFS] FLOAT(53),
    [WF] FLOAT(53),
    [WF2] FLOAT(53),
    [WFS] FLOAT(53),
    [GDMB] FLOAT(53),
    [GEP] BIT,
    [GPD] FLOAT(53),
    [HAND] NVARCHAR(1000),
    [HBKL] FLOAT(53),
    [HBKW] FLOAT(53),
    [HBH] FLOAT(53),
    [HBL] FLOAT(53),
    [HDD] FLOAT(53),
    [LH] FLOAT(53),
    [DHUB] FLOAT(53),
    [HBP] BIT,
    [THUB] FLOAT(53),
    [LAMS] FLOAT(53),
    [ZADJ] INT,
    [IIC] NVARCHAR(1000),
    [SSC] NVARCHAR(1000),
    [LCB] BIT,
    [KYP] BIT,
    [LCF] FLOAT(53),
    [MIID] NVARCHAR(1000),
    [DMIN] FLOAT(53),
    [MHA] FLOAT(53),
    [MHD] FLOAT(53),
    [MHD2] FLOAT(53),
    [MHH] FLOAT(53),
    [DN] FLOAT(53),
    [LN] FLOAT(53),
    [OAH] FLOAT(53),
    [OAL] FLOAT(53),
    [OALN] FLOAT(53),
    [OAW] FLOAT(53),
    [ZEFP] INT,
    [ZNP] INT,
    [PDP] FLOAT(53),
    [PPL] FLOAT(53),
    [TCPD] FLOAT(53),
    [TCS] NVARCHAR(1000),
    [AZ] FLOAT(53),
    [SIG] FLOAT(53),
    [PL] FLOAT(53),
    [PHD] FLOAT(53),
    [PRSPC] NVARCHAR(1000),
    [LPR] FLOAT(53),
    [QTC] NVARCHAR(1000),
    [GAMP] FLOAT(53),
    [GAMN] FLOAT(53),
    [GAMO] FLOAT(53),
    [GAMF] FLOAT(53),
    [RMPX] NVARCHAR(1000),
    [RPMX] NVARCHAR(1000),
    [RID] NVARCHAR(1000),
    [SX] NVARCHAR(1000),
    [DMM] FLOAT(53),
    [H] FLOAT(53),
    [LS] FLOAT(53),
    [B] FLOAT(53),
    [SHIAN] FLOAT(53),
    [NOS] INT,
    [SDL] FLOAT(53),
    [SD] FLOAT(53),
    [STA] FLOAT(53),
    [SRX] NVARCHAR(1000),
    [SRN] NVARCHAR(1000),
    [SRR] NVARCHAR(1000),
    [TMINS] BIT,
    [TTPID] NVARCHAR(1000),
    [TA] FLOAT(53),
    [TG] FLOAT(53),
    [TPD] BIT,
    [TD] FLOAT(53),
    [TDZ] NVARCHAR(1000),
    [TCTR] NVARCHAR(1000),
    [DIX] NVARCHAR(1000),
    [LIN] NVARCHAR(1000),
    [KAPR] FLOAT(53),
    [CEATC] NVARCHAR(1000),
    [THSC] NVARCHAR(1000),
    [PSIR] FLOAT(53),
    [TSYC] NVARCHAR(1000),
    [UST] NVARCHAR(1000),
    [LU] FLOAT(53),
    [ULDR] FLOAT(53),
    [LUX] NVARCHAR(1000),
    [WBTP] NVARCHAR(1000),
    [WBTHK] FLOAT(53),
    [WT] FLOAT(53),
    [CUTDIA] NVARCHAR(1000),
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
    [tool_assembly_id] INT NOT NULL,
    [cutting_item_id] INT NOT NULL,
    CONSTRAINT [Tool_assembly_cutting_item_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Tool_assembly_adaptive_item] (
    [id] INT NOT NULL IDENTITY(1,1),
    [tool_assembly_id] INT NOT NULL,
    [adaptive_item_id] INT NOT NULL,
    CONSTRAINT [Tool_assembly_adaptive_item_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Tool_assembly_tool_item] (
    [id] INT NOT NULL IDENTITY(1,1),
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
ALTER TABLE [dbo].[Tool_assembly] ADD CONSTRAINT [Tool_assembly_customer_id_fkey] FOREIGN KEY ([customer_id]) REFERENCES [dbo].[Customer]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Assembly_item] ADD CONSTRAINT [Assembly_item_category_id_fkey] FOREIGN KEY ([category_id]) REFERENCES [dbo].[Assembly_item_category]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Adaptive_item] ADD CONSTRAINT [Adaptive_item_category_id_fkey] FOREIGN KEY ([category_id]) REFERENCES [dbo].[Adaptive_item_category]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Cutting_item] ADD CONSTRAINT [Cutting_item_category_id_fkey] FOREIGN KEY ([category_id]) REFERENCES [dbo].[Cutting_item_category]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

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