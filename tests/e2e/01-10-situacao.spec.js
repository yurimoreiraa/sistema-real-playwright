const { test, expect } = require('../support')

test('Criação, edição e exclusão de situação do filiado', async ({ page }) => {
    await page.login.loginIn()
    await page.components.setupDialogListener()

    //Central de Filiados > Cadastros > Situação do Filiado
    await page.components.navigateSidebarMenu('0','filiado_situacao')

    //Novo
    await page.click('a[type="button"]')

    //Dados
    await page.fill('#nome', 'Novo Teste Automatizado')
    await page.locator('#select2-grupo-container').click()
    await page.locator('li:has-text("aposentado")').first().click()

    //Save + validação de mensagem
    await page.click('button[type=submit]')
    await page.components.alertHaveText('Registro salvo com sucesso!')

    //Consulta filtro > Edição
    await page.components.filterRegistrations('Novo Teste Automatizado')
    await page.click('a[title="editar"]')

    //Dados
    await page.fill('#nome', 'Edição Teste Automatizado')
    await page.locator('#select2-grupo-container').click()
    await page.locator('li:has-text("pensionista")').first().click()

    //Save + validação de mensagem
    await page.click('button[type=submit]')
    await page.components.alertHaveText('Registro editado com sucesso!')

    //Consulta filtro
    await page.components.filterRegistrations('Edição Teste Automatizado')

    //Exclusão + validação de mensagem
    await page.click('a[title="Excluir"]')
    await page.components.alertHaveText('Registro deletado com sucesso!')
})
