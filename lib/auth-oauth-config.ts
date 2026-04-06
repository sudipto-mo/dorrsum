import { trimEnv } from "@/lib/oauth-query";
import { googleClientId, googleClientSecret } from "@/lib/google-oauth-env";

export function authSecretMissingKeys(): string[] {
  return trimEnv(process.env.AUTH_SECRET) ? [] : ["AUTH_SECRET"];
}

export function linkedinProviderMissingKeys(): string[] {
  const m: string[] = [];
  if (!trimEnv(process.env.LINKEDIN_CLIENT_ID)) m.push("LINKEDIN_CLIENT_ID");
  if (!trimEnv(process.env.LINKEDIN_CLIENT_SECRET)) m.push("LINKEDIN_CLIENT_SECRET");
  if (!trimEnv(process.env.LINKEDIN_REDIRECT_URI)) m.push("LINKEDIN_REDIRECT_URI");
  return m;
}

export function googleProviderMissingKeys(): string[] {
  const m: string[] = [];
  if (!googleClientId()) m.push("GOOGLE_CLIENT_ID");
  if (!googleClientSecret()) m.push("GOOGLE_CLIENT_SECRET");
  return m;
}

export function linkedinOAuthReady(): boolean {
  return authSecretMissingKeys().length === 0 && linkedinProviderMissingKeys().length === 0;
}

export function googleOAuthReady(): boolean {
  return authSecretMissingKeys().length === 0 && googleProviderMissingKeys().length === 0;
}

export function anyOAuthReady(): boolean {
  return linkedinOAuthReady() || googleOAuthReady();
}
