const { expect } = require('@playwright/test')
const { executeSQL } = require('../database')

export class Banco {
    constructor(page) {
        this.page = page
    }

    async resetFiliadoBanco(id) {
        await executeSQL(`
    UPDATE filiado SET
        sindicato_funcao_id = NULL,
        sindicato_situacao_id = NULL,
        dt_desfiliacao = NULL,
        nome = NULL,
        sexo = NULL,
        estado_civil = NULL,
        filiado_escolaridade_id = NULL,
        rg = NULL,
        orgao_expedidor = NULL,
        dt_emissao_rg = NULL,
        email = NULL,
        telefone = NULL,
        whatsapp = NULL,
        cep = NULL,
        endereco = NULL,
        complemento = NULL,
        estado_id = NULL,
        municipio_id = NULL,
        bairro = NULL,
        ponto_referencia = NULL,
        pai = NULL,
        mae = NULL,
        naturalidade = NULL,
        nacionalidade = NULL,
        tipo_sanguineo = NULL,
        pis_pasep = NULL,
        cartao_sus = NULL,
        titulo_eleitor = NULL,
        carteira_prof = NULL,
        carteira_prof_serie = NULL,
        cartao = NULL,
        cartao_venc = NULL,
        dt_aniversario = NULL,
        comemoracao = NULL,
        banco = NULL,
        tipo_conta = NULL,
        agencia = NULL,
        conta_dv = NULL,
        n_operacao = NULL,
        desfiliacao_motivo = NULL,
        foto = NULL,
        flo_status = NULL,
        flo_ativo = NULL,
        dt_filiacao = NULL,
        numero = NULL
    WHERE id = ${parseInt(id)}`)
    }
}