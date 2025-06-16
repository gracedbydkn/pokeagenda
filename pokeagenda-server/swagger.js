const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API Pokéagenda',
            version: '1.0.0',
            description: 'Documentação da API utilizada no projeto A3 pras UCs de Usabilidade (UDWMJ) e Sistemas Distribuídos (SDM) para realizar um site de agendas com tema de pokémon'
        },
        servers: [
            {
                url: 'http://localhost:6006'
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                },
            },
        },
    },
    apis: ['./routes/*.js'],
};

const specs = swaggerJsDoc(options);

module.exports = { swaggerUi, specs };