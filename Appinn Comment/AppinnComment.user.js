// ==UserScript==
// @name         Appinn comment
// @namespace    hoothin
// @version      2024-06-07
// @description  将小众软件论坛的评论内容显示在主站对应页面下部
// @author       hoothin
// @match        https://www.appinn.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_xmlhttpRequest
// @connect      meta.appinn.net
// ==/UserScript==

(function() {
    'use strict';
    const commentLink = document.querySelector('a.wpdc-join-discussion-link');
    if (!commentLink) return;
    GM_xmlhttpRequest({
        url: commentLink.href,
        method: 'GET',
        onload: function(res) {
            try {
                let doc = document.implementation.createHTMLDocument('');
                doc.documentElement.innerHTML = res.response;
                let dataPreloaded = doc.getElementById('data-preloaded');
                if (!dataPreloaded) return;
                dataPreloaded = JSON.parse(JSON.parse(dataPreloaded.dataset.preloaded)["topic_" + commentLink.href.match(/\d+/)[0]]).post_stream.posts;
                console.log(dataPreloaded);
                let posts = document.createElement("ul");
                posts.style.maxHeight = '100vh';
                posts.style.overflow = 'auto';
                let title = document.createElement("h3");
                title.innerText = "评论内容";
                document.querySelector('article').appendChild(title);
                document.querySelector('article').appendChild(posts);
                dataPreloaded.forEach(item => {
                    posts.innerHTML += `<li>${item.cooked}</li>`;
                });
            } catch (e) {
            }
        }
    });
})();