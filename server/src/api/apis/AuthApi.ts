/* tslint:disable */
/* eslint-disable */
/**
 * intrawiki
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as express from 'express';
import { container } from 'tsyringe';
import * as runtime from '../runtime';
import type {
  ApiResultResponse,
  AuthInfoResponse,
  ChangePasswordRequest,
  LoginRequest,
  LoginResponse,
} from '../models';
import {
    ApiResultResponseFromJSON,
    ApiResultResponseToJSON,
    AuthInfoResponseFromJSON,
    AuthInfoResponseToJSON,
    ChangePasswordRequestFromJSON,
    ChangePasswordRequestToJSON,
    LoginRequestFromJSON,
    LoginRequestToJSON,
    LoginResponseFromJSON,
    LoginResponseToJSON,
} from '../models';

export interface ChangePasswordOperationRequest {
    changePasswordRequest: ChangePasswordRequest;
}

export interface LoginOperationRequest {
    loginRequest: LoginRequest;
}

/**
 * AuthApi - interface
 * 
 * @export
 * @interface AuthApiInterface
 */
export interface AuthApi {
    /**
     */
    changePassword(requestParameters: ChangePasswordOperationRequest): Promise<ApiResultResponse>;

    /**
     */
    getAuthInfo(): Promise<AuthInfoResponse>;

    /**
     */
    login(requestParameters: LoginOperationRequest): Promise<LoginResponse>;

    /**
     */
    logout(): Promise<ApiResultResponse>;

}


/*
export function initAuthApiSample(){
    container.register("AuthApi", { useValue: new AuthApiSample() });
}
*/

export function getAuthApiRoute(errorHandler?: runtime.ApiErrorHandler): express.Router {
    const errorHandlerInner = errorHandler ?? runtime.ApiErrorHandlerDefault

    const router = express.Router();

    const api = container.resolve<AuthApi>('AuthApi');

    router.post('/auth/change-password', async function (req: express.Request, res: express.Response, next: express.NextFunction) {
        try{
            const changePasswordRequest = req.body as ChangePasswordRequest;

            const input = {
                changePasswordRequest: changePasswordRequest,
            } as ChangePasswordOperationRequest;

            const output = await api.changePassword(input);
            res.json(output);
        }
        catch(err){
            await errorHandlerInner(err, req, res, next);
        }
    })

    router.get('/auth/info', async function (req: express.Request, res: express.Response, next: express.NextFunction) {
        try{


            const output = await api.getAuthInfo();
            res.json(output);
        }
        catch(err){
            await errorHandlerInner(err, req, res, next);
        }
    })

    router.post('/auth/login', async function (req: express.Request, res: express.Response, next: express.NextFunction) {
        try{
            const loginRequest = req.body as LoginRequest;

            const input = {
                loginRequest: loginRequest,
            } as LoginOperationRequest;

            const output = await api.login(input);
            res.json(output);
        }
        catch(err){
            await errorHandlerInner(err, req, res, next);
        }
    })

    router.post('/auth/logout', async function (req: express.Request, res: express.Response, next: express.NextFunction) {
        try{


            const output = await api.logout();
            res.json(output);
        }
        catch(err){
            await errorHandlerInner(err, req, res, next);
        }
    })


    return router;
}

