const { calcularPrecoPrazo } = require("correios-brasil");

export default async function calculateFreight(req, res) {
  const cep = JSON.parse(req.body);

  try {
    let args = {
      sCepOrigem: "87070030",
      sCepDestino: cep,
      nVlPeso: "1",
      nCdFormato: "1",
      nVlComprimento: "20",
      nVlAltura: "20",
      nVlLargura: "20",
      nCdServico: ["04014"], //Array com os códigos de serviço
      nVlDiametro: "0",
    };

    const precoFrete = await calcularPrecoPrazo(args).then((response) => {
      return response;
    });

    res.json(precoFrete);
  } catch (error) {
    console.error(error);
  }
}
