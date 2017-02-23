'use strict';

const express = require('express');
const routes = require('./server/routes');
const notFound = require('./server/middlewares/notFound');
const env = require('./env');

const port = env.PORT || 3000;
const app = express();

app.set('port', port);
app.use(routes);
app.use(notFound);


app.listen(port, () => {
  console.log(`Forecast started on port ${port}`);
});

module.exports = app;
