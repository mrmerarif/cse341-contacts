const express = require('express');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = process.env.PORT || 3000;

const { connectToDatabase } = require('./db/connect');
const swaggerSpec = require('./swagger');

app.use(express.json());

app.use('/', require('./routes/index'));
app.use('/contacts', require('./routes/contacts'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });