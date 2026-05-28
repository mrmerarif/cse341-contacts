const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Contacts API',
      version: '1.0.0',
      description: 'Contacts API for CSE341'
    },
    servers: [
      {
        url: 'https://cse341-contacts-b6xa.onrender.com/'
      }
    ]
  },
  apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;