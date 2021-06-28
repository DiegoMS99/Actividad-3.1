const { Router } = require('express');
const router = Router();
const {
  controladorEnsamblarAuto,
  controladorAgregarAuto,
  controladorListarAutos
} = require('../controller/ensamblar.controller');
router.get('/ensamblar', controladorEnsamblarAuto);
router.post('/agregar', controladorAgregarAuto);
router.get('/listar', controladorListarAutos);

module.exports =  router 
