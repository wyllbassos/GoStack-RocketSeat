import { Request, Response } from 'express'
import createUser from './services/CreateUser'

export function helloWorld(request: Request, response:Response) {

    const user = createUser({
        email: 'wylliam@birutheus.com',
        password: '1234',
        techs: [
            'node',
            'react',
            { title: 'JavaString', experience: 100 }
        ]
    });
    return response.json({ message: 'Hello' + user })
}