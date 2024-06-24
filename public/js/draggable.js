/**
 * @param {event} e
 */
const onDrop = function(e) {
    e.preventDefault();
    const data = e.dataTransfer.getData("text");
    e.target.appendChild(document.getElementById(data));
    /* e.target.replaceChild(e.target, document.getElementById(data)); */
};

/**
 * @param {event} e
 */
const onDragOver = function(e) {
    if (e.target.classList.contains("profile-cards")) {
        e.preventDefault();
    }
};

/**
 * @param {event} e
 */
const onDragStart = function(e) {
    e.dataTransfer.setData("text/plain", e.target.id);
}

const onDragEnter = function(e) {
    if (e.target.classList.contains("drop-zone")) {
        e.target.classList.add("drop-target");
    }
}

const onDragLeave = function(e) {
    if (e.target.classList.contains("drop-target")) {
        e.target.classList.remove("drop-target");
    }
}

const target = document.querySelector(".drop-zone");

/*
target.addEventListener("dragenter", onDragEnter);
target.addEventListener("dragleave", onDragLeave);
*/
