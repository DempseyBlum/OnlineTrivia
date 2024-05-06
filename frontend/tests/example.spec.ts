import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3001/");
});

test("has title", async ({ page }) => {
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Homepage/);
});

test("get started link", async ({ page }) => {
  // Expects page to have a heading with the name of Trivia Game.
  await expect(
    page.getByRole("heading", { name: "Trivia Game" })
  ).toBeVisible();
});
