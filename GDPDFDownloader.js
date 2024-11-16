// ==UserScript==
// @name         Google Drive PDF Downloader
// @namespace    http://tampermonkey.net/
// @version      2024-11-16
// @description  try to take over the world!
// @author       You
// @match        https://drive.google.com/file/d/*/view
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @require      https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.3/jspdf.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const downloadButton = document.createElement('button');
    downloadButton.innerText = 'Download PDF';
    downloadButton.style.padding = '20px 20px';
    downloadButton.style.backgroundColor = '#28a745';
    downloadButton.style.color = '#fff';
    downloadButton.style.border = 'none';
    downloadButton.style.cursor = 'pointer';
    downloadButton.style.width = '100%';
    downloadButton.style.marginTop = '20px';
    downloadButton.style.borderRadius = '5px';

    window.addEventListener('load', function(e) {
        document.querySelector("[role=document]").appendChild(downloadButton)
    })

    downloadButton.onclick = function () {
        let latestCount = 0;
        let sameLength = 0;
        let interval = setInterval(() => {
            const imgs = document.querySelector("[role=document]").querySelectorAll("img");
            if (latestCount == imgs.length) {
                if (sameLength == 10) {
                    clearInterval(interval)

                    save();
                } else {
                    sameLength += 1
                }
            }
            document.querySelector("[role=document]").parentElement.scrollTo(0, 10000000);
            latestCount = imgs.length;
        }, 300)
        }

    window.addEventListener('load', function(e) {

    })

    function save() {
        const imgs = document.querySelector("[role=document]").querySelectorAll("img");

        function imageToBase64(img) {
            var canvas = document.createElement('canvas');
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
            return canvas.toDataURL("image/jpeg");
        }

        const pdf = new jsPDF();
        imgs.forEach((img, index) => {
            console.log(img.width, img.height);
            // mm に変換 (jsPDF は単位が mm)
            const mmWidth = img.width * 0.264583; // 1px = 0.264583 mm
            const mmHeight = img.height * 0.264583;
            //if (index == 0) {
            //      pdf.setPageSize([mmWidth, mmHeight]);
            //   } else {
            pdf.addPage([mmWidth, mmHeight]);
            //   }
            pdf.addImage(imageToBase64(img), 'JPEG', 0, 0, mmWidth, mmHeight);
        })
        pdf.deletePage(1)
        const title = document.querySelector('[property="og:title"]').content?.replaceAll(".pdf", "") || document.title;

        pdf.save(title + ".pdf");
    }
})();
