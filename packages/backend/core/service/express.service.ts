import express from "express";
import cors from "cors";
import { singleton } from "tsyringe";
import { ConfigService } from "./config.service";
import { ValidateError } from "tsoa";
import { LoggerService } from "./logger.service";
import { ValidationFailedError } from "./validation.service";
import * as swaggerUI from "swagger-ui-express";

export interface CorsOptions {
  allowedOrigins?: string[];
  allowedMethods?: string[];
  allowedHeaders?: string[];
}

export interface BuildOptions {
  corsOptions?: CorsOptions;
  staticFolder?: string;
}

@singleton()
export class ExpressService {
  public app: express.Application;

  constructor(
    private configService: ConfigService,
    private loggerService: LoggerService
  ) {
    this.app = express();
  }

  build({ corsOptions, staticFolder }: BuildOptions = {}) {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    const finalCorsOptions: cors.CorsOptions = {
      credentials: true,
    };
    if (corsOptions?.allowedOrigins) {
      finalCorsOptions.origin = corsOptions?.allowedOrigins;
    }
    if (corsOptions?.allowedMethods) {
      finalCorsOptions.methods = corsOptions?.allowedMethods;
    }
    if (corsOptions?.allowedHeaders) {
      finalCorsOptions.allowedHeaders = corsOptions?.allowedHeaders;
    }

    this.app.use(cors(finalCorsOptions));

    // Health check endpoint
    this.app.get("/health", (req, res) => {
      res.status(200).json({ status: "ok" });
    });

    if (staticFolder) {
      this.app.use(express.static(staticFolder));
    }

    return this.app;
  }

  registerRoute(path: string, route: express.Router) {
    this.app.use(path, route);
  }

  registerErrorHandler() {
    this.app.use(
      (
        err: any,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ): any => {
        if (err instanceof ValidateError) {
          this.loggerService.logger.warn(
            `Caught Validation Error for ${req.path}:`,
            err.fields
          );
          return res.status(422).json({
            message: "Validation Failed",
            details: err?.fields,
          });
        }
        if (err instanceof ValidationFailedError) {
          this.loggerService.logger.error(err);
          return res.status(422).json({
            message: "Validation Failed",
            details: err?.errors,
          });
        }
        if (err instanceof Error) {
          this.loggerService.logger.error(err);
          return res.status(500).json({
            message: "Internal Server Error",
          });
        }

        next();
      }
    );
  }

  registerSwagger(swaggerJson: object) {
    this.app.use(
      ["/openapi", "/docs", "/swagger"],
      swaggerUI.serve,
      swaggerUI.setup(swaggerJson)
    );
  }

  run() {
    const port = this.configService.config.port;
    const server = this.app.listen(port, (error) => {
      if (error) {
        this.loggerService.logger.error(error);
        process.exit(1);
      }
      this.loggerService.logger.info(`Server running on port ${port}`);
    });
    
    return server;
  }
}
