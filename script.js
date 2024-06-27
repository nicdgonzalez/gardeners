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

// -- INITIALIZE WINDOW DATABASE ---------------------------------------------

// window.addEventListener("load", () => {
//     /** @type {IDBDatabase} */
//     let database;
//     const openRequest = window.indexedDB.open("timezoneTracker");

//     const onOpenError = function(_event) {
//         console.error("failed to open IndexedDB");
//     };

//     openRequest.addEventListener("error", onOpenError);

//     openRequest.addEventListener("success", (_event) => {
//         console.info("successfully opened IndexedDB");

//         database = openRequest.result;

//         // displayData();  // docs example
//     });

//     openRequest.addEventListener("upgradeneeded", (event) => {
//         database = event.target.result;
//         database.addEventListener("error", onOpenError);
        
//         const objectStore = database.createObjectStore("timezoneTracker", {keyPath: "userProfiles"});
//         objectStore.createIndex("name", "name", {unique: true});
//         objectStore.createIndex("tzIdentifier", "tzIdentifier", {unique: false});
//         objectStore.createIndex("tags", "tags", {unique: false});
//     });
// });

// -- USER PROFILES ----------------------------------------------------------

// See following for value to insert into `timeZone`:
// https://en.wikipedia.org/wiki/List_of_tz_database_time_zones

// const users = (() => {
//     // ...
// })();

// -- ADD PROFILE POP-UP -----------------------------------------------------

(() => {
    const addProfileButton = document.getElementById("add-profile-button");
    const addProfilePopup = document.getElementById("add-profile-popup");

    addProfileButton.addEventListener("click", () => {
        if (addProfilePopup == undefined) {
            console.error("missing element with id=add-profile-popup")
            return;
        }

        addProfilePopup.style.display = "block";
    });

    // Make the X close the pop-up window
    const exitButton = document.getElementById("popup-close-button");

    exitButton.addEventListener("click", () => {
        addProfilePopup.style.display = "none";
    })
})();

(() => {
    const addProfileForm = document.querySelector("#popup-body form");
    addProfileForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const profileName = document.getElementById("name");
        const profileTimezone = document.getElementById("timezone-search");

        // add to database, display in profile list
        console.log(profileName.value);
        console.log(profileTimezone.value);

        profileName.value = "";
        profileTimezone.value = "";

        // stops the page from asking about resubmitting previous form data
        // on refresh
        if (window.history.replaceState) {
            window.history.replaceState(null, null, window.location.href);
        }
    });
})();