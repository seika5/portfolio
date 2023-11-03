const pages = document.querySelectorAll(".page");
const home = document.querySelector(".home");
const projects = document.querySelector(".projects");
const contact = document.querySelector(".contact");

// Page scroll
slide = (direction) => {
    let it_go;
    if (direction == "0") {
        it_go = 0;
        home.classList.add("active");
        projects.classList.remove("active");
        contact.classList.remove("active");
    } else if (direction == "1") {
        it_go = 100;
        home.classList.remove("active");
        projects.classList.add("active");
        contact.classList.remove("active");
    } else if (direction == "2") {
        it_go = 200;
        home.classList.remove("active");
        projects.classList.remove("active");
        contact.classList.add("active");
    }
    pages.forEach(pages => (pages.style.transform = `translateX(${-it_go}%)`));
}