-- CreateTable
CREATE TABLE `carregamento` (
    `id_produto` INTEGER NULL,
    `id_carregamento` INTEGER NOT NULL AUTO_INCREMENT,
    `conexao` VARCHAR(191) NULL,
    `potencia` VARCHAR(191) NULL,
    `tensao_entrada` VARCHAR(191) NULL,
    `polos` VARCHAR(191) NULL,

    PRIMARY KEY (`id_carregamento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comentarios` (
    `id_produto` INTEGER NULL,
    `id_comentario` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(191) NULL,
    `data_lancamento` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id_comentario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `imagens` (
    `id_produto` INTEGER NULL,
    `id_imagem` INTEGER NOT NULL AUTO_INCREMENT,
    `imagem` LONGBLOB NULL,

    PRIMARY KEY (`id_imagem`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inversor` (
    `id_produto` INTEGER NULL,
    `id_inversor` INTEGER NOT NULL AUTO_INCREMENT,
    `potencia_entrada` VARCHAR(191) NULL,
    `potencia_saida` VARCHAR(191) NULL,
    `corrente_entrada` VARCHAR(191) NULL,
    `corrente_saida` VARCHAR(191) NULL,
    `corrente_curto` VARCHAR(191) NULL,
    `frequencia` INTEGER NULL,
    `tensao_entrada` VARCHAR(191) NULL,
    `tensao_saida` VARCHAR(191) NULL,
    `quantidade_mppt` DECIMAL(65, 30) NULL,

    PRIMARY KEY (`id_inversor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `itempedido` (
    `id_itempedido` INTEGER NOT NULL AUTO_INCREMENT,
    `id_produto` INTEGER NULL,
    `id_pedido` INTEGER NULL,
    `titulo_produto` VARCHAR(191) NULL,
    `quantidade` INTEGER NULL,
    `total` DECIMAL(65, 30) NULL,

    PRIMARY KEY (`id_itempedido`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `microinversores` (
    `id_produto` INTEGER NULL,
    `id_microinv` INTEGER NOT NULL AUTO_INCREMENT,
    `tensao_mppt` VARCHAR(191) NULL,
    `tensao_saida` VARCHAR(191) NULL,
    `corrente_curto` VARCHAR(191) NULL,
    `corrente_mppt` VARCHAR(191) NULL,
    `corrente_saida` VARCHAR(191) NULL,
    `potencia_saida` VARCHAR(191) NULL,
    `quantidade_mppt` INTEGER NULL,
    `frequencia` VARCHAR(191) NULL,

    PRIMARY KEY (`id_microinv`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `monitoramento` (
    `id_produto` INTEGER NULL,
    `id_monitoramento` INTEGER NOT NULL AUTO_INCREMENT,
    `servidor` VARCHAR(191) NULL,
    `alcance` DECIMAL(65, 30) NULL,
    `tensao_operacao` VARCHAR(191) NULL,
    `comunicacao` VARCHAR(191) NULL,
    `consumo` VARCHAR(191) NULL,

    PRIMARY KEY (`id_monitoramento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `painel` (
    `id_produto` INTEGER NULL,
    `id_painel` INTEGER NOT NULL AUTO_INCREMENT,
    `eficiencia` VARCHAR(191) NULL,
    `tipo_celula` VARCHAR(191) NULL,
    `potencia_modulo` VARCHAR(191) NULL,
    `tensao_circuitoaberto` VARCHAR(191) NULL,
    `tensao_potencia` VARCHAR(191) NULL,
    `tensao_sistema` VARCHAR(191) NULL,
    `corrente_curto` VARCHAR(191) NULL,
    `corrente_fusivel` VARCHAR(191) NULL,

    PRIMARY KEY (`id_painel`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pedido` (
    `id_pedido` INTEGER NOT NULL AUTO_INCREMENT,
    `id_usuario` VARCHAR(191) NULL,
    `valor_frete` DECIMAL(10, 2) NULL,
    `total_pedido` DECIMAL(10, 2) NULL,
    `status` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_pedido`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `produto` (
    `id_produto` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo_produto` VARCHAR(191) NOT NULL,
    `marca_produto` VARCHAR(191) NULL,
    `categoria` VARCHAR(191) NOT NULL,
    `modelo` VARCHAR(191),
    `quantidade` INTEGER NOT NULL,

    `preco` DECIMAL(10, 2) NOT NULL,
    `descricao` VARCHAR(191) NULL,
    `peso` DECIMAL(10, 2) NULL,
    `altura` DECIMAL(10, 2) NULL,
    `largura` DECIMAL(10, 2) NULL,
    `comprimento` DECIMAL(10, 2) NULL,
    PRIMARY KEY (`id_produto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuario` (
    `id_usuario` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `sobrenome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `verificacao_email` DATETIME(3) NULL,
    `senha` VARCHAR(191) NOT NULL,
    `telefone` BIGINT NULL,
    `data_criacao` DATETIME(3) NULL,

    UNIQUE INDEX `usuario_email_key`(`email`),
    PRIMARY KEY (`id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `conta` (
    `id_conta` VARCHAR(191) NOT NULL,
    `id_usuario` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `provedor` VARCHAR(191) NULL,
    `provedor_id` VARCHAR(191) NULL,
    `id_token` VARCHAR(191) NULL,
    `estado_sessao` VARCHAR(191) NULL,

    UNIQUE INDEX `idx_conta_provedor_provedor_id`(`provedor`, `provedor_id`),
    PRIMARY KEY (`id_conta`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `endereco` (
    `id_usuario` VARCHAR(191) NULL,
    `id_endereco` INTEGER NOT NULL AUTO_INCREMENT,
    `cep` INTEGER NOT NULL,
    `logradouro` VARCHAR(191) NULL,
    `numero` INTEGER NULL,
    `bairro` VARCHAR(191) NULL,
    `complemento` VARCHAR(191) NULL,
    `cidade` VARCHAR(191) NULL,
    `estado` VARCHAR(191) NULL,

    PRIMARY KEY (`id_endereco`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sessao` (
    `id_sessao` VARCHAR(191) NOT NULL,
    `id_usuario` VARCHAR(191) NOT NULL,
    `token_sessao` VARCHAR(191) NULL,
    `data_expiracao` DATETIME(3) NULL,

    UNIQUE INDEX `sessao_token_sessao_key`(`token_sessao`),
    PRIMARY KEY (`id_sessao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `verificationtoken` (
    `identificador` VARCHAR(191) NOT NULL,
    `token_id` VARCHAR(191) NOT NULL,
    `data_expiracao` DATETIME(3) NULL,

    UNIQUE INDEX `verificationtoken_token_id_key`(`token_id`),
    UNIQUE INDEX `idx_verificationtoken_identifier_token`(`identificador`, `token_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `carregamento` ADD CONSTRAINT `carregamento_id_produto_fkey` FOREIGN KEY (`id_produto`) REFERENCES `produto`(`id_produto`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `comentarios` ADD CONSTRAINT `comentarios_id_produto_fkey` FOREIGN KEY (`id_produto`) REFERENCES `produto`(`id_produto`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `imagens` ADD CONSTRAINT `imagens_id_produto_fkey` FOREIGN KEY (`id_produto`) REFERENCES `produto`(`id_produto`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `inversor` ADD CONSTRAINT `inversor_id_produto_fkey` FOREIGN KEY (`id_produto`) REFERENCES `produto`(`id_produto`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `itempedido` ADD CONSTRAINT `fk_pedido` FOREIGN KEY (`id_pedido`) REFERENCES `pedido`(`id_pedido`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `itempedido` ADD CONSTRAINT `fk_novo_produto` FOREIGN KEY (`id_produto`) REFERENCES `produto`(`id_produto`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `microinversores` ADD CONSTRAINT `fk_microinversores_produto` FOREIGN KEY (`id_produto`) REFERENCES `produto`(`id_produto`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `monitoramento` ADD CONSTRAINT `fk_moni_produto` FOREIGN KEY (`id_produto`) REFERENCES `produto`(`id_produto`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `painel` ADD CONSTRAINT `fk_painel_produto` FOREIGN KEY (`id_produto`) REFERENCES `produto`(`id_produto`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pedido` ADD CONSTRAINT `fk_id_usuario_pedido` FOREIGN KEY (`id_usuario`) REFERENCES `usuario`(`id_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `conta` ADD CONSTRAINT `fk_conta_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario`(`id_usuario`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `endereco` ADD CONSTRAINT `endereco_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `usuario`(`id_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `sessao` ADD CONSTRAINT `fk_sessao_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario`(`id_usuario`) ON DELETE CASCADE ON UPDATE NO ACTION;
