require('dotenv').config()
const { expect } = require('@playwright/test')

export class Api {

    constructor(request) {
        this.baseApi = process.env.BASE_API
        this.request = request
        this.token = undefined
    }

    async setToken(cpf, nascimento) {
        const response = await this.request.post(this.baseApi + '/login/filiado', {
            data: {
                cpf: cpf,
                dt_nascimento: nascimento
            }
        })


        const body = JSON.parse(await response.text())
        this.token = 'Bearer ' + body.token

        return response;
    }

    async getFiliado() {
        const response = await this.request.get(this.baseApi + '/get/filiado', {
            headers: {
                Authorization: this.token,
                Accept: 'application/json'
            }
        })

        const body = JSON.parse(await response.text())
        return response;
    }

    async postFiliado() {
        const response = await this.request.post(this.baseApi + '/post/filiado/update', {
            headers: {
                Authorization: this.token,
                ContentType: 'application/json',
            },
            data: {
                    "sindicato_funcao_id": 0,
                    "sindicato_situacao_id": 1,
                    "dt_desfiliacao": null,
                    "cpf": process.env.API_CPF2,
                    "nome": "Filiado Padrão Dois",
                    "dt_nascimento": process.env.API_NASCIMENTO2 + ' 00:00:00',
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
                    "numero": "999"
                }
            })

            const body = JSON.parse(await response.text())
            return response;
        }
    }