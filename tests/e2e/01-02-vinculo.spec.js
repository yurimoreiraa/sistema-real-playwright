const { test, expect } = require('../support')
const { executeSQL } = require('../support/database')

test('Criação, edição e exclusão de vínculo', async ({ page }) => {
    await page.login.loginIn()
    await page.components.setupDialogListener()

    //Exclusão o vínculo atual
    await executeSQL(`DELETE FROM filiado_vinculo WHERE filiado_id = '1';`)

    //Localizar o filiado
    await page.components.filterMember('Filiado Vínculo')

    //Aba > Vínculo
    await page.locator('li:has-text("Vínculos")').click()

    //Novo Vínculo
    await page.click('a[type="button"]')

    //Órgão
    await page.locator('#select2-orgao_id-container').click()
    await page.locator('li:has-text("Órgão Padrão")').first().click()
    await page.waitForTimeout(1000)

    //Lotação
    await page.locator('#select2-lotacao_id-container').click()
    await page.locator('li:has-text("Lotação Padrão")').first().click()

    //Situação do Filiado
    await page.locator('#select2-filiado_situacao_id-container').click()
    await page.locator('li:has-text("ativo (a)")').first().click()

    //Cargo
    await page.locator('#select2-cargo_id-container').click()
    await page.locator('li:has-text("Cargo Padrão")').first().click()

    //Dados vínculo
    await page.fill('#matricula', '7891010')
    await page.fill('#salario', '250000')
    await page.fill('#admissao_orgao', '21052024')
    await page.fill('#obs', 'Observação')

    //Save vínculo + validação de mensagem
    await page.click('button[type=submit]')
    await page.components.alertHaveText('Registro salvo com sucesso!')

    //Editar
    await page.click('a[title="Editar"]')
    await page.waitForTimeout(500)

    //Validando se o número do contrato foi gerado
    const numContratoGerado = await page.locator('#num_contrato').inputValue()
    expect(numContratoGerado).not.toBe('')

    //Órgão
    await page.locator('#select2-orgao_id-container').click()
    await page.locator('li:has-text("Órgão Padrão Dois")').first().click()
    await page.waitForTimeout(1000)

    //Lotação
    await page.locator('#select2-lotacao_id-container').click()
    await page.locator('li:has-text("Lotação Padrão Dois")').first().click()

    //Situação do Filiado
    await page.locator('#select2-filiado_situacao_id-container').click()
    await page.locator('li:has-text("aposentado (a)")').first().click()

    //Cargo
    await page.locator('#select2-cargo_id-container').click()
    await page.locator('li:has-text("Cargo Padrão Dois")').first().click()

    //Dados vínculo
    await page.fill('#matricula', '7891011')
    await page.fill('#salario', '350000')
    await page.fill('#admissao_orgao', '22052024')
    await page.fill('#obs', 'Observação edição')

    //Save vínculo + validação de mensagem
    await page.click('button[type=submit]')
    await page.components.alertHaveText('Registro editado com sucesso!')

    //Delete vínculo + validação de mensagem
    await page.click('a[title="Excluir"]')
    await page.components.alertHaveText('Registro deletado com sucesso!')
})