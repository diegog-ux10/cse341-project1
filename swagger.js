const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Express API for Users',
        description: 'This is a simple Express API for managing users',
    },
    host: 'localhost:3000',
    schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);