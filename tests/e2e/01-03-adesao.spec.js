const { test, expect } = require('../support')
const { executeSQL } = require('../support/database')

test('Criação e edição de adesão', async ({ page }) => {
    await page.login.loginIn()

    //Exclusão da adesão atual
    await executeSQL(`DELETE FROM filiado_adesao WHERE filiado_id = '2';`)

    //Localizar o filiado
    await page.components.filterMember('Filiado Adesão e Contribuição')

    //Aba > Vínculo
    await page.locator('li:has-text("Vínculos")').click()

    //Adesão + Nova Adesão
    await page.click('a[title="Financeiro"]')
    await page.click('a[type="button"]')

    //Tipo de Dívida
    await page.locator('#select2-tipo_divida_id-container').click()
    await page.locator('li:has-text("CONTRIBUIÇÃO SINDICAL")').first().click()
    await page.waitForTimeout(500)

    //Validação do Percentual
    const campoPercentual = page.locator('#percentual')
    const valor = await campoPercentual.inputValue()
    expect(valor).toBe('1')

    //Situação
    await page.waitForSelector('#situacao')
    await page.selectOption('#situacao', { value: 'preparar_alterar' })

    //Dados
    await page.fill('#dt_adesao', '21052024')
    await page.fill('#competencia_inicial', '052024')
    await page.fill('#competencia_final', '052024')
    await page.fill('#dt_encerramento', '21052024')

    //Forma de Pagamento
    await page.waitForSelector('#forma_pagamento')
    await page.selectOption('#forma_pagamento', { value: 'deposito' })

    //Beneficiário
    await page.waitForSelector('#beneficiario')
    await page.selectOption('#beneficiario', { value: 'outros' })

    //Nome do Beneficiário
    await page.fill('#outro_beneficiario', 'Beneficiário Teste')

    //Save adesão + Vaidação de mensagem + editar
    await page.click('button[type=submit]')
    await page.components.alertHaveText('Registro salvo com sucesso!')
    await page.click('a[title="Editar"]')

    //Tipo de Dívida
    await page.waitForSelector('#tipo_divida_id')
    await page.selectOption('#tipo_divida_id', { value: '161' })
    await page.waitForTimeout(500)

    //Situação
    await page.waitForSelector('#situacao')
    await page.selectOption('#situacao', { value: 'excluido' })

    //Dados
    await page.fill('#dt_adesao', '22052024')
    await page.fill('#competencia_inicial', '042024')
    await page.fill('#competencia_final', '042024')
    await page.fill('#dt_encerramento', '22052024')

    //Validação da Forma de Pagamento
    const campoFormaPagamento = page.locator('#forma_pagamento')
    const valorFormaPagamento = await campoFormaPagamento.inputValue()
    expect(valorFormaPagamento).toBe('deposito')

    //Beneficiário
    await page.waitForSelector('#beneficiario')
    await page.selectOption('#beneficiario', { value: 'null' })
    
    //Save adesão + validação de mensagem
    await page.click('button[type=submit]')
    await page.components.alertHaveText('Registro editado com sucesso!')

    //Adicionar depois ao teste uma adesão para cada tipo de dívida.
})