const { test, expect } = require('../support')
const { executeSQL } = require('../support/database')

test('Funcionalidade de filtros e confirmação de registro das contribuições', async ({ page }) => {
    await page.login.loginIn()

    //Central de Contribuições > Contribuições
    await page.locator('a[href$="contribuicao"]').click()

    //Preenchimento dos filtros
    await page.getByPlaceholder('Filiado').fill('Filiado Padrão')
    await page.getByPlaceholder('Descrição').fill('Edição Teste Automatizado')
    await page.getByPlaceholder('CPF').fill('04107431002')
    await page.selectOption('select[name="filiado_situacao_nome"]', 'ATIVO (A)')
    await page.locator('.select2-selection__arrow').click()
    await page.locator('li:has-text("OP - Órgão Padrão")').first().click()
    await page.getByPlaceholder('Competência Inicial').fill('022025')
    await page.getByPlaceholder('Competência Final').fill('022025')
    await page.getByPlaceholder('Valor Inicial').fill('3500')
    await page.getByPlaceholder('Valor final').fill('3500')
    await page.selectOption('#origem', '0')

    //Filtrar + validar contribuição + limpar
    await page.click('button[type="submit"]')
    await page.waitForSelector('a[href$="3/editar"]', { state: 'visible' })
    await page.click('a[type="submit"]')

    //Nova busca
    await page.getByPlaceholder('Filiado').fill('Filiado Padrão Dois')
    await page.getByPlaceholder('Descrição').fill('Novo Teste Automatizado')
    await page.getByPlaceholder('CPF').fill('73511180007')
    await page.selectOption('select[name="filiado_situacao_nome"]', 'APOSENTADO (A)')
    await page.locator('.select2-selection__arrow').click()
    await page.locator('li:has-text("OPD - Órgão Padrão Dois")').first().click()
    await page.getByPlaceholder('Competência Inicial').fill('012025')
    await page.getByPlaceholder('Competência Final').fill('012025')
    await page.getByPlaceholder('Valor Inicial').fill('2500')
    await page.getByPlaceholder('Valor final').fill('2500')
    await page.selectOption('#origem', '2')

    //Filtrar + validar contribuição + limpar
    await page.click('button[type="submit"]')
    await page.waitForSelector('a[href$="68/editar"]', { state: 'visible' })
    await page.click('a[type="submit"]')
})