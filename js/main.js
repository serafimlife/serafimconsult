document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  initDomainEmail();
});

// Derives the contact address from whatever domain the site is served on
// (serafim@<hostname>), so the same static HTML works unchanged if this
// site is ever moved to a different domain.
function initDomainEmail() {
  var FALLBACK_DOMAIN = "serafimivanov.com";
  var host = window.location.hostname.replace(/^www\./, "");
  var domain = host && host !== "localhost" && host.indexOf(".") !== -1 ? host : FALLBACK_DOMAIN;
  var email = "serafim@" + domain;

  document.querySelectorAll("[data-email-link]").forEach(function (el) {
    var subject = el.getAttribute("data-email-subject");
    el.href = "mailto:" + email + (subject ? "?subject=" + encodeURIComponent(subject) : "");
    if (el.hasAttribute("data-email-text")) {
      el.textContent = email;
    }
  });
}
