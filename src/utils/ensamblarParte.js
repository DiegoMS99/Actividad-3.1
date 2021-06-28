const ensamblarParteAuto = (arregloParametro) => {
  return () => {
    return new Promise((resolve) => {
      const [keyParteAEnsamblar, valueParteAEnsamblar, tiempoEstablecido] = arregloParametro;
      setTimeout(() => {
        console.time(`Ensamblando ${keyParteAEnsamblar} tiempo`);
        resolve(`${keyParteAEnsamblar}: ${valueParteAEnsamblar}`);
        console.timeEnd(`Ensamblando ${keyParteAEnsamblar} tiempo`);
      }, tiempoEstablecido);
    });
  };
};


module.exports = {ensamblarParteAuto}