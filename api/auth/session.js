/**
 * GET /api/auth/session — JSON: configured, authenticated, optional name/email
 */

const { SESSION_COOKIE, getCookie, verifySession } = require("../_lib/linkedin-session");

function linkedInEnvMissingKeys() {
  const missing = [];
  if (!(process.env.LINKEDIN_CLIENT_ID || "").trim()) missing.push("LINKEDIN_CLIENT_ID");
  if (!(process.env.LINKEDIN_CLIENT_SECRET || "").trim()) missing.push("LINKEDIN_CLIENT_SECRET");
  if (!(process.env.LINKEDIN_REDIRECT_URI || "").trim()) missing.push("LINKEDIN_REDIRECT_URI");
  if (!(process.env.AUTH_SECRET || "").trim()) missing.push("AUTH_SECRET");
  return missing;
}

module.exports = async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const secret = (process.env.AUTH_SECRET || "").trim();
  const missingKeys = linkedInEnvMissingKeys();
  const configured = missingKeys.length === 0;

  if (!configured) {
    return res.status(200).json({
      configured: false,
      authenticated: false,
      missingKeys: missingKeys,
    });
  }

  const token = getCookie(req, SESSION_COOKIE);
  const session = verifySession(token, secret);

  if (!session) {
    return res.status(200).json({ configured: true, authenticated: false });
  }

  return res.status(200).json({
    configured: true,
    authenticated: true,
    name: session.name || null,
    email: session.email || null,
  });
};
