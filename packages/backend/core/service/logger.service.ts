import pino from "pino";
import pinoCaller from "pino-caller";
import pinoPretty from "pino-pretty";
import { singleton } from "tsyringe";

@singleton()
export class LoggerService {
  public logger: pino.Logger;

  constructor({
    serviceName,
    level = "info",
    pretty = true,
  }: {
    serviceName: string;
    level?: "trace" | "debug" | "info" | "warn" | "error" | "fatal" | string;
    pretty?: boolean;
  }) {
    const stream = pretty
      ? pinoPretty({
          colorize: true,
        })
      : process.stdout;
    this.logger = pinoCaller(
      pino(
        {
          level,
        },
        stream
      ).child({
        service: serviceName,
        env: process.env.NODE_ENV,
      })
    );
  }
}
