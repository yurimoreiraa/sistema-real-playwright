require('dotenv').config()
const { expect } = require('@playwright/test')

export class Login {
    constructor(page) {
        this.page = page
    }

    async loginIn() {
        await this.page.goto('/')
        await this.page.getByPlaceholder('Email').fill(process.env.LOGIN)
        await this.page.getByPlaceholder('Password').fill(process.env.SENHA)
        await this.page.getByRole('button', { name: ' Acesse ' }).click();
        await this.page.waitForTimeout(3000)
    }
}
