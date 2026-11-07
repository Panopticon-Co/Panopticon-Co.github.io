// Theme toggle, diagram lightbox and gallery filters. No dependencies.
(function () {
  var root = document.documentElement;
  var KEY = "pano-theme";
  function stored() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function save(v) { try { localStorage.setItem(KEY, v); } catch (e) { /* storage unavailable */ } }
  var initial = stored();
  if (initial === "light" || initial === "dark") root.setAttribute("data-theme", initial);

  function current() {
    var t = root.getAttribute("data-theme");
    if (t) return t;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.querySelector(".theme-btn");
    if (btn) {
      var label = function () { btn.setAttribute("aria-label", current() === "dark" ? "Switch to light theme" : "Switch to dark theme"); };
      label();
      btn.addEventListener("click", function () {
        var next = current() === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", next);
        save(next);
        label();
      });
    }

    // Lightbox for any image marked .zoom
    var box = document.createElement("div");
    box.className = "lightbox";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.setAttribute("aria-label", "Enlarged figure");
    var big = document.createElement("img");
    box.appendChild(big);
    document.body.appendChild(box);
    var close = function () { box.classList.remove("open"); big.removeAttribute("src"); };
    box.addEventListener("click", close);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
    document.querySelectorAll("img.zoom").forEach(function (img) {
      img.tabIndex = 0;
      var open = function () { big.src = img.currentSrc || img.src; big.alt = img.alt; box.classList.add("open"); };
      img.addEventListener("click", open);
      img.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
    });

    // Gallery filters
    var buttons = document.querySelectorAll(".filters button");
    buttons.forEach(function (b) {
      b.addEventListener("click", function () {
        var f = b.getAttribute("data-filter");
        buttons.forEach(function (o) { o.setAttribute("aria-pressed", o === b ? "true" : "false"); });
        document.querySelectorAll(".gallery [data-group]").forEach(function (fig) {
          fig.hidden = !(f === "all" || fig.getAttribute("data-group") === f);
        });
      });
    });
  });
})();
