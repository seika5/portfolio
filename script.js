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

jQuery(document).ready(function() {

    var mouseX = 0, mouseY = 0;
    var xp = 0, yp = 0;
    var moving = 0;

    setInterval(function() {
        if(window.innerHeight > window.innerWidth){
            console.log("vert");
            mouseX = -1000;
            mouseY = -1000;
        } else {
            $(document).mousemove(function (e) {
                if (mouseX != e.pageX - 1000 && mouseY != e.pageY - 1000) {
                    mouseX = e.pageX - 1000;
                    mouseY = e.pageY - 1000;
                    if (moving < 2950) {
                        moving += 50;
                    } else {
                        moving = 3000;
                    }
                }
            });
            if (moving > 0) {
                moving -= 20;
            }
        }
    }, 20);

    setInterval(function () {
        if(window.innerHeight > window.innerWidth) {
            xp = -1000;
            yp = -1000;
            $("#circle").css({left: '0px', top: '0px'});
        } else {
            xp += ((mouseX - xp) / 10);
            yp += ((mouseY - yp) / 10);
            $("#circle").css({left: xp + 'px', top: yp + 'px'});
        }
    }, 20);

    setInterval(function() {
        if (moving < 2500) {
            $("#circle").css({opacity: (moving/2500)});
        } else {
            $("#circle").css({opacity: 1});
        }
    }, 20);

});