/* Edit these values; every "Open Studio" button reads studioUrl.
   Wizard / calculation API endpoints can be added here later. */
window.LX = {
  studioUrl: "https://studio.lxscale.com/projects",
  /* Account buttons (header, hero, closing section, page footers).
     Studio signs in with Short Circuit SSO at /login. If Short Circuit has a separate
     sign-up page, put its address in signupUrl; until then Create account uses the same SSO page. */
  loginUrl: "https://studio.lxscale.com/login",
  signupUrl: "",
  api: { wizard: "" },
  /* Report verification (section "Verify a report").
     api / reportPage use {id}. Set mock:false once api is real.
     Assumed API: GET api -> 404 = not found, 401/403 = private, 200 JSON {"visibility":"public"|"private"}. */
  verify: {
    mock: true,
    api: "",          /* e.g. https://api.lxscale.com/reports/{id} */
    reportPage: "",   /* e.g. https://lxscale.com/report.html?id={id} */
    signIn: "",       /* optional: where "Sign in to view" goes for private reports ({id} allowed); default = Studio */
    fallbackScript: "" /* optional ZXing script URL for browsers without BarcodeDetector */
  },
  contactEmail: "",     /* fill in: opens the visitor's mail app */
  contactEndpoint: ""   /* or a URL that accepts a JSON POST */
};
document.querySelectorAll("[data-studio]").forEach(function (a) { a.href = window.LX.studioUrl; });
document.querySelectorAll("[data-login]").forEach(function (a) { a.href = window.LX.loginUrl; });
document.querySelectorAll("[data-signup]").forEach(function (a) { a.href = window.LX.signupUrl || window.LX.loginUrl; });
