const { test, expect } = require('../support')
const { executeSQL } = require('../support/database')

test('Criação, edição e cancelamento de protocolo', async ({ page }) => {
    await page.login.loginIn()
    await page.components.setupDialogListener()

    //Exclusão dos protocolos atuais
    await executeSQL(`DELETE FROM protocolo WHERE id > 0;`)

    //Protocolo
    await page.locator('a[href$="protocolo"]').click()

    //Novo
    await page.click('a[type="button"]')

    //Valida se o número é null
    const numeroIsNull = await page.locator('#numero').inputValue()
    expect(numeroIsNull).toBe('')

    //Dados
    await page.fill('#assunto', 'Novo Teste Automatizado')
    await page.fill('#filiado_nome', 'filiado padrao')
    await page.click('text=Filiado Padrão - 041.074.310-02')
    await page.selectOption('#destinatario_id', 'Suporte')
    await page.locator('div[role=textbox]').fill('Anotação teste')

    //Save + validação de mensagem
    await page.click('button[type=submit]')
    await page.components.alertHaveText('Registro salvo com sucesso!')

    //Validação de notificação de protocolo
    await page.click('.far.fa-bell')
    const mensagemTramitacao = page.locator('text=Você tem um novo trâmite de protocolo.')
    await expect(mensagemTramitacao).toBeVisible()
    await mensagemTramitacao.click()

    //Consulta filtro + validação de situação do protocolo + Edição
    await page.getByPlaceholder('Assunto').fill('Novo Teste Automatizado')
    await page.click('button[type=submit]')
    await expect(page.locator('small.badge.badge-warning')).toHaveText('Pendente')
    await page.click('a[title="Editar"]')

    //Valida se o número é não null
    const numeroIsNotNull = await page.locator('#numero').inputValue()
    expect(numeroIsNotNull).not.toBe('')

    //Dados
    await page.fill('#assunto', 'Edição Teste Automatizado')
    await page.fill('#filiado_nome', 'filiado padrao dois')
    await page.click('text=Filiado Padrão Dois - 735.111.800-07')
    await page.locator('div[role=textbox]').fill('Anotação teste edição')

    //Save + validação de mensagem
    await page.click('button[type=submit]')
    await page.components.alertHaveText('Registro editado com sucesso!')

    //Consulta filtro > Edição
    await page.getByPlaceholder('Assunto').fill('Edição Teste Automatizado')
    await page.click('button[type=submit]')
    await page.click('a[title="Editar"]')

    //Cancelamento de protocolo + Validação de mensagem
    await page.click('button[data-target="#modal-cancelar"]')
    await page.fill('#comentario', 'Cancelamento de protocolo')
    await page.locator('button.btn-primary:has-text("Cancelar Protocolo")').click()
    await page.components.alertHaveText('Registro cancelado com sucesso!')

    //Validação de notificação de protocolo
    await page.click('.far.fa-bell')
    const mensagemCancelamento = page.locator('text=Protocolo cancelado.')
    await expect(mensagemCancelamento).toBeVisible()
    await mensagemCancelamento.click()

    //Consulta filtro + validação de situação do protocolo = cancelado
    await page.getByPlaceholder('Assunto').fill('Edição Teste Automatizado')
    await page.click('button[type=submit]')
    await expect(page.locator('small.badge.badge-danger')).toHaveText('Cancelado')
})

// test('Comentário, tramitações, encaminhamento e conclusão', async ({ page }) => {
//     await page.login.loginIn()
//     await page.components.setupDialogListener()

//     //Exclusão dos protocolos atuais
//     await executeSQL(`DELETE FROM protocolo WHERE id > 0;`)

//     //Protocolo
//     await page.locator('a[href$="protocolo"]').click()

//     //Novo
//     await page.click('a[type="button"]')

//     //Valida se o número é null
//     const numeroIsNull = await page.locator('#numero').inputValue()
//     expect(numeroIsNull).toBe('')


//     //Dados
//     await page.fill('#assunto', 'Novo Teste Automatizado')
//     await page.fill('#filiado_nome', 'filiado padrao')
//     await page.click('text=Filiado Padrão - 041.074.310-02')
//     await page.selectOption('#destinatario_id', 'Suporte')
//     await page.locator('div[role=textbox]').fill('Anotação teste')

//     //Save + validação de mensagem
//     await page.click('button[type=submit]')
//     await page.components.alertHaveText('Registro salvo com sucesso!')

//     //Consulta filtro > Edição
//     await page.getByPlaceholder('Assunto').fill('Novo Teste Automatizado')
//     await page.click('button[type=submit]')
//     await page.click('a[title="Editar"]')

//     //Valida se o número é não null
//     const numeroIsNotNull = await page.locator('#numero').inputValue()
//     expect(numeroIsNotNull).not.toBe('')

//     //Dados
//     await page.fill('#assunto', 'Edição Teste Automatizado')
//     await page.fill('#filiado_nome', 'filiado padrao dois')
//     await page.click('text=Filiado Padrão Dois - 735.111.800-07')
//     await page.locator('div[role=textbox]').fill('Anotação teste edição')

//     //Save + validação de mensagem
//     await page.click('button[type=submit]')
//     await page.components.alertHaveText('Registro editado com sucesso!')
// })
