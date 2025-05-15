import "reflect-metadata";
import { container } from "tsyringe";
import { BootstrapService } from "./core/service/bootstrap.service";

const bootstrapService = container.resolve(BootstrapService);

// Add a global unhandled rejection handler to prevent crashes
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  // Application continues running despite the rejection
});

bootstrapService.bootstrap().then(async () => {
  // Store the server reference to keep the Node.js process alive
  const server = await bootstrapService.run();

  // Handle process termination signals
  process.on("SIGINT", () => {
    console.log("Shutting down server...");
    if (server && typeof server.close === "function") {
      server.close(() => {
        console.log("Server shut down successfully");
        process.exit(0);
      });
    } else {
      console.log("Server not running or cannot be closed properly");
      process.exit(0);
    }
  });
});
