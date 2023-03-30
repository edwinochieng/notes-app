namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production";
    GITHUB_ID: string;
    GITHUB_SECRET: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
    BASE_URL: string;
  }
}
