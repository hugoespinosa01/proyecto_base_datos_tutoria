// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
const connection = require('../backend/connection');
const fs = require('fs');
const path = require('path');

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if(req.method === 'GET'){
    connection.query('SELECT * FROM producto', (error, results) => {
      if (error){
          throw error
      }else{
          
           //fs.writeFileSync(path.join(__dirname, '../backend/dbimages'));
          res.send(results);

      }
  })
  }
}


