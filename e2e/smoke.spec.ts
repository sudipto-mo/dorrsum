import { test, expect } from "@playwright/test";

test("home loads", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Principal AI" })).toBeVisible();
});

test("research index is reachable (content or gate)", async ({ page }) => {
  await page.goto("/research/dc-infrastructure");

  // In local dev without auth, research may render (dev bypass).
  // In production-like start without session, research should redirect to /login.
  const u = new URL(page.url());
  if (u.pathname === "/login") {
    await expect(page.getByRole("heading", { name: "Client Access" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Sign in with LinkedIn" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Sign in with Google" })).toBeVisible();
    return;
  }

  await expect(page.getByRole("heading", { name: "The Digital Infrastructure Stack" })).toBeVisible();
  await expect(page.getByText("The Physical Stack")).toBeVisible();
  await expect(page.getByText("The Worldview")).toBeVisible();
});

test("navbar shows simplified primary links", async ({ page }) => {
  await page.goto("/");
  await page.setViewportSize({ width: 1200, height: 800 });

  const nav = page.getByRole("navigation", { name: "Primary" });
  await expect(nav.getByRole("link", { name: "The Conviction" })).toBeVisible();
  await expect(nav.getByRole("link", { name: "Expertise" })).toBeVisible();
  await expect(nav.getByRole("link", { name: "Coverage" })).toBeVisible();
  await expect(nav.getByRole("link", { name: "Contact" })).toBeVisible();

  await expect(page.getByText(/^Research$/)).toHaveCount(0);
});

test("Worldview report is reachable (content or gate)", async ({ page }) => {
  await page.goto("/research/dc-infrastructure/worldview");
  const u = new URL(page.url());
  if (u.pathname === "/login") {
    await expect(page.getByRole("heading", { name: "Client Access" })).toBeVisible();
    return;
  }
  await expect(
    page.getByRole("heading", { level: 1, name: /The Worldview: Who Is Building the AI Cloud/ }),
  ).toBeVisible();
  await expect(page.getByText("Executive Summary")).toBeVisible();
});

test("Physical Stack report is reachable (content or gate)", async ({ page }) => {
  await page.goto("/research/dc-infrastructure/physical-stack");
  const u = new URL(page.url());
  if (u.pathname === "/login") {
    await expect(page.getByRole("heading", { name: "Client Access" })).toBeVisible();
    return;
  }
  await expect(
    page.getByRole("heading", { level: 1, name: /The Physical Stack: Where the Bottlenecks Are/ }),
  ).toBeVisible();
  await expect(page.getByText("Supply Chain Stress Summary")).toBeVisible();
});

