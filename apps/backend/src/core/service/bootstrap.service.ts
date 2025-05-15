import { injectable } from "tsyringe";
import { ExpressService } from "@ebuddy/backend/core/service/express.service";
import { RegisterRoutes } from "@/routes/routes";

import * as swaggerJson from "@/swagger/swagger.json";

@injectable()
export class BootstrapService {
  constructor(private expressService: ExpressService) {}

  async bootstrap() {
    this.expressService.build({
      corsOptions: {
        allowedOrigins: ["http://localhost:3000"],
      },
    });
    this.expressService.registerSwagger(swaggerJson);

    RegisterRoutes(this.expressService.app);

    this.expressService.registerErrorHandler();
  }

  async run() {
    return this.expressService.run();
  }
}
