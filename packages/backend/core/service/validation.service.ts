import { singleton } from "tsyringe";
import { validate, ValidationError, ValidatorOptions } from "class-validator";

export interface ValidationOptions {
  forbidUnknownValues?: boolean;
  skipMissingProperties?: boolean;
  skipNullProperties?: boolean;
  skipUndefinedProperties?: boolean;
}

export class ValidationFailedError extends Error {
  name = "ValidationFailedError";
  errors: ValidationError[];

  constructor({ errors }: { errors: ValidationError[] }) {
    super("Validation failed");
    this.errors = errors;
  }
}

@singleton()
export class ValidationService {
  private defaultValidatorOptions: ValidatorOptions = {
    forbidUnknownValues: false,
  };

  async validate(object: any, options?: ValidationOptions) {
    return validate(object, { ...this.defaultValidatorOptions, ...options });
  }

  async validateAndThrow(object: any, options?: ValidationOptions) {
    const errors = await this.validate(object, options);
    if (errors.length > 0) {
      throw new ValidationFailedError({ errors });
    }
  }
}
