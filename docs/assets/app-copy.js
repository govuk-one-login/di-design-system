document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".app-copy-button").forEach(function (button) {
    button.addEventListener("click", function () {
      var codeBlock = button
        .closest(".app-example__code")
        .querySelector("code");
      if (!codeBlock) return;
      navigator.clipboard.writeText(codeBlock.textContent).then(function () {
        var original = button.textContent;
        button.textContent = "Copied";
        setTimeout(function () {
          button.textContent = original;
        }, 2000);
      });
    });
  });

  document
    .querySelectorAll('[data-module="app-tabs"]')
    .forEach(function (tabsEl) {
      var tabs = Array.from(tabsEl.querySelectorAll(".govuk-tabs__tab"));
      var panels = tabsEl.querySelectorAll(".govuk-tabs__panel");

      function selectTab(selectedTab) {
        var targetId = selectedTab.hash.slice(1);
        tabs.forEach(function (tab) {
          var isSelected = tab === selectedTab;
          tab.setAttribute("aria-selected", String(isSelected));
          tab.parentElement.classList.toggle(
            "govuk-tabs__list-item--selected",
            isSelected,
          );
        });
        panels.forEach(function (panel) {
          panel.classList.toggle(
            "govuk-tabs__panel--hidden",
            panel.id !== targetId,
          );
        });
        selectedTab.focus();
      }

      tabs.forEach(function (tab) {
        tab.addEventListener("click", function (e) {
          e.preventDefault();
          selectTab(tab);
        });

        tab.addEventListener("keydown", function (e) {
          var index = tabs.indexOf(tab);
          if (e.key === "ArrowRight") {
            selectTab(tabs[(index + 1) % tabs.length]);
          } else if (e.key === "ArrowLeft") {
            selectTab(tabs[(index - 1 + tabs.length) % tabs.length]);
          }
        });
      });
    });
});
