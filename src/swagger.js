import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'Youtube', version: '1.0.0' },
    servers: [{ url: 'http://localhost:8000' }],
  },
  apis: ['./src/routes/*.js']  // point to your route files
};
export const specs = swaggerJsdoc(options);
export const swaggerUI = swaggerUi;
