const nodemailer = require("nodemailer");
import UInumber from "@/UI/UInumber";

import logo from "../../../../public/growatt/57566-9.png";
import Image from "next/image";

export default async function sendEmail(req, res) {
  try {
    var transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD,
      },
    });
    const { itemCart, total, session, address } = req.body;

    const items = itemCart.map((item) => {
      return `
        <div 
          style=
            "background-color: lightgray; 
            font-size: 18px; 
            padding: 1em; 
            border-radius: 10px; 
            justify-content: center; 
            align-items: center;
            margin-bottom: 1em;"
        >
        <Image src=${`/growatt/57566-9.png`} alt="Imagem do Produto" />
          <h4>${item.titulo_produto}</h4>
          <h4>Quantidade: ${item.quantidade}</h4>
          <h4>Total do produto: ${item.total}</h4>

        </div>`;
    });

    const emailTemplate = `
    <div style="padding: 1em; display: block;">
      <div style="justify-content: space-between;">
      <Image src=${logo} alt="logo" />
        <h1 style="text-align: center; font-size: 30px;">Novo Pedido Realizado</h1>
      </div>
      
      <hr />
      <h2 style="font-size: 25px; margin-top: 1em">Cliente</h2>
      <div 
        style=
          "background-color:lightgray;
          display: flex;
          justify-content: space-between;
          padding: 1em;
          border-radius: 10px;
          align-items: center;
          margin-bottom: 1em;"
      >
        <div style="width: 50%">
          <h3 style="font-size: 20px">Dados pessoais</h3>
          <div style="font-size: 15px">
            <h4>Nome: ${session.user.name}</h4>
            <h4>Email:  ${session.user.email}</h4>
            <h4>Telefone: ${session.user.phone}</h4>
          </div>
        </div>    
        <div style="width: 50%">
          <h3 style="font-size: 20px">Endereço</h3>
          <div style="font-size: 15px">
            <h4>CEP : ${address[0].cep}</h4>        
            <h4>Logradouro : ${address[0].logradouro}</h4>        
            <h4>Número : ${address[0].numero}</h4> 
            <h4>Bairro : ${address[0].bairro}</h4> 
            <h4>Complemento : ${address[0].complemento}</h4> 
            <h4>Cidade : ${address[0].cidade}</h4>        
            <h4>Estado : ${address[0].estado}</h4>        
          </div>
        </div>
      </div>

      <hr />
      <h2 style="font-size: 25px;">Produtos</h2>
      ${items}
      
      <hr />
      <div style="background-color: lightblue; border-radius: 10px; padding: 1em; margin-top: 1em">
        <h2>Valor total da compra: ${total}</h2>
      </div>
    </div>`;

    const message = {
      from: "tecnologia@thasolutions.com.br",
      to: "tecnologia@thasolutions.com.br",
      subject: "Novo pedido - FGL Distribuidora",
      html: emailTemplate,
    };

    transport.sendMail(message);
    res.json({ erro: false, mensagem: "Email enviado com sucesso" });
  } catch (error) {
    console.error("Erro no envio do Email :", error);
  }
}
