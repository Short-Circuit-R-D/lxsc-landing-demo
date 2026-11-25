/* Edit these values; every "Open Studio" button reads studioUrl.
   Wizard / calculation API endpoints can be added here later. */
window.LX = {
  studioUrl: "https://studio.lxscale.com/projects",
  api: { wizard: "" },
  contactEmail: "",     /* fill in: opens the visitor's mail app */
  contactEndpoint: ""   /* or a URL that accepts a JSON POST */
};
document.querySelectorAll("[data-studio]").forEach(function (a) { a.href = window.LX.studioUrl; });
