const { test, expect } = require('../support')
const { executeSQL } = require('../support/database')

test('Criação, edição e exclusão de órgãos', async ({ page }) => {
    await page.login.loginIn()
    await page.components.setupDialogListener()

    //Central de Filiados > Cadastros > Órgão
    await page.components.navigateSidebarMenu('0','orgao')

    //Novo
    await page.click('a[type="button"]')

    //Dados
    await page.fill('#siape', '123456')
    await page.fill('#nome', 'Novo Teste Automatizado')
    await page.fill('#sigla', 'NTA')
    await page.fill('#cnpj', '08641364000162')
    await page.fill('#email', 'teste@gmail.com')
    await page.fill('#site', 'www.teste.com.br')
    await page.fill('#complemento', 'Condomínio Teste')
    await page.waitForSelector('#ativo')
    await page.selectOption('#ativo', 'Não')
    await page.fill('#contato_nome', 'Nome Contato')
    await page.fill('#contato_departamento', 'Departamento')
    await page.fill('#contato_telefone', '7130303333')
    await page.fill('#contato_whatsapp', '71999999999')
    await page.fill('#contato_email', 'teste2@gmail.com')

    //Validação do endereço
    await page.components.validateAddress('#logradouro')
   
    //Save + validação de mensagem
    await page.click('button[type=submit]')
    await page.components.alertHaveText('Registro salvo com sucesso!')

    //Consulta filtro > Edição
    await page.components.filterRegistrations('Novo Teste Automatizado')
    await page.click('a[title="Editar"]')

    //Dados
    await page.fill('#siape', '456789')
    await page.fill('#nome', 'Edição Teste Automatizado')
    await page.fill('#sigla', 'ETA')
    await page.fill('#cnpj', '64181955000175')
    await page.fill('#email', 'testeedicao@gmail.com')
    await page.fill('#site', 'www.edicaoteste.com.br')
    await page.fill('#complemento', 'Condomínio Edição')
    await page.waitForSelector('#ativo')
    await page.selectOption('#ativo', 'Sim')
    await page.fill('#contato_nome', 'Nome Contato Edição')
    await page.fill('#contato_departamento', 'Departamento Edição')
    await page.fill('#contato_telefone', '7130303300')
    await page.fill('#contato_whatsapp', '71999999900')
    await page.fill('#contato_email', 'testeedicao2@gmail.com')
    
    //Save + validação de mensagem
    await page.click('button[type=submit]')
    await page.components.alertHaveText('Registro editado com sucesso!')

    //Consulta filtro
    await page.components.filterRegistrations('Edição Teste Automatizado')

    //Exclusão + validação de mensagem
    await page.click('a[title="Excluir"]')
    await page.components.alertHaveText('Registro deletado com sucesso!')
})
