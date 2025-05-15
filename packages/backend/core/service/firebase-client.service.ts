import { singleton } from "tsyringe";
import { ConfigService } from "./config.service";
import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, connectAuthEmulator, Auth } from "firebase/auth";
import { LoggerService } from "./logger.service";

@singleton()
export class FirebaseClientService {
  public app: FirebaseApp;
  public auth: Auth;

  constructor(
    private configService: ConfigService,
    private loggerService: LoggerService
  ) {
    const config = this.configService.config;

    const firebaseConfig = {
      apiKey: config.firebaseApiKey,
      projectId: config.firebaseProjectId,
    };

    this.app = initializeApp(firebaseConfig);
    this.auth = getAuth(this.app);

    if (config.firebaseEmulator) {
      this.loggerService.logger.info(
        "Firebase client service emulator enabled, connecting to the emulator.."
      );
      connectAuthEmulator(
        this.auth,
        `http://${config.firebaseEmulatorHost}:${config.firebaseEmulatorAuthPort}`
      );
    }
  }
}
