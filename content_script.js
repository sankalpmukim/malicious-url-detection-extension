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
      const maliciousUrlError = `
      <img src="https://i.pinimg.com/originals/11/93/75/1193757011cacbb72f66047f019dd2c6.jpg" height="35vh" />
      <p style="font-size: large;">The URL you are trying to visit is not allowed.</p>
      `;
      const element = document.createElement("div");
      element.className = "mal-error";
      element.innerHTML = maliciousUrlError;
      document.body.appendChild(element);
      element.style.display = "flex";
      element.style.justifyContent = "center";
      element.style.alignItems = "center";
      element.style.height = "100vh";
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
