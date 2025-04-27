const { test, expect } = require('../support')
const { executeSQL } = require('../support/database')

test('Criação e edição de contribuição', async ({ page }) => {
    await page.login.loginIn()

    //Exclusão da contribuição atual
    await executeSQL(`DELETE FROM filiado_contribuicao WHERE filiado_id = '2';`)

    //Localizar o filiado
    await page.components.filterMember('Filiado Adesão e Contribuição')

    //Aba > Vínculo > Financeiro
    await page.locator('li:has-text("Vínculos")').click()
    await page.click('a[title="Financeiro"]')

    //Contribuições + Nova Contrbuição
    await page.locator('li:has-text("Contribuições Sindicais")').click()
    await page.click('a[type="button"]')

    //Dados
    await page.fill('#descricao', 'Contribuição Teste Automatizado')
    await page.fill('#valor', '5999')
    await page.fill('#data', '052024')
    await page.keyboard.press('Tab')

    //Origem
    await page.waitForSelector('#origem')
    await page.selectOption('#origem', { value: '2' })

    //Save contribuição + Vaidação de mensagem + editar
    await page.click('button[type=submit]')
    await page.components.alertHaveText('Registro salvo com sucesso!')
    await page.click('a[title="editar"]')

    //Dados
    await page.fill('#descricao', 'Contribuição Teste Automatizado Edição')
    await page.fill('#valor', '7999')
    await page.fill('#data', '042024')
    await page.keyboard.press('Tab')

    //Origem
    await page.waitForSelector('#origem')
    await page.selectOption('#origem', { value: '0' })

    //Save contribuição + validação de mensagem
    await page.click('button[type=submit]')
    await page.components.alertHaveText('Registro editado com sucesso!')
})