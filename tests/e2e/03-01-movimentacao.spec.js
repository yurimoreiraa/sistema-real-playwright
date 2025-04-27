const { test, expect } = require('../support')
const { executeSQL } = require('../support/database')

test('Criação, edição e estorno de movimentação', async ({ page }) => {
    await page.login.loginIn()
    await page.components.setupDialogListener()

    //Exclusão das movimentações atuais
    await executeSQL(`DELETE FROM movimentacao WHERE id > 0;`)

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
    await page.selectOption('#situacao', 'Em Aberto')
    await page.selectOption('#forma_pagamento_id', 'Boleto')
    await page.selectOption('#fornecedor_id', 'Fornecedor Padrão')
    await page.fill('#filiado_nome', 'filiado adesao')
    await page.click('text=Filiado Adesão e Contribuição - 385.567.280-65')
    await page.selectOption('#orgao_id', 'Órgão Padrão')
    await page.selectOption('#conta_id', 'Conta Padrão')
    await page.selectOption('#plano_conta_codigo', '01 - Plano de Conta Receita')
    await page.selectOption('#custo_id', 'Centro de Custo Padrão')
    await page.fill('#descricao', 'Novo Teste Automatizado')
    await page.fill('#nota_fiscal', '123456')
    await page.fill('#nota_fiscal_dt_emissao', '19022025')
    await page.fill('#boleto_num', '11111111111111111111111111111111111111111111111')
    await page.fill('#boleto_codigo_barra', '123456')
    await page.fill('#obs', '123456')

    //Validação se o campo Usuário Criação foi preenchido automaticamente
    const usuarioCriacao = await page.locator('#user').inputValue()
    expect(usuarioCriacao).toBe('Suporte')

    //Save vínculo + validação de mensagem
    await page.click('button[type=submit]')
    await page.components.alertHaveText('Registro salvo com sucesso!')

    //Edição para pago e cheque e seus respectivos campos liberados
    await page.locator('a[href$=editar]').nth(0).click()
    await page.selectOption('#situacao', 'Pago')
    await page.fill('#dt_pagamento', '19022025')
    await page.selectOption('#forma_pagamento_id', 'Cheque')
    await page.fill('#cheque_titular', 'Titular Cheque')
    await page.selectOption('#cheque_banco_id', 'Banco Padrão')
    await page.fill('#cheque_agencia', 'Agência Cheque')
    await page.fill('#cheque_conta', 'Conta Cheque')
    await page.fill('#cheque_numero', '123456')

    //Save vínculo + validação de mensagem
    await page.click('button[type=submit]')
    await page.components.alertHaveText('Registro editado com sucesso!')

    //Edição para compensado e crédito e seus respectivos campos liberados
    await page.locator('a[href$=editar]').nth(0).click()
    await page.selectOption('#situacao', 'Compensado')
    await page.fill('#dt_compensacao', '19022025')
    await page.fill('#dt_baixa', '19022025')
    await page.selectOption('#forma_pagamento_id', 'Crédito')
    await page.fill('#autorizacao_num', '123456')
    await page.fill('#cartao_num', '1111111111111111')
    await page.fill('#cartao_titular', '123456')
    await page.fill('#cartao_usb', '123456')

    //Save vínculo + validação de mensagem
    await page.click('button[type=submit]')
    await page.components.alertHaveText('Registro editado com sucesso!')

    //Edição para débito
    await page.locator('a[href$=editar]').nth(0).click()
    await page.selectOption('#forma_pagamento_id', 'Débito')

    //Save vínculo + validação de mensagem
    await page.click('button[type=submit]')
    await page.components.alertHaveText('Registro editado com sucesso!')

    //Edição para dinheiro
    await page.locator('a[href$=editar]').nth(0).click()
    await page.selectOption('#forma_pagamento_id', 'Dinheiro')

    //Save vínculo + validação de mensagem
    await page.click('button[type=submit]')
    await page.components.alertHaveText('Registro editado com sucesso!')

    //Edição para PIX/Depósito
    await page.locator('a[href$=editar]').nth(0).click()
    await page.selectOption('#forma_pagamento_id', 'PIX/Depósito')

    //Save vínculo + validação de mensagem
    await page.click('button[type=submit]')
    await page.components.alertHaveText('Registro editado com sucesso!')

    //Estornar movimentação
    await page.locator('a[href$=estornar]').nth(0).click()
    await page.components.alertHaveText('Movimentação estornada com sucesso!')
})