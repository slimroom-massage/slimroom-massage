# Slimroom

Статический одностраничный сайт с языковыми версиями RU/EN/EL.

## Стек

- React 19
- TypeScript 5
- Vite 7
- CSS
- Playwright — браузерные тесты
- Prettier — форматирование

## Запуск и сборка

Требуется Node.js 22.12+ и npm.

```sh
npm ci
npm run dev
```

```sh
npm run build
npm run preview
```

Сборка сохраняется в `dist`. Скрипт `scripts/prerender.mjs` создаёт HTML для RU/EN/EL: `index.html`, `en.html`, `el.html`.

## Проверки

```sh
npm run check
npm run build
npm test
```

Для браузерных тестов нужен установленный Google Chrome.

```sh
npm run format
```

## Структура

- `src/site/App.tsx` — секции страницы и переключение языка.
- `src/site/content.ts` — тексты, процедуры и контакты.
- `src/site/BookingForm.tsx` — форма записи.
- `src/site/booking.ts` — формирование ссылки WhatsApp.
- `src/site/seo.ts` — метаданные и JSON-LD.
- `src/site/styles.css` — стили.
- `src/assets/optimized` — оптимизированные изображения.
- `scripts/prerender.mjs` — пререндеринг языковых версий.
- `tests` — браузерные тесты.

## Деплой

GitHub Pages: в **Settings → Pages → Source** выберите **GitHub Actions**. Workflow `.github/workflows/deploy.yml` публикует `dist` при push в `main` или ручном запуске.

Vite использует `base: './'` для относительных путей к ресурсам.

`VITE_SITE_URL` задаёт публичный URL для canonical и `hreflang`. В GitHub Actions адрес берётся из настроек Pages; для своего домена задайте переменную репозитория `VITE_SITE_URL`.

```sh
VITE_SITE_URL=https://example.com/ npm run build
```

Индексация закрыта: `noindex, nofollow` в `index.html` и `Disallow: /` в `public/robots.txt`.
