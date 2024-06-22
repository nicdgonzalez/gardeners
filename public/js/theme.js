const html = document.querySelector("html");
var preference = localStorage.getItem("data-theme");

if (preference === null) {
    var preference = "light";
    localStorage.setItem("data-theme", preference);
}

html.setAttribute("data-theme", preference);

const themeToggle = document.getElementById("theme-toggle");

themeToggle.onclick = function() {
    if (html.getAttribute("data-theme") === "light") {
        localStorage.setItem("data-theme", "dark");
        html.setAttribute("data-theme", "dark");
    } else {
        localStorage.setItem("data-theme", "light");
        html.setAttribute("data-theme", "light");
    }
}
