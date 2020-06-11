const Path = require('path');
const port = process.env.PORT || 8080;

const express = require('express');
const app = express();

app.use(express.static(Path.join(process.cwd(), 'dist', 'client')));
app.get('/api/products', (request, response) => {
  const data = require('./catalog');
  response.json(data);
});

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
