// ==UserScript==
// @name         Alienworlds AutoSign
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Alienworlds has auto sign problem.
// @author       You
// @match        https://all-access.wax.io/cloud-wallet/signing/
// @grant        none
// ==/UserScript==

(function () {
    console.log("[Script]", "Script loading.");
    function task () {
        // Auto Sign
        var button = document.getElementsByClassName("button-text");
        if (button.length == 1) {
            var requestFrom = document.getElementsByClassName("origin-app text-bold text-2rem")[0].innerText;
            if (requestFrom == "play.alienworlds.io") {
                button[0].click();
            }
        }

    }
    setInterval(() => { task() }, 1000);

    console.log("[Script]", "Script loaded.");
})();
