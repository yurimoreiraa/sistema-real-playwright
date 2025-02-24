const { test, expect } = require('../support')
const { executeSQL } = require('../support/database')

test('Criação e edição de plano de contas pai', async ({ page }) => {
    await page.login.loginIn()

    //Exclusão do plano de contas atual
    await executeSQL(`DELETE FROM plano_conta WHERE nome = 'Edição Teste Automatizado';`)

    //Central de Finanças > Cadastros > Plano de Contas
    await page.components.navigateSidebarMenu('1','plano_conta')

    //Novo
    await page.click('a[type="button"]')

    //Dados
    await page.fill('#nome', 'Novo Teste Automatizado')
    await page.selectOption('#tipo', 'Receita')
    await page.selectOption('#ativo', 'Não')

    //Save + validação de mensagem
    await page.click('button[type=submit]')
    await page.components.alertHaveText('Registro salvo com sucesso!')

    //Consulta filtro > Edição
    await page.components.filterRegistrations('Novo Teste Automatizado')
    await page.click('a[title="Editar"]')

    //Dados
    await page.fill('#nome', 'Edição Teste Automatizado')
    await page.selectOption('#tipo', 'Despesa')
    await page.selectOption('#ativo', 'Sim')

    //Save + validação de mensagem
    await page.click('button[type=submit]')
    await page.components.alertHaveText('Registro editado com sucesso!')
})

test('Criação, edição e exclusão de plano de contas filho', async ({ page }) => {
    await page.login.loginIn()
    await page.components.setupDialogListener()

    //Central de Finanças > Cadastros > Plano de Contas
    await page.components.navigateSidebarMenu('1','plano_conta')

    //Consulta filtro
    await page.components.filterRegistrations('Plano de Conta Receita')

    //Criação de plano de contas filho
    await page.click('a[href$="filho"]')
    await page.click('a[type="button"]')

    //Validação do plano e tipo do pai
    const campoPlano = await page.locator('div.form-group:has(label:text("Plano de Contas")) input').inputValue()
    expect(campoPlano).toBe('Plano de Conta Receita')
    const campoTipo = await page.locator('#tipo').inputValue()
    expect(campoTipo).toBe('receita')

    //Dados
    await page.fill('#nome', 'Novo Filho Automatizado')

    //Save + validação de mensagem
    await page.click('button[type=submit]')
    await page.components.alertHaveText('Registro salvo com sucesso!')

    //Edição
    await page.locator('a[title="Editar"]').nth(1).click()

    //Dados
    await page.fill('#nome', 'Edição Filho Automatizado')

    //Validação do código
    const campoCodigo = await page.locator('#codigo').inputValue()
    expect(campoCodigo).toBe('01.02')

    //Save + validação de mensagem
    await page.click('button[type=submit]')
    await page.components.alertHaveText('Registro editado com sucesso!')

    //Exclusão + validação de mensagem
    await page.locator('a[title="Excluir"]').nth(1).click()
    await page.components.alertHaveText('Registro deletado com sucesso!')
})
