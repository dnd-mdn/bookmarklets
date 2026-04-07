/**
 * @name Canada Links
 * @description Provides quick links for navigating canada.ca and its author environment.
 * @version 2026-04-02
 */
(function () {

    // Only run on canada.ca pages
    if (window.location.origin !== "https://www.canada.ca") return;

    // Find the language toggle list
    const list = document.querySelector("#wb-lng ul.list-inline");
    if (!list) return;

    const author = "https://author-canada-prod.adobecqms.net";
    const path = "/content/canadasite" + window.location.pathname.replace('\.html', '');

    list.insertAdjacentHTML("beforeend", `
        <li><a href="${author}/editor.html${path}.html" target="_blank" rel="noopener noreferrer">Edit</a></li>
        <li><a href="${author}/mnt/overlay/wcm/core/content/sites/properties.html?item=${path}" target="_blank" rel="noopener noreferrer">Properties</a></li>
        <li><a href="${author}/sites.html${path.replace(/\/[^/]+$/, "")}" target="_blank" rel="noopener noreferrer">Folder</a></li>
        <li><a href="https://www.canada.ca${path}/_jcr_content.json?_=${Date.now()}" target="_blank" rel="noopener noreferrer">Metadata</a></li>
        <li><a href="${author}${path}.html" target="_blank" rel="noopener noreferrer">Preview</a></li>
    `);
})();