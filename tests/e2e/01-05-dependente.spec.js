const { test, expect } = require('../support')
const { executeSQL } = require('../support/database')

test('Criação, edição e exclusão de dependentes', async ({ page }) => {
    await page.login.loginIn()
    await page.components.setupDialogListener()

    //Localizar o filiado
    await page.components.filterMember('Filiado Padrão')

    //Aba > Depedentes
    await page.locator('li:has-text("Dependentes")').click()

    //Novo
    await page.click('a[type="button"]')

    //Dados
    await page.fill('input[name="nome"]', 'Teste Automatizado')
    await page.fill('#cpf', '98291112029')

    //Parentesco
    await page.locator('#select2-parentesco-container').click()
    await page.locator('li:has-text("filho")').first().click()

    //Dados
    await page.waitForSelector('#sexo')
    await page.selectOption('#sexo', 'F')
    await page.fill('#dt_nascimento', '18082000')
    await page.fill('#telefone', '7130303333')
    await page.fill('#whatsapp', '71999999999')
    await page.fill('#email', 'automatizado@gmail.com')

    //Save + Validação de mensagem
    await page.click('#btn_save')
    await page.components.alertHaveText('Registro salvo com sucesso!')

    //Edição
    await page.click('a[title="Editar"]')

    //Dados
    await page.fill('input[name="nome"]', 'Teste Automatizado 2')
    await page.fill('#cpf', '')
    await page.fill('#cpf', '48086852059')

    //Parentesco
    await page.locator('#select2-parentesco-container').click()
    await page.locator('li:has-text("pai")').first().click()

    //Dados
    await page.waitForSelector('#sexo')
    await page.selectOption('#sexo', 'M')
    await page.fill('#dt_nascimento', '23052024')
    await page.fill('#telefone', '7133333333')
    await page.fill('#whatsapp', '71999990000')
    await page.fill('#email', 'automatizado2@gmail.com')

    //Save + Validação de mensagem
    await page.click('#btn_save')
    await page.components.alertHaveText('Registro editado com sucesso!')

    //Exclusão
    await page.click('a[title="Excluir"]')
    await page.components.alertHaveText('Registro deletado com sucesso!')
})