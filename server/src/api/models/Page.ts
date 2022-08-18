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

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface Page
 */
export interface Page {
    /**
     * 
     * @type {number}
     * @memberof Page
     */
    id: number;
    /**
     * 
     * @type {string}
     * @memberof Page
     */
    title: string;
    /**
     * 
     * @type {string}
     * @memberof Page
     */
    contents?: string;
    /**
     * 
     * @type {boolean}
     * @memberof Page
     */
    newFlag?: boolean;
}

/**
 * Check if a given object implements the Page interface.
 */
export function instanceOfPage(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "title" in value;

    return isInstance;
}

export function PageFromJSON(json: any): Page {
    return PageFromJSONTyped(json, false);
}

export function PageFromJSONTyped(json: any, ignoreDiscriminator: boolean): Page {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'title': json['title'],
        'contents': !exists(json, 'contents') ? undefined : json['contents'],
        'newFlag': !exists(json, 'newFlag') ? undefined : json['newFlag'],
    };
}

export function PageToJSON(value?: Page | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'title': value.title,
        'contents': value.contents,
        'newFlag': value.newFlag,
    };
}

