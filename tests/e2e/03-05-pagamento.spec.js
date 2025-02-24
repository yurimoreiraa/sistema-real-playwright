const { test, expect } = require('../support')
const { executeSQL } = require('../support/database')

test('Criação, edição e exclusão de formas de pagamento', async ({ page }) => {
    await page.login.loginIn()
    await page.components.setupDialogListener()

    //Central de Finanças > Cadastros > Formas de Pagamento
    await page.components.navigateSidebarMenu('1','forma_pagamento')

    //Novo
    await page.click('a[type="button"]')

    //Dados
    await page.fill('#nome', 'Novo Teste Automatizado')
    await page.locator('#select2-tipo-container').click()
    await page.locator('li:has-text("Crédito")').first().click()

    //Save + validação de mensagem
    await page.click('button[type=submit]')
    await page.components.alertHaveText('Registro salvo com sucesso!')

    //Consulta filtro > Edição
    await page.components.filterRegistrations('Novo Teste Automatizado')
    await page.click('a[title="Editar"]')

    //Dados
    await page.fill('#nome', 'Edição Teste Automatizado')
    await page.locator('#select2-tipo-container').click()
    await page.locator('li:has-text("Débito")').first().click()

    //Save + validação de mensagem
    await page.click('button[type=submit]')
    await page.components.alertHaveText('Registro editado com sucesso!')

    //Consulta filtro
    await page.components.filterRegistrations('Edição Teste Automatizado')

    //Exclusão + validação de mensagem
    await page.click('a[title="Excluir"]')
    await page.components.alertHaveText('Registro deletado com sucesso!')
})
