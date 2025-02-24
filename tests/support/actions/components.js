const {expect} = require ('@playwright/test')

export class Components {
    constructor(page) {
        this.page = page
    }
    //Ao tentar excluir um registro, aperta em "confirmar", na caixa de diálogo
    async setupDialogListener() {
        // Configura o ouvinte de eventos para a página
        this.page.on('dialog', async dialog => {
            console.log(`Tipo de diálogo: ${dialog.type()}`)
            
            // Se for uma confirmação, aceite
            if (dialog.type() === 'confirm') {
                console.log(`Mensagem de diálogo: ${dialog.message()}`)
                console.log('Aceitando a confirmação automaticamente...')
                await dialog.accept()
            }
        })
    }

    //Valida o preenchimento automático do endereço ao informar o CEP
    async validateAddress(enderecoSeletor) {
        await this.page.fill('#cep', '49095780')
        await this.page.keyboard.press('Tab')
        await this.page.waitForTimeout(1000)

        // Captura os valores dos campos
        const endereco = await this.page.locator(enderecoSeletor).inputValue()
        const estado = await this.page.locator('#select2-estado_id-container').textContent()
        const municipio = await this.page.locator('#select2-municipio_id-container').textContent()
        const bairro = await this.page.locator('#bairro').inputValue()
    
        // Valida os valores
        expect(endereco).toBe('Rua Jasiel de Brito Côrtes')
        expect(estado).toBe(' Sergipe ')
        expect(municipio).toBe('Aracaju')
        expect(bairro).toBe('Jabotiana')
    }

    //Valida as mensagens de inclusão, edição e remoção de registro
    async alertHaveText(text) {
        const alert = this.page.locator('.alert')
        await expect(alert).toHaveText(text)
    }

    //Filtro na tela de filiados
    async filterMember(filiado) {
        await this.page.getByPlaceholder('Nome').fill(filiado)
        await this.page.click('button[type=submit]')
        await this.page.click('a[title="Editar"]')
        await this.page.waitForTimeout(500)
    }

    //Filtro nas telas de cadastros básicos
    async filterRegistrations(nomeRegistro) {
        await this.page.locator('//input[contains(@placeholder, "Filtro")]').fill(nomeRegistro)
        await this.page.click('button[type=submit]')
        await this.page.waitForTimeout(500)
    }

    //Acesso ao menu lateral
    async navigateSidebarMenu(posicao,cadastro) {
        await this.page.click('a[role="button"]')
        await this.page.locator('text=Cadastros').nth(posicao).click()
        await this.page.waitForTimeout(500)
        await this.page.click(`a[href$="${cadastro}"]`)
        await this.page.click('a[role="button"]')
    }
}