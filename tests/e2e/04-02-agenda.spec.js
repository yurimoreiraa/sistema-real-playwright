const { test, expect } = require('../support')

test('Validação dos dados na agenda', async ({ page }) => {
    await page.login.loginIn()

    //Central do Jurídico > Agenda
    await page.locator('a[href$="agenda"]').click()

    //Validação da listagem dos agendamentos
    await expect(page.getByRole('row', { name: '02 2º Instância Advogado Padrão Dois 31/03/2025 17:00 Não Fase Atual Padrão Dois' })).toBeVisible()
    await expect(page.getByRole('row', { name: '02 1º Instância Advogado Padrão 30/03/2025 16:00 Sim Fase Atual Padrão' })).toBeVisible()

    //Validação de link para lista de antamentos
    await page.getByPlaceholder('Advogado').click()
    await page.components.clickTableRow('02 1º Instância Advogado Padrão 30/03/2025 16:00 Sim Fase Atual Padrão', 'andamento')

    //Validação da listagem dos andamentos
    await expect(page.locator('.table tbody td').filter({ hasText: '2º Instância' })).toBeVisible()
    await expect(page.locator('.table tbody td').filter({ hasText: '1º Instância' })).toBeVisible()
})
