import { NextFunction, Request, Response } from "express";
import { plainToInstance, ClassConstructor } from "class-transformer";
import { validateSync } from "class-validator";
import { ValidateError } from "tsoa";

const validatePlainObject = (
  targetClass: any,
  object: any,
  next: NextFunction,
) => {
  const instance = plainToInstance(targetClass, object, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(instance, {
    forbidUnknownValues: false,
    validationError: {
      target: false,
    },
  });
  const fieldsErrors: { [name: string]: { message: string; value: string } } =
    {};

  if (errors.length > 0) {
    errors.forEach((error) => {
      if (error.constraints) {
        fieldsErrors[error.property] = {
          message: Object.values(error.constraints).join(", "),
          value: error.value,
        };
      }
      if (error.children) {
        error.children.forEach((errorNested) => {
          if (errorNested.constraints) {
            fieldsErrors[errorNested.property] = {
              message: Object.values(errorNested.constraints!).join(", "),
              value: errorNested.value,
            };
          }
        });
      }
    });
    next(new ValidateError(fieldsErrors, "Validation failed"));
    return;
  }
  next();
};

export function validateRequestBody<T extends object>(
  targetClass: ClassConstructor<T>,
) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    validatePlainObject(targetClass, req.body, next);
  };
}

export function validateRequestParams<T extends object>(
  targetClass: ClassConstructor<T>,
) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    validatePlainObject(targetClass, req.params, next);
  };
}

export function validateRequestQueries<T extends object>(
  targetClass: ClassConstructor<T>,
) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    validatePlainObject(targetClass, req.query, next);
  };
}
