import { IsInjectable } from "../common/functions";

/**
 * Decorator for rest api controller.
 * Every Controller must decorate with this decorator
 */
export function Controller() {
    return function(target: any) {
        const targetString = target.toString() as string;
        const baseControllerIndex = targetString.indexOf("BaseController");
        if (baseControllerIndex > 0 && targetString.indexOf("BaseController") < targetString.indexOf("{")) {
            IsInjectable(target);
        } else {
            throw new Error(`${target.name} must extend with BaseController`);
        }
    };
}
