import type {NextApiRequest, NextApiResponse} from 'next';
import { DefaultResponse } from '../../types/DefaultResponse';
import { dbConnect } from '../../middlewares/dbConnect';
import { Task } from '../../types/Task';
import { TaskModel } from '../../models/TaskModel';



const handler = async (req : NextApiRequest, res : NextApiResponse<DefaultResponse>) => {

try{
    switch(req.method){
        case 'POST':
            await saveTask(req, res);
        default :
            break;

    }
            return res.status(400).json({error: 'Metodo informado indisponivel'})


}catch(e){

        console.log(e);
        res.status(500).json({error: 'Ocorreu erro ao gerenciar tarefas, tente novamente'});
    
    }

    

    }



const saveTask = async( req : NextApiRequest, res : NextApiResponse<DefaultResponse>) => {
    const obj : Task = req.body;
    
    if(!obj.name || obj.name.length < 3 ){
        return res.status(400).json({error: 'Nome da tarefa invalido'});
    }

    if(!obj.userId){
        return res.status(400).json({error: 'Usuario nao encontrado'});
    }

    if(!obj.finishPrevisionData ){
        return res.status(400).json({error: 'Data de previsão, não informada'});
    }

    await TaskModel.create(obj);

        return res.status(200).json({message: 'Tarefa criada com sucesso'})
}

export default dbConnect(handler);