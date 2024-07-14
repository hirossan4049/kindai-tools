// ==UserScript==
// @name         Kinky
// @namespace    http://tampermonkey.net/
// @version      2024-05-25
// @description  try to take over the world!
// @author       You
// @match        https://gakubu.kuled.kindai.ac.jp/contents/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=kindai.ac.jp
// @grant        none
// ==/UserScript==
(function() {
    'use strict';
    console.log("KINKY INIT")
    gen();
    document.body.addEventListener('keydown', event => {
        if (event.key === 'p' && event.ctrlKey) {
            gen()
        }
    });
})();

function gen() {
    const OPENAI_TOKEN = 'sk-proj-444444kindai4444444'
    document.querySelector(".test_question").innerHTML += `<div>...</div>`
    console.log("GEN")
    const dom = document.querySelector(".test_question")
    console.log("dom is", dom);
    if (!dom) return
    const question = dom.innerText
    console.log(question);

    fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_TOKEN}`
        },
        body: JSON.stringify({
            messages: [{"role": "system", "content": "あなたは素晴らしい近畿大学情報学部情報学科の生徒です！問題を出しますので、答えの番号のみを出力してください！"},
                       {"role": "user", "content": question}],
            model: "gpt-4o",
            max_tokens: 500,
            temperature: 1,
            n: 1,
            stop: '###'
        })
    })
        .then(response => response.json())
        .then(data => {
        const text = data.choices[0].message.content;
        document.querySelector(".test_question").innerHTML += `<h1 style='color:red'>${text}</h1>`
    })
        .catch(error => console.error(error));
}
