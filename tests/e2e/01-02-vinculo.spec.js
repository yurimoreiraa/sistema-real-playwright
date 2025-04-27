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

    //Dados
    await page.selectOption('#orgao_id', 'Órgão Padrão')
    await page.waitForTimeout(1000)
    await page.selectOption('#lotacao_id', 'Lotação Padrão')
    await page.selectOption('#filiado_situacao_id', 'ATIVO (A)')
    await page.selectOption('#cargo_id', 'Cargo Padrão')
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

    //Dados
    await page.selectOption('#orgao_id', 'Órgão Padrão Dois')
    await page.waitForTimeout(1000)
    await page.selectOption('#lotacao_id', 'Lotação Padrão Dois')
    await page.selectOption('#filiado_situacao_id', 'APOSENTADO (A)')
    await page.selectOption('#cargo_id', 'Cargo Padrão Dois')
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