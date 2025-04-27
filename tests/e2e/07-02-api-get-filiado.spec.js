const { test, expect } = require('../support')

test('Dados do filiado via API deve carregar', async ({ request }) => {
    await request.api.setToken(process.env.API_CPF, process.env.API_NASCIMENTO)
    
    const response = await request.api.getFiliado()
    expect(response.ok()).toBeTruthy()

    const body = await response.json();
    expect(body).toMatchObject({
        "mensagem": "Acesso autorizado",
        "filiado": {
            "sindicato_funcao_id": 0,
            "sindicato_situacao_id": 1,
            "dt_desfiliacao": null,
            "cpf": process.env.API_CPF,
            "nome": "Filiado Padrão",
            "dt_nascimento": process.env.API_NASCIMENTO + ' 00:00:00',
            "sexo": "M",
            "estado_civil": "2",
            "filiado_escolaridade_id": 11,
            "rg": "123456",
            "orgao_expedidor": "SSP/SE",
            "dt_emissao_rg": "2025-04-27 00:00:00",
            "email": "testeapi@gmail.com",
            "telefone": "(71)33333-3333",
            "whatsapp": "(71)99999-9999",
            "cep": "49095-780",
            "endereco": "Rua Jasiel de Brito Côrtes",
            "complemento": "Casa",
            "estado_id": 28,
            "municipio_id": 2800308,
            "bairro": "Jabotiana",
            "ponto_referencia": "Ponto de Referência",
            "pai": "Nome do Pai",
            "mae": "Nome da Mãe",
            "naturalidade": "SALVADOR",
            "nacionalidade": "BRASILEIRO",
            "tipo_sanguineo": "B+",
            "pis_pasep": "123456",
            "cartao_sus": "123456",
            "titulo_eleitor": "123456",
            "carteira_prof": "123456",
            "carteira_prof_serie": "12356",
            "cartao": null,
            "cartao_venc": null,
            "dt_aniversario": null,
            "comemoracao": null,
            "banco": "77",
            "tipo_conta": "2",
            "agencia": "0001",
            "conta_dv": "12345-6",
            "n_operacao": "123456",
            "desfiliacao_motivo": null,
            "foto": null,
            "flo_status": null,
            "flo_ativo": null,
            "dt_filiacao": "2025-01-02 00:00:00",
            "numero": "999",
            "orgao_nome": "Órgão Padrão",
            "lotacao_nome": "Lotação Padrão",
            "filiado_situacao_nome": "ATIVO (A)",
            "filiado_situacao_grupo": "ativo",
            "siape": "123456"
        }
    })
})
