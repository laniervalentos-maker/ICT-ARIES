/* =========================
   MOBILE NAVIGATION
========================= */

const menuToggle =
    document.getElementById("menuToggle");

const navLinks =
    document.getElementById("navLinks");


menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});


document.querySelectorAll(".nav-links a")
    .forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

        });

    });


/* =========================
   DARK MODE
========================= */

const themeToggle =
    document.getElementById("themeToggle");


const savedTheme =
    localStorage.getItem("portfolioTheme");


if (savedTheme === "dark") {

    document.body.classList.add("dark");

    themeToggle.textContent = "☀️";

}


themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");


    if (document.body.classList.contains("dark")) {

        localStorage.setItem(
            "portfolioTheme",
            "dark"
        );

        themeToggle.textContent = "☀️";

    } else {

        localStorage.setItem(
            "portfolioTheme",
            "light"
        );

        themeToggle.textContent = "🌙";

    }

});


/* =========================
   SCROLL REVEAL
========================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================
   IMAGE GALLERY MODAL
========================= */

const imageModal =
    document.getElementById("imageModal");

const modalImage =
    document.getElementById("modalImage");

const modalCaption =
    document.getElementById("modalCaption");


function openImage(imageSource, caption) {

    modalImage.src = imageSource;

    modalImage.alt = caption;

    modalCaption.textContent = caption;

    imageModal.classList.add("active");

    document.body.classList.add("no-scroll");

}


function closeImage(event) {

    if (
        event &&
        event.target !== imageModal
    ) {

        return;

    }

    imageModal.classList.remove("active");

    document.body.classList.remove("no-scroll");

}


const closeModalButton =
    document.querySelector(".close-modal");


closeModalButton.addEventListener(
    "click",
    () => {

        imageModal.classList.remove("active");

        document.body.classList.remove(
            "no-scroll"
        );

    }
);


/* ESC KEY CLOSE */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        imageModal.classList.remove("active");

        document.body.classList.remove(
            "no-scroll"
        );

        document.getElementById(
            "projectMessage"
        ).classList.remove("active");

    }

});


/* =========================
   PROJECT DETAILS
========================= */

const projectMessage =
    document.getElementById("projectMessage");

const projectMessageTitle =
    document.getElementById("projectMessageTitle");


function showProjectMessage(projectName) {

    projectMessageTitle.textContent =
        projectName;

    projectMessage.classList.add("active");

    document.body.classList.add("no-scroll");

}


function closeProjectMessage() {

    projectMessage.classList.remove("active");

    document.body.classList.remove("no-scroll");

}


projectMessage.addEventListener(
    "click",
    event => {

        if (event.target === projectMessage) {

            closeProjectMessage();

        }

    }
);


/* =========================
   CONTACT FORM
========================= */

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");

const contactFields = [
    document.getElementById("name"),
    document.getElementById("email"),
    document.getElementById("message")
];

function setFieldState(field, state) {

    if (!field) return;

    field.classList.remove("valid", "invalid");

    if (state === "valid") {
        field.classList.add("valid");
    }

    if (state === "invalid") {
        field.classList.add("invalid");
    }

}

function validateFieldValue(field) {

    const value = field.value.trim();

    if (field.id === "email") {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    return value.length > 0;

}

contactFields.forEach(field => {

    field.addEventListener("input", () => {

        const isValid = validateFieldValue(field);
        setFieldState(field, isValid ? "valid" : (field.value.trim() ? "invalid" : ""));

    });

    field.addEventListener("blur", () => {

        if (field.value.trim() === "") {
            setFieldState(field, "invalid");
        }

    });

});


contactForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const name =
            document.getElementById("name")
                .value
                .trim();


        const email =
            document.getElementById("email")
                .value
                .trim();


        const message =
            document.getElementById("message")
                .value
                .trim();

        let hasError = false;

        if (name === "") {
            setFieldState(document.getElementById("name"), "invalid");
            hasError = true;
        } else {
            setFieldState(document.getElementById("name"), "valid");
        }

        if (email === "") {
            setFieldState(document.getElementById("email"), "invalid");
            hasError = true;
        } else {
            setFieldState(document.getElementById("email"), "valid");
        }

        if (message === "") {
            setFieldState(document.getElementById("message"), "invalid");
            hasError = true;
        } else {
            setFieldState(document.getElementById("message"), "valid");
        }

        if (hasError) {
            formMessage.textContent =
                "Please complete all fields.";
            formMessage.className = "form-message visible error";
            return;
        }


        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailPattern.test(email)) {

            setFieldState(document.getElementById("email"), "invalid");
            formMessage.textContent =
                "Please enter a valid email address.";
            formMessage.className = "form-message visible error";
            return;

        }


        formMessage.textContent =
            "Your message is ready to be sent. Thank you!";
        formMessage.className = "form-message visible success";

        contactForm.reset();
        contactFields.forEach(field => setFieldState(field, ""));

    }
);


/* =========================
   ACTIVE NAVIGATION
========================= */

const pageSections =
    document.querySelectorAll(
        "main section[id]"
    );

const navigationLinks =
    document.querySelectorAll(
        ".nav-links a"
    );


window.addEventListener("scroll", () => {

    let currentSection = "";


    pageSections.forEach(section => {

        const sectionTop =
            section.offsetTop - 130;

        const sectionHeight =
            section.offsetHeight;


        if (
            window.scrollY >= sectionTop &&
            window.scrollY <
            sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navigationLinks.forEach(link => {

        link.style.color = "";

        if (
            link.getAttribute("href") ===
            "#" + currentSection
        ) {

            link.style.color = "#2563eb";

        }

    });

});


/* =========================
   CLOSE MOBILE MENU
   WHEN CLICKING OUTSIDE
========================= */

document.addEventListener("click", event => {

    if (
        !event.target.closest(".navbar") &&
        navLinks.classList.contains("active")
    ) {

        navLinks.classList.remove("active");

    }

});


/* =========================
   CONSOLE MESSAGE
========================= */

console.log(
    "Lanier Jaron Valentos Portfolio loaded successfully."
);