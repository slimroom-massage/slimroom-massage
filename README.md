# Slimroom

Статический сайт с языковыми версиями RU/EN/EL.

## Стек

React 19, TypeScript 5, Vite 7, CSS. Тесты — Playwright, форматирование — Prettier. Требуется Node.js 22.12+ и npm.

## Команды

```sh
npm ci              # установка зависимостей
npm run dev         # локальный сервер
npm run check       # проверка типов
npm run build       # сборка и пререндеринг в dist/
npm run preview     # просмотр сборки
npm test            # браузерные тесты; предварительно выполнить сборку
npm run format      # форматирование
```

Для тестов нужен установленный Google Chrome.

## Структура

- `src/site/` — компоненты, контент, стили и SEO.
- `src/assets/` — изображения.
- `scripts/prerender.mjs` — HTML для RU/EN/EL (`index.html`, `en.html`, `el.html`).
- `tests/` — браузерные тесты.

## Публикация

GitHub Pages через `.github/workflows/deploy.yml`: push в `main` или ручной запуск. В настройках Pages выберите источник **GitHub Actions**. Публикуется `dist/`; `base: './'` обеспечивает относительные пути к ресурсам.

`VITE_SITE_URL` — публичный HTTPS-адрес для canonical и `hreflang`. В CI используется URL GitHub Pages или переменная репозитория `VITE_SITE_URL`.

Индексация закрыта через `noindex, nofollow` в `index.html` и `Disallow: /` в `public/robots.txt`.
