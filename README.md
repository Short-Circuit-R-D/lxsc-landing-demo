# LuxScale landing page: native HTML project

Open `index.html` in a browser, or serve the folder with any static server. No build step.

```
luxscale-site/
├── index.html
├── css/
│   ├── tokens.css        brand colours, gradient, fonts, light/dark themes
│   ├── base.css          reset, page defaults, .w wrapper
│   ├── header.css        header, logo swap, buttons, theme toggle
│   ├── hero.css          hero
│   ├── path.css          section basics + "Four steps" guided path
│   ├── fixtures.css      "Use your own fixtures" + polar diagram
│   ├── reports.css       "A report you can hand over"
│   ├── final-footer.css  closing call to action + footer
│   ├── responsive.css    mobile / tablet
│   └── motion.css        reduced-motion rules
├── js/
│   ├── config.js         Studio URL, future API endpoints (edit here)
│   ├── i18n.js           language scaffold (English only for now)
│   ├── hero-pattern.js   static brand pattern in the hero
│   ├── guided-path.js    scroll-driven steps and stage
│   ├── reveal.js         triggers the fixtures, report and closing animations
│   └── theme.js          light/dark toggle
├── assets/
│   ├── logo/             PUT YOUR LOGO FILES HERE (see assets/logo/README.md)
│   └── img/              other images
├── guides/getting-started.html   Quick start
├── pages/                standards, about, contact
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
