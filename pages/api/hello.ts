// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
const connection = require('../backend/connection');

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  connection.query('SELECT * FROM persona', (error, results) => {
    if (error){
        throw error
    }else{
        res.send(results);
    }
})}


