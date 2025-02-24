const { test, expect } = require('../support')

test('Criação, edição e exclusão de lotações', async ({ page }) => {
    await page.login.loginIn()
    await page.components.setupDialogListener()

    //Central de Filiados > Cadastros > Lotação
    await page.components.navigateSidebarMenu('0','lotacao')

    //Novo
    await page.click('a[type="button"]')

    //Dados
    await page.fill('#nome', 'Novo Teste Automatizado')
    await page.fill('#contato_telefone', '7130303333')
    await page.fill('#contato_whatsapp', '71999999999')
    await page.fill('#contato_email', 'teste@gmail.com')
    await page.fill('#complemento', 'Condomínio Teste')
    await page.waitForSelector('#ativo')
    await page.selectOption('#ativo', 'Não')
    await page.fill('textarea[name="obs"]', 'Observação novo')

    //Órgão
    await page.locator('#select2-orgao_id-container').click()
    await page.locator('li:has-text("Órgão Padrão")').first().click()

    //Validação do endereço
    await page.components.validateAddress('#logradouro')

    //Save + validação de mensagem
    await page.click('button[type=submit]')
    await page.components.alertHaveText('Registro salvo com sucesso')

    //Consulta filtro > Edição
    await page.components.filterRegistrations('Novo Teste Automatizado')
    await page.click('a[title="Editar"]')

    //Dados
    await page.fill('#nome', 'Edição Teste Automatizado')
    await page.fill('#contato_telefone', '7122220000')
    await page.fill('#contato_whatsapp', '71999990000')
    await page.fill('#contato_email', 'testeedicao@gmail.com')
    await page.fill('#complemento', 'Condomínio Edição')
    await page.waitForSelector('#ativo')
    await page.selectOption('#ativo', 'Sim')
    await page.fill('textarea[name="obs"]', 'Observação edição')

    //Órgão
    await page.locator('#select2-orgao_id-container').click()
    await page.locator('li:has-text("Órgão Padrão Dois")').first().click()

    //Save + validação de mensagem
    await page.click('button[type=submit]')
    await page.components.alertHaveText('Registro editado com sucesso!')

    //Consulta filtro
    await page.components.filterRegistrations('Edição Teste Automatizado')

    //Exclusão + validação de mensagem
    await page.click('a[title="Excluir"]')
    await page.components.alertHaveText('Registro deletado com sucesso!')
})
