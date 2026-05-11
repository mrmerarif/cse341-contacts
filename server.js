const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const { connectToDatabase } = require('./db/connect');

app.use(express.json());
app.use('/', require('./routes/index'));

app.use('/contacts', require('./routes/contacts'));


connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
