// (function () {
//   /**
//    * Check and set a global guard variable.
//    * If this content script is injected into the same page again,
//    * it will do nothing next time.
//    */
//   if (window.hasRun) {
//     return;
//   }
//   window.hasRun = true;

//   const maliciousUrlError = `<p class="mal-error">The URL you are trying to visit is not allowed.</p>`;
//   const element = document.createElement("div");
//   element.innerHTML = maliciousUrlError;
//   document.body.appendChild(element);
//   element.style.display = "none";

//   function displayMalicious() {
//     element.style.display = "block";
//   }

//   /**
//    * Listen for messages from the background script.
//    * Call "beastify()" or "reset()".
//    */
//   browser.runtime.onMessage.addListener((message) => {
//     if (message.command === "malicious") {
//       displayMalicious();
//     } else if (message.command === "reset") {
//       hideMalicious();
//     }
//   });
// })();
