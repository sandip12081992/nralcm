import { RestApiConfiguration } from "../infrastructure/rest-api.configuration";
import { HttpContext } from "./http-request";

export interface IAuthHandler {
    handle(restApiConfiguration: RestApiConfiguration, target: any, context: HttpContext): boolean;
}