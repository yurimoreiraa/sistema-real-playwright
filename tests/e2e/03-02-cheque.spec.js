const { test, expect } = require('../support')

test('Criação, edição e exclusão de cheque', async ({ page }) => {
    await page.login.loginIn()
    await page.components.setupDialogListener()

    //Central de Finanças > Cheque
    await page.locator('a[href$="cheque"]').click()
    await page.waitForTimeout(500)
    await page.locator('//input[contains(@placeholder, "Filtro")]').click()
 
    //Novo
    await page.click('a[type="button"]')

    //Dados
    await page.fill('#nome', 'Novo Teste Automatizado')

    //Save + validação de mensagem
    await page.click('button[type=submit]')
    await page.components.alertHaveText('Registro salvo com sucesso!')

    //Consulta filtro > Edição
    await page.components.filterRegistrations('Novo Teste Automatizado')
    await page.click('a[title="Editar"]')

    //Dados
    await page.fill('#nome', 'Edição Teste Automatizado')
    await page.components.validateFieldValue('#valor_numeral_x', '260')
    await page.components.validateFieldValue('#valor_numeral_y', '70')
    await page.components.validateFieldValue('#valor_extenso_x', '130')
    await page.components.validateFieldValue('#valor_extenso_y', '80')
    await page.components.validateFieldValue('#favorecido_x', '130')
    await page.components.validateFieldValue('#favorecido_y', '93')
    await page.components.validateFieldValue('#cidade_x', '200')
    await page.components.validateFieldValue('#cidade_y', '100')
    await page.components.validateFieldValue('#dia_x', '230')
    await page.components.validateFieldValue('#dia_y', '100')
    await page.components.validateFieldValue('#mes_x', '245')
    await page.components.validateFieldValue('#mes_y', '100')
    await page.components.validateFieldValue('#ano_x', '280')
    await page.components.validateFieldValue('#ano_y', '100')

    //Save + validação de mensagem
    await page.click('button[type=submit]')
    await page.components.alertHaveText('Registro editado com sucesso!')

    //Consulta filtro > Edição > Restaurar configuração inicial
    await page.components.filterRegistrations('Edição Teste Automatizado')
    await page.click('a[title="Editar"]')
    await page.click('a[href$="restaurar_padrao"]')
    await page.components.alertHaveText('Configuração restaurada com sucesso.')

    //Dados
    await page.components.validateFieldValue('#nome', 'Edição Teste Automatizado')
    await page.components.validateFieldValue('#valor_numeral_x', '260')
    await page.components.validateFieldValue('#valor_numeral_y', '70')
    await page.components.validateFieldValue('#valor_extenso_x', '130')
    await page.components.validateFieldValue('#valor_extenso_y', '80')
    await page.components.validateFieldValue('#favorecido_x', '130')
    await page.components.validateFieldValue('#favorecido_y', '93')
    await page.components.validateFieldValue('#cidade_x', '200')
    await page.components.validateFieldValue('#cidade_y', '100')
    await page.components.validateFieldValue('#dia_x', '230')
    await page.components.validateFieldValue('#dia_y', '100')
    await page.components.validateFieldValue('#mes_x', '245')
    await page.components.validateFieldValue('#mes_y', '100')
    await page.components.validateFieldValue('#ano_x', '280')
    await page.components.validateFieldValue('#ano_y', '100')

    //Save + validação de mensagem > Filtro
    await page.click('button[type=submit]')
    await page.components.alertHaveText('Registro editado com sucesso!')
    await page.components.filterRegistrations('Edição Teste Automatizado')

    //Exclusão + validação de mensagem
    await page.click('a[title="Excluir"]')
    await page.components.alertHaveText('Registro deletado com sucesso!')

    //Adicionar fluxo de validação do PDF
})