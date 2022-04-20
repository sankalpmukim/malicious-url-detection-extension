(function () {
  /**
   * Check and set a global guard variable.
   * If this content script is injected into the same page again,
   * it will do nothing next time.
   */

  /**
   * Listen for messages from the background script.
   * Call "beastify()" or "reset()".
   */
  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "malicious") {
      console.log("malicious");
      const maliciousUrlError = `<p>The URL you are trying to visit is not allowed.</p>`;
      const element = document.createElement("div");
      element.className = "mal-error";
      element.innerHTML = maliciousUrlError;
      document.body.appendChild(element);
      element.style.display = "flex";
      element.style.justifyContent = "center";
      element.style.alignItems = "center";
      document.querySelectorAll("body > :not(.mal-error)").forEach((el) => {
        el.style.display = "none";
      });
    } else if (message.command === "reset") {
      hideMalicious();
    } else {
      console.log(message);
    }
  });
})();
