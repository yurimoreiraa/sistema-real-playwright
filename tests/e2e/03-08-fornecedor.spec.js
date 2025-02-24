const { test, expect } = require('../support')
const { executeSQL } = require('../support/database')

test('Criação, edição e exclusão de lotações', async ({ page }) => {
    await page.login.loginIn()
    await page.components.setupDialogListener()

    //Central de Finanças > Cadastros > Plano de Contas
    await page.components.navigateSidebarMenu('1','fornecedor')

    //Novo
    await page.click('a[type="button"]')

    //Dados
    await page.fill('#nome', 'Novo Teste Automatizado')
    await page.fill('#cpf', '00076847039')
    await page.fill('#cnpj', '82740923000144')
    await page.fill('#email', 'email@gmail.com')

    //Validação do endereço
    await page.components.validateAddress('#logradouro')

    //Dados
    await page.fill('#complemento', 'Condomínio Teste')
    await page.waitForSelector('#ativo')
    await page.selectOption('#ativo', 'Não')
    await page.fill('#obs', 'Observação novo')

    //Contato
    await page.fill('#contato_nome', 'Contato Nome')
    await page.fill('#contato_departamento', 'Contato Departamento')
    await page.fill('#contato_telefone', '7130303333')
    await page.fill('#contato_whatsapp', '71999999999')
    await page.fill('#contato_email', 'teste@gmail.com')
    
    //Save + validação de mensagem
    await page.click('button[type=submit]')
    await page.components.alertHaveText('Registro salvo com sucesso!')

    //Consulta filtro > Edição
    await page.components.filterRegistrations('Novo Teste Automatizado')
    await page.click('a[title="Editar"]')

    //Dados
    await page.fill('#nome', 'Edição Teste Automatizado')
    await page.fill('#cpf', '53839513006')
    await page.fill('#cnpj', '01574437000100')
    await page.fill('#email', 'email2@gmail.com')
    await page.fill('#complemento', 'Condomínio Edição')
    await page.waitForSelector('#ativo')
    await page.selectOption('#ativo', 'Sim')
    await page.fill('#obs', 'Observação Edição')

    //Contato
    await page.fill('#contato_nome', 'Contato Nome Edição')
    await page.fill('#contato_departamento', 'Contato Departamento Edição')
    await page.fill('#contato_telefone', '7130300000')
    await page.fill('#contato_whatsapp', '71999990000')
    await page.fill('#contato_email', 'teste2@gmail.com')

    //Save + validação de mensagem
    await page.click('button[type=submit]')
    await page.components.alertHaveText('Registro editado com sucesso!')

    //Consulta filtro
    await page.components.filterRegistrations('Edição Teste Automatizado')

    //Exclusão + validação de mensagem
    await page.click('a[title="Excluir"]')
    await page.components.alertHaveText('Registro deletado com sucesso!')
})
