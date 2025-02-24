const { test, expect } = require('../support')
const { executeSQL } = require('../support/database')

test('Criação, edição e estorno de movimentação', async ({ page }) => {
    await page.login.loginIn()

    //Exclusão das movimentações atuais
    await executeSQL(`DELETE FROM movimentacao WHERE id > 0';`)

    //Central de Finanças > Movimentações
    await page.locator('a[href$="movimentacao"]').click()

    //Novo
    await page.click('a[type="button"]')

    // Obtém a data atual no formato "DD/MM/AAAA"
    const dataAtual = new Date().toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    })

    //Validação se o campo Data Lançamento está vindo com a data atual
    const dataLancamento = await page.locator('#dt_lancamento').inputValue()
    expect(dataLancamento).toBe(dataAtual)

    //Dados
    await page.fill('#dt_vencimento', '19022025')
    await page.type('#valor_bruto', '30000')
    await page.keyboard.press('Tab')

    //Validação se o campo Valor Líquido foi preenchido automaticamente
    const valorLiquido = await page.locator('#valor_liquido').inputValue()
    const valorCorrigido = valorLiquido.replace(/\u00A0/g, '') // Remove espaços invisíveis
    expect(valorCorrigido).toBe('R$300,00')

    //Dados
    await page.fill('#taxa', '1000')
    await page.fill('#valor_taxa', '1000')
    await page.fill('#imposto', '1000')
    await page.fill('#desconto', '1000')
    await page.fill('#multa', '1000')
    await page.fill('#juros', '1000')
    await page.fill('#imposto', '1000')

    //Validação se o campo Nº Parcela foi preenchido automaticamente
    const valorParcela = await page.locator('#parcela_numero').inputValue()
    expect(valorParcela).toBe('01/01')

    //Dados
    await page.selectOption('#tipo', 'Entrada')


    //Em andamento
})