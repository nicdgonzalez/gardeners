// When adding new users, use this for the "timeZone" value:
// https://en.wikipedia.org/wiki/List_of_tz_database_time_zones

const baseOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
};

const users = {
    "ruuflufferoo": {
        timeZone: "Asia/Manila", ...baseOptions
    },
    "oniyuriasahi": {
        timeZone: "Europe/Paris", ...baseOptions
    },
    "nicdgonzalez": {
        timeZone: "US/Eastern", ...baseOptions
    },
    ".taiyou": {
        timeZone: "US/Eastern", ...baseOptions
    },
    "lulufleur": {
        timeZone: "US/Eastern", ...baseOptions
    },
    "sonnysammy": {
        timeZone: "US/Eastern", ...baseOptions
    },
    "ariagalz": {
        timeZone: "US/Central", ...baseOptions
    }
};

/**
 * Convert a Discord username to a valid HTML attribute.
 * @param {string} name - A Discord username
 * @returns {string}
 */
const usernameToAttribute = function (name) {
    return name.replace(".", "-");
};

/**
 * Convert an HTML attribute back into a Discord username.
 * @param {string} attr - An HTML attribute
 * @returns {string}
 */
const attributeToUsername = function (attr) {
    return attr.replace("-", ".");
};

/**
 * @param {string} timeString
 * @returns {boolean}
 */
const isPM = function(timeString) {
    return timeString.charAt(timeString.length - 2) === "P";
}

setInterval(() => {
    const date = new Date();

    const localTime = document.querySelector("#local-time h1");
    localTime.innerHTML = date.toLocaleTimeString();

    for (const user in users) {
        const options = users[user];
        const dateTimeFormat = new Intl.DateTimeFormat("en-US", options);
        const userProfileCardFmt = `.profile-card#${usernameToAttribute(user)}`;
        const timeElement = document.querySelector(userProfileCardFmt + " p");
        timeElement.innerHTML = dateTimeFormat.format(date);

        // this is extremely inefficient... going to hold off on this for now
        //
        // const userProfileCard = document.querySelector(
        //     `.profile-card#${usernameToAttribute(user)}`
        // );
        // const timeIcon = document.createElement("img");
        // timeIcon.setAttribute(
        //     "src",
        //     `./static/${isPM(timeElement.innerHTML)? "sun": "moon"}.svg`
        // );
        // userProfileCard.appendChild(timeIcon);
    }
}, 1000);

