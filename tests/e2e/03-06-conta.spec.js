const { test, expect } = require('../support')
const { executeSQL } = require('../support/database')

test('Criação, edição e exclusão de contas', async ({ page }) => {
    await page.login.loginIn()
    await page.components.setupDialogListener()

    //Central de Finanças > Cadastros > Contas
    await page.components.navigateSidebarMenu('1','conta')

    //Novo
    await page.click('a[type="button"]')

    //Dados
    await page.fill('#nome', 'Novo Teste Automatizado')
    await page.locator('#select2-banco_id-container').click()
    await page.locator('li:has-text("Banco Padrão")').first().click()
    await page.fill('#agencia', '0001')
    await page.fill('#conta', '12345-6')
    await page.locator('#select2-tipo-container').click()
    await page.locator('li:has-text("Corrente")').first().click()

    //Save + validação de mensagem
    await page.click('button[type=submit]')
    await page.components.alertHaveText('Registro salvo com sucesso!')

    //Consulta filtro > Edição
    await page.components.filterRegistrations('Novo Teste Automatizado')
    await page.click('a[title="Editar"]')

    //Dados
    await page.fill('#nome', 'Edição Teste Automatizado')
    await page.locator('#select2-banco_id-container').click()
    await page.locator('li:has-text("Banco Padrão Dois")').first().click()
    await page.fill('#agencia', '0002')
    await page.fill('#conta', '12345-7')
    await page.locator('#select2-tipo-container').click()
    await page.locator('li:has-text("Poupança")').first().click()

    //Save + validação de mensagem
    await page.click('button[type=submit]')
    await page.components.alertHaveText('Registro editado com sucesso!')

    //Consulta filtro
    await page.components.filterRegistrations('Edição Teste Automatizado')

    //Exclusão + validação de mensagem
    await page.click('a[title="Excluir"]')
    await page.components.alertHaveText('Registro deletado com sucesso!')
})
