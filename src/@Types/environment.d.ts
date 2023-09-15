declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: number;

    ENVIRONMENT: Environment;
  }
  type Environment = "PRODUCTION" | "DEVELOPMENT";
}
