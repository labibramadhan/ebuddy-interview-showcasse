import dotenv from "dotenv";
import { singleton } from "tsyringe";

export interface Config {
  port: number;
  logLevel: string;
  firebaseApiKey: string;
  firebaseProjectId: string;
  firebaseDatabaseUrl: string;
  firebaseServiceAccount: string;
  firebaseEmulator: boolean;
  firebaseEmulatorHost: string;
  firebaseEmulatorAuthPort: number;
  firebaseEmulatorFirestorePort: number;
}

@singleton()
export class ConfigService {
  public config: Config = {} as Config;

  constructor() {
    this.loadConfig();
  }

  loadConfig() {
    dotenv.config();
    this.config = {
      port: process.env.PORT ? +process.env.PORT : 3001,
      logLevel: process.env.LOG_LEVEL ? process.env.LOG_LEVEL : "info",
      firebaseApiKey: process.env.FIREBASE_API_KEY || "demo-key",
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID || "ebuddy",
      firebaseDatabaseUrl: process.env.FIREBASE_DATABASE_URL || "",
      firebaseServiceAccount: process.env.FIREBASE_SERVICE_ACCOUNT || "",
      firebaseEmulator: process.env.FIREBASE_EMULATOR === "true",
      firebaseEmulatorHost: process.env.FIREBASE_EMULATOR_HOST || "127.0.0.1",
      firebaseEmulatorAuthPort: process.env.FIREBASE_EMULATOR_AUTH_PORT
        ? +process.env.FIREBASE_EMULATOR_AUTH_PORT
        : 9099,
      firebaseEmulatorFirestorePort: process.env.FIREBASE_EMULATOR_FIRESTORE_PORT
        ? +process.env.FIREBASE_EMULATOR_FIRESTORE_PORT
        : 8080,
    };
  }
}
