# LuxScale landing page: native HTML project

Open `index.html` in a browser, or serve the folder with any static server. No build step.

```
luxscale-site/
├── index.html
├── css/                  tokens, base, header, hero, path (pinned scroll section), fixtures, reports,
│                         verify, final-footer, pages, responsive, rtl (Arabic), motion
├── js/
│   ├── layout.js         shared header (nav, EN/AR, theme, menu) and footer for EVERY page
│   ├── config.js         Studio URL, report verification API, contact settings
│   ├── lang-ar.js        Arabic (Modern Standard) strings, keyed by the English text
│   ├── i18n.js           EN / AR switch (saves the choice, flips to right-to-left)
│   ├── hero-pattern.js   moving light on the brand pattern
│   ├── guided-path.js    pinned scroll section: text and illustration change together
│   ├── reveal.js         triggers fixtures, report and closing animations
│   ├── verify.js         report scanner, API check, result states
│   ├── contact.js        contact form
│   └── theme.js          light/dark toggle
├── assets/
│   ├── logo/             PUT YOUR LOGO FILES HERE (see assets/logo/README.md)
│   └── img/              other images
├── guides/getting-started.html   Quick start
├── pages/                features, standards, verify, about, contact
└── 404.html
```

## Logo paths

- `assets/logo/lxscale_logo_light.svg`
- `assets/logo/lxscale_logo_dark.svg`
- `assets/logo/favicon.svg`

## Notes for the team

- **Open Studio buttons:** every one carries `data-studio`; `js/config.js` sets their link. Change `studioUrl` once.
- **Wizard / calculation APIs:** add endpoints to `window.LX.api` in `js/config.js`.
- **Fonts:** IBM Plex Sans and IBM Plex Mono load from Google Fonts in `index.html`. Self-host them for production if needed.
- **Translations:** text tagged `data-i18n` can be translated through `T` in `js/i18n.js`. Only some strings are tagged so far.
- **Inner pages** share `js/layout.js` (header and footer, edit links once; works from file://) and `css/pages.css`.
- **Contact form:** set `contactEmail` or `contactEndpoint` in `js/config.js`; until then the form says it is not connected.
- The step illustrations and the polar diagram are inline SVG in `index.html`, animated by `css/path.css` and `css/fixtures.css`. The logo is not drawn anywhere.

- **Verify a report:** `js/verify.js` + `js/config.js` (`verify`). It starts in demo mode (`mock:true`: `public-demo`, `private-demo`, any other ID = not found). Set `verify.api`, `verify.reportPage` and `mock:false` for real use. Camera needs HTTPS or localhost.

## Link preview (WhatsApp, Facebook, X, LinkedIn)

Called **Open Graph** tags. They are inside `<!-- share-tags -->` in the head of every page.

- Put the preview image at `assets/img/og-image.png`: **1200 × 630 px**, under 300 KB (WhatsApp ignores heavy images). It is the logo on a plain brand background.
- Put a 180 × 180 px `assets/img/apple-touch-icon.png` for phone home screens.
- The tags assume the site lives at `https://lxscale.com/`. If the domain differs, replace it in every page.
- Messengers cache previews. After changing them, refresh with Facebook's Sharing Debugger; WhatsApp may take a while or need a link with `?v=2`.

## Navigation and language

- The header (links, EN/AR button, theme, menu on phones) is built once in `js/layout.js`. Add a page by adding one line to its `nav` list.
- Every page loads `js/lang-ar.js` and `js/i18n.js`. To translate new text, add `"English text": "النص العربي"` to `js/lang-ar.js` (the key is the exact English text on the page). Untranslated text stays in English.
- Studio button names (NEW PROJECT, WIZARD, ...) stay in English on purpose because that is how they appear in Studio.
