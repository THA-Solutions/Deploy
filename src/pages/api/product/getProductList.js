import { useState } from "react";
import db from "../../../lib/db";

export default async function handlerGetProduct(req, res) {
  try {
    const divisao = req.query.divisao;
    switch (divisao) {
      case "Solar":
        let produtos = await db.produto.findMany({
          where: { divisao: divisao },
          select: {
            titulo_produto: true,
            categoria: true,
            id_produto: true,
            marca_produto: true,
            preco: true,
            modelo: true,
            categoria: true,
            painel: {
              select: {
                potencia_modulo: true,
              },
            },
            inversor: {
              select: {
                potencia_saida: true,
                quantidade_mppt: true,
                tensao_saida: true,
              },
            },
            microinversores: {
              select: {
                quantidade_mppt: true,
                tensao_saida: true,
              },
            },
          },
          orderBy: {
            categoria: "asc",
          },
        });

        function dataToFilter() {
          const data = produtos.map((produto) => {
            const produtos = {
              //Tratamento de dados para retornar apenas os atributos necessarios
              categoria: produto.categoria,
              titulo: produto.titulo_produto,
              id_produto: produto.id_produto,
              marca: produto.marca_produto,
              preco: produto.preco,
              modelo: produto.modelo,
              potencia_modulo:
                //As estruturas condicionais abaixo verificam se o produto em questao possui determinado atributo, caso nao possua, retorna null
                produto.painel.length > 0
                  ? produto.painel[0].potencia_modulo
                  : null,
              potencia_saida:
                produto.inversor.length > 0
                  ? produto.inversor[0].potencia_saida
                  : null,
              quantidade_mppt:
                produto.inversor.length > 0
                  ? produto.inversor[0].quantidade_mppt
                  : produto.microinversores.length > 0
                  ? produto.microinversores[0].quantidade_mppt
                  : null,
              tensao_saida:
                produto.inversor.length > 0
                  ? produto.inversor[0].tensao_saida
                  : produto.microinversores.length > 0
                  ? produto.microinversores[0].tensao_saida
                  : null,
            };
            return produtos;
          });
          return data;
        }

        res.status(200).json(dataToFilter());
        break;

      case "Bebidas":
        const produto = await db.produto.findMany({
          where: { divisao: divisao },
          select: {
            titulo_produto: true,
            categoria: true,
            id_produto: true,
            marca_produto: true,
            preco: true,
            modelo: true,
            painel: {
              select: {
                potencia_modulo: true,
              },
            },
            inversor: {
              select: {
                potencia_saida: true,
                quantidade_mppt: true,
                tensao_saida: true,
              },
            },
            microinversores: {
              select: {
                quantidade_mppt: true,
                tensao_saida: true,
              },
            },
          },
          orderBy: {
            categoria: "asc",
          },
        });

        function dataToFilter2() {
          const data = produto.map((produto) => {
            const produtos = {
              //Tratamento de dados para retornar apenas os atributos necessarios
              categoria: produto.categoria,
              titulo: produto.titulo_produto,
              id_produto: produto.id_produto,
              marca: produto.marca_produto,
              preco: produto.preco,
              modelo: produto.modelo,
              potencia_modulo:
                //As estruturas condicionais abaixo verificam se o produto em questao possui determinado atributo, caso nao possua, retorna null
                produto.painel.length > 0
                  ? produto.painel[0].potencia_modulo
                  : null,
              potencia_saida:
                produto.inversor.length > 0
                  ? produto.inversor[0].potencia_saida
                  : null,
              quantidade_mppt:
                produto.inversor.length > 0
                  ? produto.inversor[0].quantidade_mppt
                  : produto.microinversores.length > 0
                  ? produto.microinversores[0].quantidade_mppt
                  : null,
              tensao_saida:
                produto.inversor.length > 0
                  ? produto.inversor[0].tensao_saida
                  : produto.microinversores.length > 0
                  ? produto.microinversores[0].tensao_saida
                  : null,
            };
            return produtos;
          });
          return data;
        }

        res.status(200).json(dataToFilter2());
    }
  } catch (error) {
    console.error("Erro ao carregar produto", error);
  }
}
