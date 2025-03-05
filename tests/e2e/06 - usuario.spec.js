const { test, expect } = require('../support')
const { executeSQL } = require('../support/database')

test('Criação, edição, alteração de senha e reset de senha de Usuário', async ({ page }) => {
    await page.login.loginIn()
    await page.components.setupDialogListener()

    //Usuários
    await page.locator('a[href$="users"]').click()
    await page.waitForTimeout(500)
    await page.locator('//input[contains(@placeholder, "Filtro")]').click()

    //Novo
    await page.locator('a[href$="novo"]').click()
    
    //Dados
    await page.fill('#nome', 'Novo Teste Automatizado')
    await page.fill('#email', 'automatizado@gmail.com')
    await page.waitForSelector('#ativo')
    await page.selectOption('#ativo', '0')
    await page.waitForSelector('#perfil')
    await page.selectOption('#perfil', '0')

    //Save + validação de mensagem
    await page.click('button[type=submit]')
    await page.components.alertHaveText('Usuário salvo com sucesso! a senha padrão é 123456.')

    //Consulta filtro > Edição
    await page.components.filterRegistrations('Novo Teste Automatizado')
    await page.click('a[title="Editar"]')

    //Dados
    await page.fill('#nome', 'Edição Teste Automatizado')
    await page.waitForSelector('#ativo')
    await page.selectOption('#ativo', '1')
    await page.waitForSelector('#perfil')
    await page.selectOption('#perfil', '7')

    //Save
    await page.click('button[type=submit]')

    //Meu Cadastro > Sair
    await page.locator('li.nav-item.dropdown a.nav-link').click()
    await page.click('a[href$="sair"]')

    //Login com novo usuário
    await page.getByPlaceholder('Email').fill('automatizado@gmail.com')
    await page.getByPlaceholder('Password').fill('123456')
    await page.click('button[type=submit]')
    await page.waitForTimeout(3000)

    //Meu Cadastro
    await page.locator('li.nav-item.dropdown a.nav-link').click()
    await page.locator('.dropdown-menu .dropdown-item', { hasText: 'Meu cadastro' }).click()

    //Alterar dados em "Meu Cadastro"
    await page.fill('#nome', 'Edição 2 Teste Automatizado')
    await page.fill('#email', 'automatizado2@gmail.com')
    await page.click('button[type=submit]')
    await page.waitForTimeout(1000)

    //Trocar Senha
    await page.click('a[href$="redefinir_senha"]')
    await page.waitForTimeout(1000)
    await page.fill('#password', '456789')
    await page.fill('#password2', '456789')
    await page.click('button[type=submit]')

    //Validação de mensagem
    await expect(page.locator('span[style="color: green;"]'))
    .toHaveText('Senha alterada com sucesso!')

    //Meu Cadastro > Sair
    await page.locator('li.nav-item.dropdown a.nav-link').click()
    await page.click('a[href$="sair"]')

    //Login com nova senha
    await page.getByPlaceholder('Email').fill('automatizado2@gmail.com')
    await page.getByPlaceholder('Password').fill('456789')
    await page.click('button[type=submit]')
    await page.waitForTimeout(3000)

    //Usuários
    await page.locator('a[href$="users"]').click()
    await page.waitForTimeout(500)

    //Filtro
    await page.components.filterRegistrations('Edição 2 Teste Automatizado')

    //Resetar senha + Validação de mensagem
    await page.click('a[href$="resetar_senha"]')
    await page.components.alertHaveText('Senha resetada para "123456" com sucesso!')

    //Meu Cadastro > Sair
    await page.locator('li.nav-item.dropdown a.nav-link').click()
    await page.click('a[href$="sair"]')

    //Login com nova senha
    await page.getByPlaceholder('Email').fill('automatizado2@gmail.com')
    await page.getByPlaceholder('Password').fill('123456')
    await page.click('button[type=submit]')
    await page.waitForTimeout(3000)

    //Adicionar novo filiado para validar login final
    await page.click('a[type="button"]')
    await page.waitForTimeout(500)

    //Exclusão do usuário no final (e não no começo como nos demais testes) para preservar a segurança do sistema, pois acima temos dados reais de acesso
    await executeSQL(`DELETE FROM users WHERE email = 'automatizado2@gmail.com';`)
})
