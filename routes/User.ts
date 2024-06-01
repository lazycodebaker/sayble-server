import { Request, Response } from "express";
import { createUser, getUser, getUsers, updateUsernameAndPassword, verifyUser } from "../controller/User";
import { APIContextType, Options } from "../types";
import app from "../app";
import { settings } from "../config/settings";

const apiPrefix = settings.server.apiPrefix;

export const UserRoutes = async (options: Options) => {

    await app.post(`${apiPrefix}/users/create`, async (
        request: Request, response: Response
    ) => await createUser({
        request: request,
        response: response,
        em: options.orm.em.fork()
    } as APIContextType));

    await app.get(`${apiPrefix}/users`, async (
        request: Request, response: Response
    ) => await getUsers({
        request: request,
        response: response,
        em: options.orm.em.fork()
    } as APIContextType));

    await app.get(`${apiPrefix}/users/:id`, async (
        request: Request, response: Response
    ) => await getUser({
        request: request,
        response: response,
        em: options.orm.em.fork()
    } as APIContextType));
    
    await app.post(`${apiPrefix}/users/verify`, async (
        request: Request, response: Response
    ) => await verifyUser({
        request: request,
        response: response,
        em: options.orm.em.fork()
    } as APIContextType));

    await app.put(`${apiPrefix}/users`, async (
        request: Request, response: Response
    ) => await updateUsernameAndPassword({
        request: request,
        response: response,
        em: options.orm.em.fork()
    } as APIContextType));
    


};

