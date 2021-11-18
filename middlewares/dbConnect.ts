import type {NextApiRequest, NextApiResponse, NextApiHandler} from 'next';
import mongoose from 'mongoose';
import { DefaultResponse } from '../types/DefaultResponse';

const dbConnect = (handler : NextApiHandler) => 
    async(req: NextApiRequest, res : NextApiResponse<DefaultResponse>) => {
    
    // validar o BD
    if(mongoose.connections[0].readyState){
        return handler(req, res);
    }

    const{DB_CONNECTION_STRING} = process.env;

    if(!DB_CONNECTION_STRING){
        return res.status(500).json({error: 'Env DB_CONNECTION_STRING nao definida'})
    }

    await mongoose.connect(DB_CONNECTION_STRING);
    mongoose.connection.on('connected', () => console.log('Banco conectado com sucesso'))
    mongoose.connection.on('error', error => console.log('Não foi possivél conectar no banco') + error )
    return handler(req, res);

}

export {dbConnect}