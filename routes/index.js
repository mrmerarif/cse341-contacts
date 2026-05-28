const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send(`
    <h1>Contacts API Running</h1>
    <p>Try these routes:</p>
    <ul>
      <li>/contacts</li>
    </ul>
  `);
});

module.exports = router;