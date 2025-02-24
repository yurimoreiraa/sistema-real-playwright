const { test, expect } = require('../support')

test('Criação, edição e exclusão de tipo de dívida', async ({ page }) => {
    await page.login.loginIn()
    await page.components.setupDialogListener()

    //Central de Filiados > Cadastros > Tipo de Dívida
    await page.components.navigateSidebarMenu('0', 'tipo_divida')

    //Novo
    await page.click('a[type="button"]')

    //Dados
    await page.fill('#nome', 'Novo Teste Automatizado')
    await page.waitForSelector('#modalidade_id')
    await page.selectOption('#modalidade_id', 'valor_prefixado')
    await page.fill('#valor', '5999')
    await page.waitForSelector('#forma_pagamento')
    await page.selectOption('#forma_pagamento', 'SIAPE')
    await page.click('input[name="situacao_1"]')
    await page.click('input[name="situacao_12"]')
    await page.click('input[name="situacao_2"]')
    await page.click('input[name="situacao_10"]')
    await page.click('input[name="situacao_4"]')
    await page.click('input[name="situacao_5"]')
    await page.click('input[name="situacao_6"]')
    await page.click('input[name="situacao_7"]')

    //Save + validação de mensagem
    await page.click('button[type=submit]')
    await page.components.alertHaveText('Registro salvo com sucesso')

    //Consulta filtro > Edição
    await page.components.filterRegistrations('Novo Teste Automatizado')
    await page.click('a[title="Editar"]')

    //Dados
    await page.fill('#nome', 'Edição Teste Automatizado')
    await page.fill('#valor', '4999')
    await page.waitForSelector('#forma_pagamento')
    await page.selectOption('#forma_pagamento', 'deposito')
    await page.click('input[name="situacao_8"]')
    await page.click('input[name="situacao_11"]')

    //Save + validação de mensagem
    await page.click('button[type=submit]')
    await page.components.alertHaveText('Registro editado com sucesso!')

    //Consulta filtro
    await page.components.filterRegistrations('Edição Teste Automatizado')

    //Exclusão + validação de mensagem
    await page.click('a[title="Excluir"]')
    await page.components.alertHaveText('Registro deletado com sucesso!')
})
