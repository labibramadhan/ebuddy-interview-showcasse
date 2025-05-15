import { singleton } from "tsyringe";
import { ConfigService } from "./config.service";
import * as admin from "firebase-admin";
import { LoggerService } from "./logger.service";

@singleton()
export class FirebaseServerService {
  public app: admin.app.App;
  public auth: admin.auth.Auth;

  constructor(
    private configService: ConfigService,
    private loggerService: LoggerService
  ) {
    const config = this.configService.config;

    if (admin.apps.length > 0) {
      this.app = admin.apps[0]!;
      this.auth = this.app.auth();
    } else {
      // For production, use environment variables
      if (config.firebaseServiceAccount) {
        const serviceAccount = JSON.parse(
          Buffer.from(config.firebaseServiceAccount, "base64").toString()
        );

        this.app = admin.initializeApp({
          projectId: config.firebaseProjectId,
          credential: admin.credential.cert(serviceAccount),
          databaseURL: config.firebaseDatabaseUrl,
        });
        this.auth = this.app.auth();
      } else {
        // For local development with emulator
        this.app = admin.initializeApp({
          projectId: config.firebaseProjectId,
          credential: admin.credential.applicationDefault(),
        });
        this.auth = this.app.auth();
      }

      // Connect to emulators if FIREBASE_EMULATOR is set
      if (config.firebaseEmulator) {
        // Connect to Firestore emulator
        this.app.firestore().settings({
          host: `${config.firebaseEmulatorHost}:${config.firebaseEmulatorFirestorePort}`,
          ssl: false,
          ignoreUndefinedProperties: true,
        });

        // For Auth emulator, set the environment variable
        process.env.FIREBASE_AUTH_EMULATOR_HOST = `${config.firebaseEmulatorHost}:${config.firebaseEmulatorAuthPort}`;

        this.loggerService.logger.info(
          `🔥 Firebase server service connected to emulators: Firestore(${config.firebaseEmulatorFirestorePort}), Auth(${config.firebaseEmulatorAuthPort})`
        );
      } else {
        this.loggerService.logger.info(
          "Firebase server service initialized successfully with production settings"
        );
      }
    }
  }
}
