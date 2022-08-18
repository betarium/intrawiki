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
 * 
 */
export class AuthApi extends runtime.BaseAPI {

    /**
     */
    async changePasswordRaw(requestParameters: ChangePasswordOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ApiResultResponse>> {
        if (requestParameters.changePasswordRequest === null || requestParameters.changePasswordRequest === undefined) {
            throw new runtime.RequiredError('changePasswordRequest','Required parameter requestParameters.changePasswordRequest was null or undefined when calling changePassword.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/auth/change-password`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ChangePasswordRequestToJSON(requestParameters.changePasswordRequest),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ApiResultResponseFromJSON(jsonValue));
    }

    /**
     */
    async changePassword(requestParameters: ChangePasswordOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ApiResultResponse> {
        const response = await this.changePasswordRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async getAuthInfoRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AuthInfoResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/auth`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => AuthInfoResponseFromJSON(jsonValue));
    }

    /**
     */
    async getAuthInfo(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AuthInfoResponse> {
        const response = await this.getAuthInfoRaw(initOverrides);
        return await response.value();
    }

    /**
     */
    async loginRaw(requestParameters: LoginOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<LoginResponse>> {
        if (requestParameters.loginRequest === null || requestParameters.loginRequest === undefined) {
            throw new runtime.RequiredError('loginRequest','Required parameter requestParameters.loginRequest was null or undefined when calling login.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/auth/login`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: LoginRequestToJSON(requestParameters.loginRequest),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => LoginResponseFromJSON(jsonValue));
    }

    /**
     */
    async login(requestParameters: LoginOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<LoginResponse> {
        const response = await this.loginRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async logoutRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ApiResultResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/auth/logout`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ApiResultResponseFromJSON(jsonValue));
    }

    /**
     */
    async logout(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ApiResultResponse> {
        const response = await this.logoutRaw(initOverrides);
        return await response.value();
    }

}