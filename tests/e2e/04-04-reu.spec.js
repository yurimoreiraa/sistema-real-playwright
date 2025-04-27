const { test, expect } = require('../support')

test('Criação, edição e exclusão de réus', async ({ page }) => {
    await page.login.loginIn()
    await page.components.setupDialogListener()

    //Central do Jurídico > Cadastros > Réus
    await page.components.navigateSidebarMenu('2', 'reu')

    //Novo
    await page.click('a[type="button"]')

    //Dados
    await page.fill('#codigo', '123456')
    await page.fill('#nome', 'Novo Teste Automatizado')
    await page.fill('#cpf', '07759700008')
    await page.fill('#cnpj', '41548247000124')
    await page.fill('#telefone', '7130303333')
    await page.fill('#whatsapp', '71999999999')
    await page.fill('#email', 'teste@gmail.com')
    await page.fill('#complemento', 'Condomínio Teste')
    await page.selectOption('#ativo', 'Não')
    await page.fill('textarea[name="obs"]', 'Observação novo')

    //Validação do endereço
    await page.components.validateAddress('#endereco')

    //Save + validação de mensagem
    await page.click('button[type=submit]')
    await page.components.alertHaveText('Registro salvo com sucesso!')


    //Consulta filtro > Edição
    await page.components.filterRegistrations('Novo Teste Automatizado')
    await page.click('a[title="Editar"]')

    //Dados
    await page.fill('#codigo', '456789')
    await page.fill('#nome', 'Edição Teste Automatizado')
    await page.fill('#cpf', '27360074096')
    await page.fill('#cnpj', '02922815000153')
    await page.fill('#telefone', '7122220000')
    await page.fill('#whatsapp', '71999990000')
    await page.fill('#email', 'testeedicao@gmail.com')
    await page.fill('#complemento', 'Condomínio Edição')
    await page.selectOption('#ativo', 'Sim')
    await page.fill('textarea[name="obs"]', 'Observação edição')

    //Validação do endereço
    await page.components.validateAddress('#endereco')

    //Save + validação de mensagem
    await page.click('button[type=submit]')
    await page.components.alertHaveText('Registro editado com sucesso!')

    //Consulta filtro
    await page.components.filterRegistrations('Edição Teste Automatizado')

    //Exclusão + validação de mensagem
    await page.click('a[title="Excluir"]')
    await page.components.alertHaveText('Registro deletado com sucesso!')
})
