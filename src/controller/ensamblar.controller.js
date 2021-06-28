const { AutosEnsamblar } = require('../data/Autos.json');
const { ensamblarParteAuto } = require('../utils/ensamblarParte');
const tiempoDefinidoParte = require('../config/index');
exports.controladorEnsamblarAuto = async (req, res) => {
  const resultadoPromesas = AutosEnsamblar.map(async (auto) => {
    const {
      marca,
      motor,
      puertas,
      carroceria,
      ruedas,
      tanque,
      asientos,
      ventanas,
      transmision,
    } = auto;
    console.log(`Ensamblando Auto de marca: ${marca}`);
    const arregloPromesas = [
      ensamblarParteAuto(['motor', motor, tiempoDefinidoParte.TIEMPO_MOTOR]),
      ensamblarParteAuto([
        'carroceria',
        carroceria,
        tiempoDefinidoParte.TIEMPO_CARROCERIA,
      ]),
      ensamblarParteAuto([
        'puertas',
        puertas,
        tiempoDefinidoParte.TIEMPO_PUERTAS,
      ]),
      ensamblarParteAuto(['ruedas', ruedas, tiempoDefinidoParte.TIEMPO_RUEDAS]),
      ensamblarParteAuto(['tanque', tanque, tiempoDefinidoParte.TIEMPO_TANQUE]),
      ensamblarParteAuto([
        'asientos',
        asientos,
        tiempoDefinidoParte.TIEMPO_ASIENTOS,
      ]),
      ensamblarParteAuto([
        'ventanas',
        ventanas,
        tiempoDefinidoParte.TIEMPO_VENTANAS,
      ]),
      ensamblarParteAuto([
        'transmision',
        transmision,
        tiempoDefinidoParte.TIEMPO_TRANSMISION,
      ]),
    ];
    const promesasEjecutadas = arregloPromesas.map((cb) => cb());
    try {
      const resultado = await Promise.all(promesasEjecutadas);
      return resultado;
    } catch (error) {
      return error;
    }
  });
  console.time('TIEMPO_TOTAL');
  Promise.all([...resultadoPromesas])
    .then((autosEnsamblados) => res.status(200).json(autosEnsamblados))
    .catch((error) => {
      res.status(500).json(error);
    });
  console.timeEnd('TIEMPO_TOTAL');
};
exports.controladorAgregarAuto = (req, res) => {
  const {
    marca,
    motor,
    puertas,
    carroceria,
    ruedas,
    tanque,
    asientos,
    ventanas,
    transmision,
  } = req.body;
  if (
    !marca ||
    !motor ||
    !puertas ||
    !carroceria ||
    !ruedas ||
    !tanque ||
    !asientos ||
    !ventanas ||
    !transmision
  ) {
    return res
      .status(400)
      .json(
        'Debes enviar todos los datos para agregar un auto a la lista de ensamblaje.'
      );
  }
  const autoAgregar = {
    id: Date.now(),
    marca,
    motor,
    puertas,
    carroceria,
    ruedas,
    tanque,
    asientos,
    ventanas,
    transmision,
  };
  //Se usa push en lugar de unshift al ser una estructura tipo COLA.
  AutosEnsamblar.push(autoAgregar);
  res.status(201).json({
    mensaje: 'Auto agregado a la lista de ensamblaje correctamente.',
    AutosEnsamblar,
  });
};
exports.controladorListarAutos = (req, res) => {
  if (!AutosEnsamblar.length) {
    return res.status(200).json('No existen Autos en la lista de ensamblaje.');
  }
  res.status(200).json(AutosEnsamblar);
};
