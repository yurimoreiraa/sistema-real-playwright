const { test: base, expect } = require('@playwright/test')

const { Components } = require('./actions/components')
const { Login } = require('./actions/login')

const test = base.extend({
    page: async ({ page }, use) => {
        
        const context = page

        context['components'] = new Components(page)
        context['login'] = new Login(page)

        await use(page)
    }
})

export { test, expect }