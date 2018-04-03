import { Response } from "express-serve-static-core";
import { IHttpResponseHandler } from ".";
import { HttpContext, HttpResponseMessage } from "..";
// import { StatusCode } from "../../common/enums";
import { ResponseData } from "../../common/models";

/**
 * DefaultHttpResponseHandler will be used when HttpResponseHandler not registered in RestApiConfiguration
 */
export class DefaultHttpResponseHandler implements IHttpResponseHandler {
    /**
     * Method to send response
     * @param context HttpContext Object
     * @param httpResponseMessage HttpResponseMessage Object
     */
    public sendResponse<T>(context: HttpContext, httpResponseMessage: HttpResponseMessage<T>): Response {
        if (httpResponseMessage.headers.size > 0) {
            for (let [key, value] of httpResponseMessage.headers) {
                context.response.setHeader(key, value);
            }
        }
        let responseData: ResponseData =  {
            data: httpResponseMessage.body,
            statusCode: httpResponseMessage.statusCode,
            successMessage: httpResponseMessage.successMessage,
            errorMessage: httpResponseMessage.errorMessages
        };
        return context.response.type("application/json").status(httpResponseMessage.statusCode)
            .send(responseData);
    }

    /**
     * Method to check success or error response based on StatusCode
     * @param statusCode StatusCode
     */
    // private isSuccess(statusCode: StatusCode): boolean {
    //     if ((statusCode.toString() as string).startsWith("2")) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }
}