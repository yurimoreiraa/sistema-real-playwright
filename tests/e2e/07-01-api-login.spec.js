const { test, expect } = require('../support')

test('Login via API deve funcionar', async ({ request }) => {
    const response = await request.api.setToken(process.env.API_CPF, process.env.API_NASCIMENTO)
    expect(response.ok()).toBeTruthy()
})

test('Login via API deve falhar, CPF inválido', async ({ request }) => {
    const response = await request.api.setToken('67592873044', process.env.API_NASCIMENTO)
    expect(response.ok()).toBeFalsy()

    const body = await response.json()
    expect(body.erro).toBe('Acesso Invalido')
})

test('Login via API deve falhar, data de nascimento inválida', async ({ request }) => {
    const response = await request.api.setToken(process.env.API_CPF, '2025-04-27')
    expect(response.ok()).toBeFalsy()

    const body = await response.json()
    expect(body.erro).toBe('Acesso Invalido')
})