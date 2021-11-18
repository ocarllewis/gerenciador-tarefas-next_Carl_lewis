import type {NextApiRequest, NextApiResponse} from 'next';
import {DefaultResponse} from '../../types/DefaultResponse';
import { UserModel } from '../../models/UserModel';
import md5 from 'md5';
import { User } from '../../types/User';
import user from './user';
import { dbConnect } from '../../middlewares/dbConnect';
import { JsonWebTokenError } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import {corsPolicy} from "../../middlewares/corsPolicy";

type DefaultReturn = {
    error? : string
    message? : string
    
}

type LoginRequest ={
    login: string
    password : string
}

type LoginResponse = {
    name : string
    email : string
    token : string
    
}


const handler = async (req : NextApiRequest, res : NextApiResponse<DefaultResponse | LoginResponse>) => {
    try{
        if(req.method !=='POST' || !req.body ){
            return res.status(400).json({error: 'Metodo informado, não esta disponivel'})

        }

        const {MY_SECRET_KEY}=process.env;

        if(!MY_SECRET_KEY){
            return res.status(500).json({error: 'Env MY_SECRET_KEY nao definida'})
        }

        const loginRequest: LoginRequest = req.body

        if(loginRequest.login  && loginRequest.password){
            const usersFound = await UserModel.find({email : loginRequest.login, password : md5(loginRequest.password)});
            if(usersFound && usersFound.length > 0){
                const user : User = usersFound[0];
                const token =jwt.sign({ _id : user._id}, MY_SECRET_KEY);

                return res.status(200).json({name : user.name, email : user.email, token})

            } else {
                return res.status(400).json({error: "email ou password invalido!"});
            }

        } else {
            return res.status(400).json({error: "login e password nao informado"});
        }
    }catch(e){

        console.log(e);
        res.status(500).json({error: 'Ocorreu ero ao efetuar login, tente novamente'});
    
    }
}

export default corsPolicy(dbConnect(handler));
