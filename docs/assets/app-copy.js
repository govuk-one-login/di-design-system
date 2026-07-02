document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.app-copy-button').forEach(function (button) {
    button.addEventListener('click', function () {
      var codeBlock = button.closest('.app-example__code').querySelector('code');
      if (!codeBlock) return;
      navigator.clipboard.writeText(codeBlock.textContent).then(function () {
        var original = button.textContent;
        button.textContent = 'Code copied';
        setTimeout(function () { button.textContent = original; }, 2000);
      });
    });
  });
});
