// ==UserScript==
// @name         alienworlds
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://play.alienworlds.io/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function () {
    console.log("[Script]", "Script loading.");
    let step = 0;
    let clock = 0;
    let account;

    function task () {
        if (account == undefined) return;
        // console.log("[Script]", 'task', 'cpu', account['cpu_limit']['available'], 'net', account['net_limit']['available']);
        if (account['cpu_limit']['available'] <= 0) return;
        if (account['net_limit']['available'] <= 0) return;

        // auto mine and cliam
        var buttons = document.getElementsByClassName("css-rrm59m");
        for (let index = 0; index < buttons.length; index++) {
            let button = buttons[index];
            if (button.innerHTML == "Mine") {
                button.click();
                step = 1;
                console.log("[Script]", "Mine");
                break;
            } else if (button.innerHTML == "Claim Mine" && step == 1) {
                button.click();
                step = 2;
                let trilium = document.getElementsByClassName("chakra-text css-dvssua")[0].innerText;
                console.log("[Script]", "Claim, TLM:", trilium);
                break;
            }
        }

        // wait
        var text = document.getElementsByClassName("chakra-text css-1phfdwl")[1].innerText;
        if (text == 'Next Mine Attempt' && step != 0) {
            step = 0;
            setTimeout(() => {
                let trilium = document.getElementsByClassName("chakra-text css-dvssua")[0].innerText;
                console.log("[Script]", "Waiting, TLM:", trilium);
            }, 10000)
        }

        if (step > 0) {
            // timeout
            clock++;
            if (clock > 30) {
                clock = 0;
                step = 1;
                console.log("[Script]", "Timeout");
            }
        } else {
            clock = 0;
        }
    }

    function get_account() {
        let datas = JSON.stringify({
            'account_name': 'uebay.wam',
        });
        GM_xmlhttpRequest({
            method: 'POST',
            url: 'https://wax.greymass.com/v1/chain/get_account',
            headers: { 'Content-Type': 'application/json' },
            data: datas,
            onload: function (response) {
                account = JSON.parse(response.responseText);
            },
            onerror: function (response) {
                console.log("[Script]", 'get_account fail.');
            }
        });
    };

    setInterval(() => { get_account() }, 20000);
    setInterval(() => { task() }, 1000);

    console.log("[Script]", "Script loaded.");
})();
