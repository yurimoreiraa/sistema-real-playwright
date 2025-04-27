const { test, expect } = require('../support')
const { executeSQL } = require('../support/database')

test('Criação e edição de processos', async ({ page }) => {
    await page.login.loginIn()

    //Exclusão dos processos atuais
    await executeSQL(`DELETE FROM processo WHERE id > 2;`)

    //Central do Jurídico > Processos
    await page.locator('a[href$="processo"]').click()

    //Novo
    await page.click('a[type="button"]')

    //Dados
    await page.fill('#num_processo', '123456')
    await page.selectOption('#vara_id', 'Vara e Tribunal Padrão')
    await page.selectOption('#advogado_id', 'Advogado Padrão')
    await page.fill('#autor_cabeca_input', 'filiado padrao')
    await page.click('text=Filiado Padrão - 041.074.310-02')
    await page.fill('#dt_ajuizamento', '30032025')
    await page.fill('#valor_causa', '10000')
    await page.selectOption('#reu_id', 'Réu Padrão')
    await page.selectOption('#tipo_processo', 'Individual')
    await page.fill('#objeto', 'Novo Teste Automatizado')
    await page.selectOption('#fase_atual_id', 'Fase Atual Padrão')
    await page.selectOption('#situacao_final', 'Julgado Procedente')

    //Save vínculo + validação de mensagem + Edição
    await page.click('button[type=submit]')
    await page.components.alertHaveText('Registro salvo com sucesso!')
    await page.locator('a[href$=editar]').nth(0).click()

    //Dados
    await page.fill('#num_processo', '456789')
    await page.selectOption('#vara_id', 'Vara e Tribunal Padrão Dois')
    await page.selectOption('#advogado_id', 'Advogado Padrão Dois')
    await page.fill('#autor_cabeca_input', 'filiado padrao dois')
    await page.click('text=Filiado Padrão Dois - 735.111.800-07')
    await page.fill('#dt_ajuizamento', '31032025')
    await page.fill('#valor_causa', '15000')
    await page.selectOption('#reu_id', 'Réu Padrão Dois')
    await page.selectOption('#tipo_processo', 'Coletivo/Plúrimo')
    await page.fill('#objeto', 'Edição Teste Automatizado')
    await page.selectOption('#fase_atual_id', 'Fase Atual Padrão Dois')
    await page.selectOption('#situacao_final', 'Julgado Procedente em parte')

    //Save vínculo + validação de mensagem + Edição
    await page.click('button[type=submit]')
    await page.components.alertHaveText('Registro editado com sucesso!')
})

test('Criação, edição e exclusão de andamentos', async ({ page }) => {
    await page.login.loginIn()
    await page.components.setupDialogListener()

    //Central do Jurídico > Processos > Andamento
    await page.locator('a[href$="processo"]').click()
    await page.getByRole('row', { name: 'Filiado Padrão Processo R$ 0,00' })
        .locator('a[href$="editar"]')
        .click()
    await page.locator('a[href$="andamento"]').click()
    await page.click('a[type="button"]')

    //Dados com tipo Agenda
    await page.selectOption('#instancia', '1º Instância')
    await page.selectOption('#tipo_anotacao', 'Agenda')
    await page.selectOption('#advogado_id', 'Advogado Padrão')
    await page.selectOption('#audiencia', 'online')
    await page.fill('#dt_audiencia', '30032025')
    await page.fill('#hora_audiencia', '1600')
    await page.selectOption('#fase_atual', 'Fase Atual Padrão')
    await page.selectOption('#pendencia', 'Não')
    await page.locator('div[role=textbox]').fill('Anotação teste')

    //Save vínculo + validação de mensagem + Edição
    await page.click('button[type=submit]')
    await page.components.alertHaveText('Registro salvo com sucesso!')
    await page.locator('a[title=Editar]').click()

    //Dados com tipo Ficha de Andamento
    await page.selectOption('#instancia', '2º Instância')
    await page.selectOption('#tipo_anotacao', 'Ficha de Andamento')
    await page.selectOption('#advogado_id', 'Advogado Padrão Dois')
    await page.fill('#prazo', '31032025')
    await page.selectOption('#fase_atual', 'Fase Atual Padrão Dois')
    await page.selectOption('#pendencia', 'Sim')
    await page.locator('div[role=textbox]').fill('Anotação teste edição')

    //Save vínculo + validação de mensagem + Edição
    await page.click('button[type=submit]')
    await page.components.alertHaveText('Registro editado com sucesso!')
    await page.locator('a[title=Editar]').click()

    //Dados com tipo Agenda e Ficha de Andamento
    await page.selectOption('#instancia', 'Processo Administrativo')
    await page.selectOption('#tipo_anotacao', 'Agenda e Ficha de Andamento')
    await page.selectOption('#advogado_id', 'Advogado Padrão')
    await page.selectOption('#audiencia', 'presencial')
    await page.fill('#dt_audiencia', '30032025')
    await page.fill('#hora_audiencia', '1500')
    await page.fill('#prazo', '30032025')
    await page.selectOption('#fase_atual', 'Fase Atual Padrão')
    await page.selectOption('#pendencia', 'Não')
    await page.locator('div[role=textbox]').fill('Anotação teste edição dois')

    //Save vínculo + validação de mensagem
    await page.click('button[type=submit]')
    await page.components.alertHaveText('Registro editado com sucesso!')

    //Exclusão + validação de mensagem
    await page.click('a[title="Excluir"]')
    await page.components.alertHaveText('Registro deletado com sucesso!')
})

test('Adição, validação e exclusão de autores', async ({ page }) => {
    await page.login.loginIn()
    await page.components.setupDialogListener()

    //Central do Jurídico > Processos > Autores
    await page.locator('a[href$="processo"]').click()
    await page.components.clickTableRow('Filiado Padrão Processo R$ 0,00', 'editar')
    await page.locator('a[href$="autor"]').click()
    await page.locator('a[href$="lista_filiados"]').click()

    //Vincular filiados + Validar mensagem
    await page.components.clickTableRow('Filiado Adesão e Contribuição', 'vincular')
    await page.components.alertHaveText('Filiado vinculado com sucesso!')
    await page.components.clickTableRow('Filiado Padrão Dois', 'vincular')
    await page.components.alertHaveText('Filiado vinculado com sucesso!')
    await page.components.clickTableRow('Filiado Vínculo', 'vincular')
    await page.components.alertHaveText('Filiado vinculado com sucesso!')

    //Retornar e validar listagem dos vinculados
    await page.locator('a[href$="autor"]').nth(1).click()
    await expect(page.getByRole('row', { name: '678.055.800-14 Filiado Vínculo' })).toBeVisible()
    await expect(page.getByRole('row', { name: '735.111.800-07 Filiado Padrão Dois' })).toBeVisible()
    await expect(page.getByRole('row', { name: '385.567.280-65 Filiado Adesão e Contribuição' })).toBeVisible()

    //Desvincular filiados
    await page.locator('a[href$="lista_filiados"]').click()
    await page.components.clickTableRow('Filiado Adesão e Contribuição', 'excluir')
    await page.components.alertHaveText('Filiado removido com sucesso!')
    await page.components.clickTableRow('Filiado Padrão Dois', 'excluir')
    await page.components.alertHaveText('Filiado removido com sucesso!')
    await page.components.clickTableRow('Filiado Vínculo', 'excluir')
    await page.components.alertHaveText('Filiado removido com sucesso!')

    //Retornar e validar listagem dos vinculados
    await page.locator('a[href$="autor"]').nth(1).click()
    await expect(page.getByRole('row', { name: '678.055.800-14 Filiado Vínculo' })).not.toBeVisible()
    await expect(page.getByRole('row', { name: '735.111.800-07 Filiado Padrão Dois' })).not.toBeVisible()
    await expect(page.getByRole('row', { name: '385.567.280-65 Filiado Adesão e Contribuição' })).not.toBeVisible()
})

test('Adição, validação e exclusão de apensados', async ({ page }) => {
    await page.login.loginIn()
    await page.components.setupDialogListener()

    //Central do Jurídico > Processos > Apensados
    await page.locator('a[href$="processo"]').click()
    await page.components.clickTableRow('Filiado Padrão Processo R$ 0,00', 'editar')
    await page.locator('a[href$="apensado"]').click()
    await page.locator('a[href$="lista_processos"]').click()

    //Vincular processos + Validação de mensagem
    await page.components.clickTableRow('02', 'vincular')
    await page.components.alertHaveText('Processo vinculado com sucesso!')

    //Retornar e validar listagem dos processos
    await page.locator('a[href$="apensado"]').nth(1).click()
    await expect(page.getByRole('row', { name: '02 Filiado Padrão Dois 	Apensados R$ 0,00' })).toBeVisible()

    //Desvincular processos + Validação de mensagem
    await page.locator('a[href$="lista_processos"]').click()
    await page.components.clickTableRow('02', 'excluir')
    await page.components.alertHaveText('Processo removido com sucesso!')

    //Retornar e validar listagem dos processos
    await page.locator('a[href$="apensado"]').nth(1).click()
    await expect(page.getByRole('row', { name: '02 Filiado Padrão Dois 	Apensados R$ 0,00' })).not.toBeVisible()
})