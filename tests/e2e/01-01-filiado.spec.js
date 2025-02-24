const { test, expect } = require('../support')
const { executeSQL } = require('../support/database')

test('Criação e edição de filiado', async ({ page }) => {
    await page.login.loginIn()

    //Exclusão do filiado atual
    await executeSQL(`DELETE FROM filiado WHERE cpf = '56484641005';`)

    //Adicionar novo filiado
    await page.click('a[type="button"]')
    await page.waitForTimeout(1500)

    //Função no Sindicato
    await page.locator('#select2-sindicato_funcao_id-container').click()
    await page.locator('li:has-text("Padrão")').click()

    //Situação no Sinicato
    await page.locator('#sindicato_situacao_id').selectOption('1')

    //Data de Filiação
    await page.fill('#dt_filiacao', '06/08/2024')

    //Dados Pessoais
    await page.fill('#nome', 'Teste Automatizado')
    await page.fill('#cpf', '56484641005')
    await page.fill('#dt_nascimento', '18081994')
    await page.locator('#sexo').selectOption('F')

    //Estado Civil
    await page.locator('#select2-estado_civil-container').click()
    await page.locator('li:has-text("Casado(a)")').click()

    //Grau de Escolaridade
    await page.locator('#select2-filiado_escolaridade_id-container').click()
    await page.locator('li:has-text("Ensino Superior completo (Graduação)")').click()

    //Dados Pessoais
    await page.fill('#rg', '123456789')
    await page.fill('#orgao_expedidor', 'SSP-BA')
    await page.fill('#dt_emissao_rg', '18081994')
    await page.fill('#email', 'yuriteste@gmail.com')
    await page.fill('#telefone', '7130303030')
    await page.fill('#whatsapp', '71981311592')
    await page.fill('#complemento', 'Condomínio teste')
    await page.fill('#ponto_referencia', 'Condomínio')

    //Validação do endereço
    await page.components.validateAddress('#endereco')

    //Outros Dados
    await page.fill('#pai', 'Pai Teste')
    await page.fill('#mae', 'Mãe Teste')
    await page.fill('#naturalidade', 'Naturalidade')
    await page.fill('#nacionalidade', 'Nacionalidade')
    await page.locator('#tipo_sanguineo').selectOption('A-')
    await page.fill('#pis_pasep', 'PIS/PASEP');
    await page.fill('#cartao_sus', 'Cartão SUS')
    await page.fill('#titulo_eleitor', '123456')

    //Dados Bancários
    await page.locator('#select2-banco-container').click()
    await page.locator('li:has-text(" 237 - BANCO BRADESCO S.A. ")').click()
    await page.locator('#tipo_conta').selectOption('Conta Corrente')
    await page.fill('#agencia', '0001')
    await page.fill('#conta_dv', '123456')
    await page.fill('#n_operacao', '123456')

    //Save
    await page.click('#btn_save')

    //Edição
    await page.locator('#sindicato_situacao_id').selectOption('0')
    await page.fill('#dt_desfiliacao', '21052024')
    await page.fill('#desfiliacao_motivo', 'Desfiliação')
    await page.click('#btn_save')
    await page.click('#confirmarSim')
})