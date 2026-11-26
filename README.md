# LuxScale landing page: native HTML project

**Content source:** all page copy on Home, Features, Standards, Quick start and About is summarized from the LxScale Studio user documentation (quickstart, studio-workspace, tools-*, calculate-automate-reports, projects-and-account, shortcuts-and-troubleshooting). The Verify and Contact pages are site functions with no counterpart in that documentation and were left as they were.

the tool documentation is in (docs)[./docs/]

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

- `assets/img/og-image.png` (1200 × 630 px, about 35 KB) is the logo on the brand background, made from `assets/logo/lxscale_logo_dark.svg`. Messengers do not accept SVG as a preview image, so the PNG is what `og:image` and `twitter:image` use. Regenerate it if the logo changes.
- `assets/img/apple-touch-icon.png` (180 × 180 px) is the logo mark for phone home screens; `assets/logo/favicon.svg` is the mark cropped from the logo.
- The logo path itself is also declared in every page: `og:logo` and the Organization `logo` in the JSON-LD on the home page both point to `assets/logo/lxscale_logo_light.svg`.
- The tags assume the site lives at `https://lxscale.com/`. If the domain differs, replace it in every page.
- Messengers cache previews. After changing them, refresh with Facebook's Sharing Debugger; WhatsApp may take a while or need a link with `?v=2`.

## Navigation and language

- The header (links, EN/AR button, theme, menu on phones) is built once in `js/layout.js`. Add a page by adding one line to its `nav` list.
- Every page loads `js/lang-ar.js` and `js/i18n.js`. To translate new text, add `"English text": "النص العربي"` to `js/lang-ar.js` (the key is the exact English text on the page). Untranslated text stays in English.
- Studio button names (NEW PROJECT, WIZARD, ...) stay in English on purpose because that is how they appear in Studio.

## Sign in and Create account

- Only on the **Quick start** page, under step 1 (Sign in). Header, hero and closing sections keep the **Open Studio** button.
- Addresses are set once in `js/config.js`: `loginUrl` (Studio sign-in, Short Circuit SSO) and `signupUrl`. Leave `signupUrl` empty to send **Create account** to the same SSO page, or set it if Short Circuit has a separate registration page.
- Any link with `data-login` or `data-signup` picks its address from `config.js`.

## SEO files

- `robots.txt` allows all crawlers and points to the sitemap. `sitemap.xml` lists the 7 public pages (404 is `noindex` and left out). Update `lastmod` when a page changes, and add new pages to it.
- Every page has `robots`, canonical, Open Graph, Twitter and JSON-LD (Organization, WebSite and SoftwareApplication on Home; breadcrumbs on inner pages) inside `<!-- share-tags -->`. Titles and descriptions use the wording of the LxScale Studio docs (EN 12464-1, Quickstart Lighting Study, Calculate Room, Overdesign Cap, .ies/.ldt).
- After deploying, submit `https://lxscale.com/sitemap.xml` in Google Search Console and Bing Webmaster Tools.
