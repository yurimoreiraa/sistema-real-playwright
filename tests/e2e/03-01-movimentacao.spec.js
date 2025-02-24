const { test, expect } = require('../support')
const { executeSQL } = require('../support/database')

test('Criação, edição e estorno de movimentação', async ({ page }) => {
    await page.login.loginIn()

    //Exclusão das movimentações atuais
    await executeSQL(`DELETE FROM movimentacao WHERE id > 0';`)

    //Central de Finanças > Movimentações
    await page.locator('a[href$="movimentacao"]').click()

    //Novo
    await page.click('a[type="button"]')

    // Obtém a data atual no formato "DD/MM/AAAA"
    const dataAtual = new Date().toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    })

    //Validação se o campo Data Lançamento está vindo com a data atual
    const dataLancamento = await page.locator('#dt_lancamento').inputValue()
    expect(dataLancamento).toBe(dataAtual)

    //Dados
    await page.fill('#dt_vencimento', '19022025')
    await page.type('#valor_bruto', '30000')
    await page.keyboard.press('Tab')

    //Validação se o campo Valor Líquido foi preenchido automaticamente
    const valorLiquido = await page.locator('#valor_liquido').inputValue()
    const valorCorrigido = valorLiquido.replace(/\u00A0/g, '') // Remove espaços invisíveis
    expect(valorCorrigido).toBe('R$300,00')

    //Dados
    await page.fill('#taxa', '1000')
    await page.fill('#valor_taxa', '1000')
    await page.fill('#imposto', '1000')
    await page.fill('#desconto', '1000')
    await page.fill('#multa', '1000')
    await page.fill('#juros', '1000')
    await page.fill('#imposto', '1000')

    //Validação se o campo Nº Parcela foi preenchido automaticamente
    const valorParcela = await page.locator('#parcela_numero').inputValue()
    expect(valorParcela).toBe('01/01')

    //Dados
    await page.selectOption('#tipo', 'Entrada')


    // await page.locator('#select2-sindicato_funcao_id-container').click()
    // await page.locator('li:has-text("Padrão")').click()

    // //Situação no Sinicato
    // await page.locator('#sindicato_situacao_id').selectOption('1')

    // //Data de Filiação
    // await page.fill('#dt_filiacao', '06/08/2024')

    // //Dados Pessoais
    // await page.fill('#nome', 'Teste Automatizado')
    // await page.fill('#cpf', '56484641005')
    // await page.fill('#dt_nascimento', '18081994')
    // await page.locator('#sexo').selectOption('F')

    // //Estado Civil
    // await page.locator('#select2-estado_civil-container').click()
    // await page.locator('li:has-text("Casado(a)")').click()

    // //Grau de Escolaridade
    // await page.locator('#select2-filiado_escolaridade_id-container').click()
    // await page.locator('li:has-text("Ensino Superior completo (Graduação)")').click()

    // //Dados Pessoais
    // await page.fill('#rg', '123456789')
    // await page.fill('#orgao_expedidor', 'SSP-BA')
    // await page.fill('#dt_emissao_rg', '18081994')
    // await page.fill('#email', 'yuriteste@gmail.com')
    // await page.fill('#telefone', '7130303030')
    // await page.fill('#whatsapp', '71981311592')
    // await page.fill('#complemento', 'Condomínio teste')
    // await page.fill('#ponto_referencia', 'Condomínio')

    // //Validação do endereço
    // await components.validateAddress('#endereco')

    // //Outros Dados
    // await page.fill('#pai', 'Pai Teste')
    // await page.fill('#mae', 'Mãe Teste')
    // await page.fill('#naturalidade', 'Naturalidade')
    // await page.fill('#nacionalidade', 'Nacionalidade')
    // await page.locator('#tipo_sanguineo').selectOption('A-')
    // await page.fill('#pis_pasep', 'PIS/PASEP');
    // await page.fill('#cartao_sus', 'Cartão SUS')
    // await page.fill('#titulo_eleitor', '123456')

    // //Dados Bancários
    // await page.locator('#select2-banco-container').click()
    // await page.locator('li:has-text(" 237 - BANCO BRADESCO S.A. ")').click()
    // await page.locator('#tipo_conta').selectOption('Conta Corrente')
    // await page.fill('#agencia', '0001')
    // await page.fill('#conta_dv', '123456')
    // await page.fill('#n_operacao', '123456')

    // //Save
    // await page.click('#btn_save')

    // //Edição
    // await page.locator('#sindicato_situacao_id').selectOption('0')
    // await page.fill('#dt_desfiliacao', '21052024')
    // await page.fill('#desfiliacao_motivo', 'Desfiliação')
    // await page.click('#btn_save')
    // await page.click('#confirmarSim')
})