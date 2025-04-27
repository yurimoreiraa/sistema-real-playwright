const { test: base, expect } = require('@playwright/test')

const { Components } = require('./actions/components')
const { Login } = require('./actions/login')
const { Banco } = require('./actions/banco')
const { Api } = require('./api')


const test = base.extend({
    page: async ({ page }, use) => {

        const context = page

        context['components'] = new Components(page)
        context['login'] = new Login(page)
        context['banco'] = new Banco(page)

        await use(context)
    },
    request: async ({ request }, use) => {
        const context = request
        context['api'] = new Api(request)

        await use(context)
    }
})

export { test, expect }