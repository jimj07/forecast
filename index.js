'use strict';

const express = require('express');
const routes = require('./server/routes');
const notFound = require('./server/middlewares/notFound');
const env = require('./env');
const app = express();

app.set('port', env.PORT);
app.use(routes);
app.use(notFound);


app.listen(env.PORT, () => {
  console.log(`Forecast started on port ${env.PORT}`);
});

module.exports = app;
