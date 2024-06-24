// -- HEADER DATE/TIME -----------------------------------------------------------

(() => {
    const headerClock = document.getElementById("header-local-time");

    if (headerClock == undefined) {
        return;
    }

    setInterval(() => {
        const now = new Date();
        headerClock.innerHTML = (() => {
            const options = {
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: false,
            };
            return Intl.DateTimeFormat("en-US", options).format(now);
        })();

        const headerDate = document.getElementById("header-local-date");

        if (headerDate == undefined) {
            return;  // if date is not available, update the time and leave
        }

        headerDate.innerHTML = (() => {
            const options = { year: "numeric", month: "long", day: "2-digit" };
            return Intl.DateTimeFormat("en-US", options).format(now);
        })();
    }, 1000);
})();

// -- LIGHT/DARK THEME TOGGLE ------------------------------------------------
(() => {
    const themeToggle = document.getElementById("theme-toggle");

    if (themeToggle == undefined) {
        return;  // can't do anything without the toggle
    }

    const html = document.querySelector("html");
    console.assert(html != undefined);
    const attr = "data-theme";

    const setTheme = function (theme) {
        html.setAttribute(attr, theme);
        localStorage.setItem(attr, theme);
    };

    themeToggle.addEventListener("click", () => {
        html.getAttribute(attr) === "dark" ? setTheme("light") : setTheme("dark");
    });
})();

// -- USER PROFILES ----------------------------------------------------------

// See following for value to insert into `timeZone`:
// https://en.wikipedia.org/wiki/List_of_tz_database_time_zones

// const users = (() => {
//     // ...
// })();