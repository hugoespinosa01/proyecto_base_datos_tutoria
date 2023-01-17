// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const connection = require("../backend/connection");
const fs = require("fs");
const path = require("path");

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getProducts();
    case "POST":
      return createProduct();
    case "PUT":
      return updateProduct();
    case "DELETE":
      return deleteProduct();
    default:
      return res.status(405).end(`Método ${req.method} No Permitido`);
  }

  function getProducts() {
    connection.query(
      "SELECT * FROM producto",
      (error: Error, results: Data) => {
        if (error) {
          throw error;
        } else {
          res.json(results);
        }
      }
    );
  }

  function createProduct () {
    
    const data = req.body;
    
    
    connection.query(
      `INSERT INTO producto VALUES (null, ` + data.nombre + `, ` + data.imagen + `, ` + data.precio + `, ` + data.categoriza)`,
      (error: Error, results: Data) => {
        if (error) {
          throw error;
        } else {
          res.send(results);
        }
      }
    );
  }  
  
  function updateProduct () {
    connection.query(
      "SELECT * FROM producto",
      (error: Error, results: Data) => {
        if (error) {
          throw error;
        } else {
          res.json(results);
        }
      }
    );
  }

  function deleteProduct () {
    connection.query(
      "SELECT * FROM producto",
      (error: Error, results: Data) => {
        if (error) {
          throw error;
        } else {
          res.json(results);
        }
      }
    );
  }

  // if (req.method === "POST") {
  //   const { name } = req.body;
  //   res.send(name);
  // }
}
