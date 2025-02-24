const { test, expect } = require('../support')

test('Criação, edição e exclusão de função no sindicato', async ({ page }) => {
    await page.login.loginIn()
    await page.components.setupDialogListener()

    //Central de Filiados > Cadastros > Função no Sidicato
    await page.components.navigateSidebarMenu('0','sindicato_funcao')

    //Novo
    await page.click('a[type="button"]')

    //Dados
    await page.fill('#nome', 'Novo Teste Automatizado')

    //Save + validação de mensagem
    await page.click('button[type=submit]')
    await page.components.alertHaveText('Registro salvo com sucesso!')

    //Consulta filtro > Edição
    await page.components.filterRegistrations('Novo Teste Automatizado')
    await page.click('a[title="Editar"]')

    //Dados
    await page.fill('#nome', 'Edição Teste Automatizado')

    //Save + validação de mensagem
    await page.click('button[type=submit]')
    await page.components.alertHaveText('Registro editado com sucesso!')

    //Consulta filtro
    await page.components.filterRegistrations('Edição Teste Automatizado')

    //Exclusão = validação de mensagem
    await page.click('a[title="Excluir"]')
    await page.components.alertHaveText('Registro deletado com sucesso!')
})
