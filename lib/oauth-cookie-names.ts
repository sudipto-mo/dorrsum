/** Cookie names for OAuth + signed session (no Node imports — safe for Edge middleware). */

export const SESSION_COOKIE = "pa_full_report";
/** CSRF state for LinkedIn authorization. */
export const STATE_COOKIE = "pa_linkedin_oauth_state";
/** CSRF state for Google authorization. */
export const GOOGLE_STATE_COOKIE = "pa_google_oauth_state";
/** Where to land after OAuth (path only, sanitized). Set from `/login?returnTo=` or authorize `?returnTo=`. */
export const POST_LOGIN_RETURN_COOKIE = "pa_post_login_return";
