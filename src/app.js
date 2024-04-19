import express from 'express';
import bodyParser from 'body-parser';
import loadRoutes from './loaders/routes.js';
import errorMiddleware from './middlewares/error.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express'

const app = express();


const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Méthodologies de tests et tests unitaires',
    version: '1.0.0',
  },
};

const options = {
  swaggerDefinition,
  apis: ['src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use(bodyParser.json());
loadRoutes(app);
app.use(errorMiddleware);

export default app;
