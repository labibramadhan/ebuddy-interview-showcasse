import { IocContainer } from "@tsoa/runtime";
import { container } from "./di";
import { constructor } from "tsyringe/dist/typings/types";

// This is a type guard to check if the identifier is a constructor (class)
function isConstructor(identifier: any): identifier is constructor<any> {
  return typeof identifier === "function" && identifier.prototype;
}

export const iocContainer: IocContainer = {
  get: <T>(controller: any): T => {
    // Handle both class constructors and token strings
    if (isConstructor(controller)) {
      return container.resolve<T>(controller);
    } else {
      // Handle string tokens and other identifiers
      return container.resolve<T>(controller);
    }
  },
};
