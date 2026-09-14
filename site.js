(function () {
  var backTop = document.querySelector(".back-top");
  var links = Array.prototype.slice.call(document.querySelectorAll(".toc a"));
  var sections = links
    .map(function (link) {
      var id = link.getAttribute("href");
      return id ? document.querySelector(id) : null;
    })
    .filter(Boolean);

  function onScroll() {
    if (backTop) {
      backTop.classList.toggle("visible", window.scrollY > 420);
    }

    var current = sections[0];
    var offset = 120;
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].getBoundingClientRect().top - offset <= 0) {
        current = sections[i];
      }
    }

    links.forEach(function (link) {
      var active = current && link.getAttribute("href") === "#" + current.id;
      link.classList.toggle("active", !!active);
      if (active) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  if (backTop) {
    backTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
