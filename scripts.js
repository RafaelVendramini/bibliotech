document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll("nav ul li a");

    links.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            loadPage(link.getAttribute("href"));
        });
    });
});

async function loadPage(page) {
    const response = await fetch(page);
    const content = await response.text();
    document.querySelector("main").innerHTML = content;
    window.history.pushState(null, null, page);
}

window.addEventListener("popstate", () => {
    loadPage(location.pathname);
});
