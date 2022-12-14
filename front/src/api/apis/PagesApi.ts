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
  Page,
} from '../models';
import {
    ApiResultResponseFromJSON,
    ApiResultResponseToJSON,
    PageFromJSON,
    PageToJSON,
} from '../models';

export interface CreatePageRequest {
    page: Page;
}

export interface DeletePageRequest {
    id: number;
}

export interface GetPageDetailRequest {
    id: number;
}

export interface GetPageForTitleRequest {
    title: string;
}

export interface UpdatePageRequest {
    id: number;
    page: Page;
}

/**
 * 
 */
export class PagesApi extends runtime.BaseAPI {

    /**
     */
    async createPageRaw(requestParameters: CreatePageRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Page>> {
        if (requestParameters.page === null || requestParameters.page === undefined) {
            throw new runtime.RequiredError('page','Required parameter requestParameters.page was null or undefined when calling createPage.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/pages`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: PageToJSON(requestParameters.page),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PageFromJSON(jsonValue));
    }

    /**
     */
    async createPage(requestParameters: CreatePageRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Page> {
        const response = await this.createPageRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async deletePageRaw(requestParameters: DeletePageRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ApiResultResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling deletePage.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/pages/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ApiResultResponseFromJSON(jsonValue));
    }

    /**
     */
    async deletePage(requestParameters: DeletePageRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ApiResultResponse> {
        const response = await this.deletePageRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async getPageDetailRaw(requestParameters: GetPageDetailRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Page>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getPageDetail.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/pages/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PageFromJSON(jsonValue));
    }

    /**
     */
    async getPageDetail(requestParameters: GetPageDetailRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Page> {
        const response = await this.getPageDetailRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async getPageForTitleRaw(requestParameters: GetPageForTitleRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Page>> {
        if (requestParameters.title === null || requestParameters.title === undefined) {
            throw new runtime.RequiredError('title','Required parameter requestParameters.title was null or undefined when calling getPageForTitle.');
        }

        const queryParameters: any = {};

        if (requestParameters.title !== undefined) {
            queryParameters['title'] = requestParameters.title;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/pages`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PageFromJSON(jsonValue));
    }

    /**
     */
    async getPageForTitle(requestParameters: GetPageForTitleRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Page> {
        const response = await this.getPageForTitleRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async updatePageRaw(requestParameters: UpdatePageRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Page>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling updatePage.');
        }

        if (requestParameters.page === null || requestParameters.page === undefined) {
            throw new runtime.RequiredError('page','Required parameter requestParameters.page was null or undefined when calling updatePage.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/pages/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: PageToJSON(requestParameters.page),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PageFromJSON(jsonValue));
    }

    /**
     */
    async updatePage(requestParameters: UpdatePageRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Page> {
        const response = await this.updatePageRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
