/**
 * Environment Variables Type Declarations
 */

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_BASE_URL?: string;
    NODE_ENV: "development" | "production" | "test";
  }
}
