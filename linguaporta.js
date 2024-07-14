// ==UserScript==
// @name         POLTA
// @namespace    http://tampermonkey.net/
// @version      2024-06-12
// @description  try to take over the world!
// @author       h1rose
// @match        https://w5.linguaporta.jp/user/kdix/index.php
// @icon         https://www.google.com/s2/favicons?sz=64&domain=linguaporta.jp
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    window.alert = (msg) => {console.log("wow", msg)};
    document.querySelector('input[value="正解を見る"]')?.click()
    document.querySelector('input[value="もう一度解答する"]')?.click()
    setTimeout(() => {
        if (!document.querySelector('input[value="もう一度解答する"]')) {
            document.querySelector('input[value="次の問題"]')?.click()
        }
    }, 1000)

    const title = document.querySelector(".page-title span").textContent
    const number = Number(document.querySelector(".problem-title").textContent.split("：")[1])
    const items = JSON.parse(localStorage.getItem(title)) || [];
    const drill_form = document.querySelector("#drill_form").textContent;
    const commentary = document.querySelector("#commentary")?.textContent;
    const anaInput = document.querySelector("#question_area input[readonly]")?.value || document.querySelector("#drill_form [readonly]")?.value
    //    document.querySelector("#question_area input").value

    const d = document.querySelector('#drill_form input')
    if (!d?.readOnly && d) {
        d.value = items?.[number] || ""
    }

    if (anaInput && anaInput !== "*") {
        items[number] = anaInput;
    }

    if (drill_form.includes("正解")) {
        items[number] = drill_form;

        if (anaInput && anaInput !== "*") {
            items[number] = anaInput;
        }
    }

    if (drill_form.includes("解答")) {
        items[number] = drill_form;
    }

    if (document.querySelector("#drill_form")?.querySelector("b")?.textContent) {
        items[number] = document.querySelector("#drill_form").querySelector("b").textContent
    }

    localStorage.setItem(title, JSON.stringify(items, undefined, 1));

    console.table(items);

    document.querySelector("#problem-area").innerHTML += `<p style="background: ${!items[number] ? 'red' : ''}">${items[number]}</p>`
})();
