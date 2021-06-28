const express = require('express');
const morgan = require('morgan');
const rutasEnsamblarAuto = require('./router/ensamblar.router')
const app = express();

const puerto = 3000;

app.use(express.json());
app.use(morgan('dev'));
app.use('/api', rutasEnsamblarAuto)
app.listen(puerto, () => {
  console.log(`Servidor en el puerto: ${puerto}`);
});
