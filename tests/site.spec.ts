import { expect, test } from "@playwright/test";

test("assets load below a repository path, language persists, layout fits", async ({
  page,
}, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  // Keep image loading and screenshots stable while decorative photos float.
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Лёгкость в теле.",
  );
  for (const img of await page.locator("img").all()) {
    if (await img.isVisible()) await img.scrollIntoViewIfNeeded();
  }
  await expect
    .poll(() =>
      page
        .locator("img")
        .evaluateAll((images) =>
          images.every(
            (img) =>
              (img as HTMLImageElement).complete &&
              (img as HTMLImageElement).naturalWidth > 0,
          ),
        ),
    )
    .toBeTruthy();
  await page.getByRole("button", { name: "English", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "A lighter body.",
  );
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBeTruthy();
  expect(errors).toEqual([]);
  for (const img of await page.locator("img").all()) {
    if (await img.isVisible()) await img.scrollIntoViewIfNeeded();
  }
  await expect
    .poll(() =>
      page
        .locator("img")
        .evaluateAll((images) =>
          images.every(
            (img) =>
              (img as HTMLImageElement).complete &&
              (img as HTMLImageElement).naturalWidth > 0,
          ),
        ),
    )
    .toBeTruthy();
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({
    path: testInfo.outputPath("page-en.png"),
    fullPage: true,
    scale: "css",
  });
  await page.getByRole("button", { name: "Русский", exact: true }).click();
  await page.screenshot({
    path: testInfo.outputPath("page-ru.png"),
    fullPage: true,
    scale: "css",
  });
  await page.screenshot({
    path: testInfo.outputPath("hero-ru.png"),
    scale: "css",
  });
});

for (const language of ["ru", "en", "el"] as const) {
  test(`booking preserves selection and user input; creates encoded WhatsApp message (${language})`, async ({
    page,
  }) => {
    await page.goto("");
    await page.locator(".treatment-card a").first().click();
    await expect(page.locator('select[name="service"]')).toHaveValue(
      "anti-cellulite",
    );
    await page.locator('[name="name"]').fill("Анна & Alice");
    await page.locator('[name="phone"]').fill("+357 95 123 456");
    await page.locator('[name="message"]').fill("Вопрос: спина & плечи? 🌸");
    if (language !== "ru")
      await page
        .getByRole("button", {
          name: language === "el" ? "Ελληνικά" : "English",
          exact: true,
        })
        .click();
    await expect(page.locator('[name="name"]')).toHaveValue("Анна & Alice");
    await expect(page.locator('select[name="service"]')).toHaveValue(
      "anti-cellulite",
    );
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const date = `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, "0")}-${String(tomorrow.getDate()).padStart(2, "0")}`;
    await page.locator('[name="date"]').fill(date);
    await page.locator('[name="time"]').fill("16:00");
    let destination = "";
    await page.route("https://wa.me/**", async (route) => {
      destination = route.request().url();
      await route.fulfill({
        contentType: "text/html",
        body: "<p>WhatsApp handoff</p>",
      });
    });
    await page.locator('button[type="submit"]').click();
    await expect
      .poll(() => destination)
      .toContain("https://wa.me/35795111676?text=");
    const message = new URL(destination).searchParams.get("text")!;
    expect(message).toContain("Анна & Alice");
    expect(message).toContain("+357 95 123 456");
    expect(message).toContain("Вопрос: спина & плечи? 🌸");
    expect(message).toContain(
      {
        ru: "Классический антицеллюлитный массаж",
        en: "Classic anti-cellulite massage",
        el: "Κλασικό μασάζ κατά της κυτταρίτιδας",
      }[language],
    );
    if (language === "el") {
      expect(message).toContain("Γεια σας, Alina!");
      expect(message).toContain("Το όνομά σας:");
      expect(message).toContain("Θεραπεία:");
    }
    expect(message).toContain(date);
    expect(message).toContain("16:00");
    expect(message).not.toContain("необязательно");
  });
}

test("form rejects missing fields and whitespace-only names", async ({
  page,
}) => {
  await page.goto("");
  await page.locator('button[type="submit"]').click();
  expect(
    await page
      .locator("form")
      .evaluate((form: HTMLFormElement) => form.checkValidity()),
  ).toBeFalsy();
  await page.locator('[name="name"]').fill("   ");
  await page.locator('[name="phone"]').fill("+35795123456");
  await page.getByRole("combobox").click();
  await page
    .getByRole("option", { name: "Помогите выбрать массаж", exact: true })
    .click();
  expect(
    await page
      .locator("form")
      .evaluate((form: HTMLFormElement) => form.checkValidity()),
  ).toBeFalsy();
  await page.locator('[name="name"]').fill("Anna");
  await page.locator('[name="phone"]').fill("invalid phone");
  expect(
    await page
      .locator("form")
      .evaluate((form: HTMLFormElement) => form.checkValidity()),
  ).toBeFalsy();
  await expect(page).toHaveURL(/alina-lending/);
});

test("layout fits small phones and tablets in all languages", async ({
  page,
}, testInfo) => {
  if (testInfo.project.name !== "desktop") return;
  await page.goto("");
  await page.evaluate(() => document.fonts.ready);
  for (const width of [320, 375, 768, 1024]) {
    await page.setViewportSize({ width, height: 900 });
    for (const lang of ["English", "Русский", "Ελληνικά"]) {
      await page.getByRole("button", { name: lang, exact: true }).click();
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
        `${width}px ${lang}`,
      ).toBeLessThanOrEqual(width);
    }
  }
});

test("mobile menu closes on navigation and Escape", async ({
  page,
}, testInfo) => {
  await page.goto("");
  if (testInfo.project.name !== "mobile") return;
  const menu = page.locator(".menu-button");
  await menu.click();
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  await page.locator("#navigation a").first().click();
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await menu.click();
  await page.keyboard.press("Escape");
  await expect(menu).toHaveAttribute("aria-expanded", "false");
});

test("procedure dropdown supports selection, keyboard, dismissal and validation", async ({
  page,
}, testInfo) => {
  await page.goto("");
  await page.locator('[name="name"]').fill("Анна");
  await page.locator('[name="phone"]').fill("+35795123456");
  await page.locator('button[type="submit"]').click();
  const dropdown = page.getByRole("combobox");
  await expect(dropdown).toBeFocused();
  await expect(dropdown).toHaveAttribute("aria-invalid", "true");
  await dropdown.click();
  await page
    .getByRole("option", {
      name: "Мадеротерапия с баночным массажем · 60 мин",
      exact: true,
    })
    .click();
  await expect(dropdown).toContainText(
    "Мадеротерапия с баночным массажем · 60 мин",
  );
  await expect(page.locator('[name="service"]')).toHaveValue("maderotherapy");
  await expect(page.getByRole("listbox")).toHaveCount(0);
  await dropdown.press("ArrowDown");
  await dropdown.press("End");
  await dropdown.press("Enter");
  await expect(dropdown).toContainText("Помогите выбрать массаж");
  await dropdown.press("ArrowDown");
  await dropdown.press("Home");
  await dropdown.press("Escape");
  await expect(dropdown).toContainText("Помогите выбрать массаж");
  await expect(dropdown).toHaveAttribute("aria-expanded", "false");
  await page.getByRole("button", { name: "English", exact: true }).click();
  await expect(dropdown).toContainText("Help me choose a massage");
  await dropdown.click();
  await expect(page.getByRole("option", { selected: true })).toHaveText(
    "Help me choose a massage✓",
  );
  await page
    .locator(".service-select")
    .screenshot({ path: testInfo.outputPath("dropdown.png") });
  await page.screenshot({ path: testInfo.outputPath("dropdown-page.png") });
  await page.locator('[name="name"]').click();
  await expect(dropdown).toHaveAttribute("aria-expanded", "false");
});

test("Greek language persists and translates metadata, treatments and form", async ({
  page,
}) => {
  await page.goto("");
  await page.getByRole("button", { name: "Ελληνικά", exact: true }).click();
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "el");
  await expect(
    page.getByRole("button", { name: "Ελληνικά", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Ανάλαφρο σώμα.",
  );
  await expect(page).toHaveTitle(
    "Μασάζ στο κέντρο της Πάφου, Κάτω Πάφος | Slimroom",
  );
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /Κάτω Πάφο/,
  );
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    "content",
    /Μασάζ/,
  );
  await expect(
    page.getByRole("group", { name: "Γλώσσα ιστοσελίδας" }),
  ).toHaveAttribute("aria-label", "Γλώσσα ιστοσελίδας");
  await expect(page.locator(".treatment-card h3")).toHaveText([
    "Κλασικό μασάζ κατά της κυτταρίτιδας",
    "Συνδυαστικό μασάζ κατά της κυτταρίτιδας",
    "Μαδεροθεραπεία με βεντούζες",
    "Θεραπευτικό μασάζ",
    "Μασάζ εγκυμοσύνης",
    "Παιδικό μασάζ",
    "Μασάζ σμίλευσης προσώπου",
    "Βιοενεργειακό μασάζ σμίλευσης προσώπου",
    "Ατομική συνεδρία διατάσεων",
  ]);
  await page.getByRole("combobox").click();
  await page
    .getByRole("option", { name: "Βοηθήστε με να επιλέξω μασάζ", exact: true })
    .click();
  await expect(page.getByRole("combobox")).toContainText(
    "Βοηθήστε με να επιλέξω μασάζ",
  );
  await expect(page.locator('[name="name"]')).toHaveAttribute(
    "placeholder",
    "Πώς να σας αποκαλώ;",
  );
});

test("local SEO stays consistent across languages while indexing remains blocked", async ({
  page,
  request,
}) => {
  const response = await request.get("");
  const html = await response.text();
  expect(html).toContain('id="hero-title"');
  expect(html).toContain("Като Пафос");
  expect(html).toContain('id="local-business-schema"');
  expect(html).not.toContain('<div id="root"></div>');
  const robots = await request.get("robots.txt");
  expect(await robots.text()).toBe("User-agent: *\nDisallow: /\n");
  await page.goto("");
  for (const language of [
    {
      button: "Русский",
      locale: "ru_RU",
      location: "Като Пафос",
      lang: "ru",
      hero: "Лёгкость в теле.",
      badge: "Работаю только с женщинами",
    },
    {
      button: "English",
      locale: "en_GB",
      location: "Kato Paphos",
      lang: "en",
      hero: "A lighter body.",
      badge: "Women only",
    },
    {
      button: "Ελληνικά",
      locale: "el_CY",
      location: "Κάτω Πάφος",
      lang: "el",
      hero: "Ανάλαφρο σώμα.",
      badge: "Μόνο για γυναίκες",
    },
  ]) {
    await page
      .getByRole("button", { name: language.button, exact: true })
      .click();
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      language.hero,
    );
    await expect(page).toHaveTitle(new RegExp(language.location));
    await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute(
      "content",
      language.locale,
    );
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      "noindex, nofollow",
    );
    const title = await page.title();
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      "content",
      title,
    );
    await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute(
      "content",
      title,
    );
    const description = await page
      .locator('meta[name="description"]')
      .getAttribute("content");
    await expect(
      page.locator('meta[property="og:description"]'),
    ).toHaveAttribute("content", description!);
    await expect(
      page.locator('meta[name="twitter:description"]'),
    ).toHaveAttribute("content", description!);
    const schema = JSON.parse(
      (await page.locator("#local-business-schema").textContent())!,
    );
    expect(schema["@graph"][0].address.addressLocality).toBe(
      "Kato Paphos, Paphos",
    );
    expect(schema["@graph"][0].hasOfferCatalog.itemListElement).toHaveLength(9);
    expect(schema["@graph"][1].inLanguage).toBe(language.lang);
    expect(schema["@graph"][1].name).toBe(title);
    await expect(page.locator("#local-business-schema")).toHaveCount(1);
    await expect(page.locator(".hero-copy .women-only-badge")).toBeVisible();
    await expect(page.locator(".women-only-badge")).toHaveText([
      "♀" + language.badge,
      "♀" + language.badge,
    ]);
    await expect(page.locator("#faq")).toHaveCount(0);
  }
});

test("production page provides treatments and contact without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.goto("http://127.0.0.1:4173/alina-lending/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Лёгкость в теле.",
    );
    await expect(page.locator(".treatment-card")).toHaveCount(9);
    await expect(page.locator(".footer-contact")).toContainText(
      "+357 95 111 676",
    );
    await expect(page.locator(".booking-form")).toBeHidden();
    await expect(page.locator(".hero-copy .women-only-badge")).toContainText(
      "Работаю только с женщинами",
    );
    await expect
      .poll(() =>
        page
          .locator(".hero-image-frame img")
          .evaluate(
            (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
          ),
      )
      .toBeTruthy();
  } finally {
    await context.close();
  }
});

test("language URLs serve translated HTML and usable language links without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    for (const language of [
      { file: "", lang: "ru", title: "Като Пафос", heading: "Лёгкость" },
      { file: "en.html", lang: "en", title: "Kato Paphos", heading: "A lighter body." },
      { file: "el.html", lang: "el", title: "Κάτω Πάφος", heading: "Ανάλαφρο σώμα." },
    ]) {
      await page.goto(`http://127.0.0.1:4173/alina-lending/${language.file}`);
      await expect(page.locator("html")).toHaveAttribute("lang", language.lang);
      await expect(page).toHaveTitle(new RegExp(language.title));
      await expect(page.getByRole("heading", { level: 1 })).toContainText(language.heading);
      await expect(page.locator(".treatment-card")).toHaveCount(9);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow");
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /IMG_0059.*\.jpg$/);
      await page.getByRole("button", { name: "English", exact: true }).click();
      await expect(page).toHaveURL(/en\.html$/);
      await expect(page.locator("html")).toHaveAttribute("lang", "en");
    }
  } finally {
    await context.close();
  }
});

test("switching language preserves the form and browser history restores the language", async ({ page }) => {
  await page.goto("");
  await page.locator('[name="name"]').fill("Анна");
  await page.getByRole("button", { name: "English", exact: true }).click();
  await expect(page).toHaveURL(/en\.html$/);
  await page.getByRole("button", { name: "Ελληνικά", exact: true }).click();
  await expect(page).toHaveURL(/el\.html$/);
  await page.getByRole("button", { name: "Ελληνικά", exact: true }).click();
  await page.goBack();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator('[name="name"]')).toHaveValue("Анна");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});
