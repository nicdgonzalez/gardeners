// set the color theme preferences upon entering the website
(() => {
    const theme = localStorage.getItem("data-theme") || "dark";
    localStorage.setItem("data-theme", theme);

    const html = document.querySelector("html");
    console.assert(html != undefined);
    html.setAttribute("data-theme", theme);
})();