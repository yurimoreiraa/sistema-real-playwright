const { test, expect } = require('../support')

test('Criação, edição e exclusão de comarcas', async ({ page }) => {
    await page.login.loginIn()
    await page.components.setupDialogListener()

    //Central do Jurídico > Cadastros > Comarcas
    await page.components.navigateSidebarMenu('2','comarca')

    //Novo
    await page.click('a[type="button"]')

    //Dados
    await page.fill('#codigo', '123456')
    await page.fill('#nome', 'Novo Teste Automatizado')

    //Save + validação de mensagem
    await page.click('button[type=submit]')
    await page.components.alertHaveText('Registro salvo com sucesso!')

    //Consulta filtro > Edição
    await page.components.filterRegistrations('Novo Teste Automatizado')
    await page.click('a[title="Editar"]')

    //Dados
    await page.fill('#codigo', '456789')
    await page.fill('#nome', 'Edição Teste Automatizado')

    //Save + validação de mensagem
    await page.click('button[type=submit]')
    await page.components.alertHaveText('Registro editado com sucesso!')

    //Consulta filtro
    await page.components.filterRegistrations('Edição Teste Automatizado')

    //Exclusão + validação de mensagem
    await page.click('a[title="Excluir"]')
    await page.components.alertHaveText('Registro deletado com sucesso!')
})