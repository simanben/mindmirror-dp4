(() => {

    /* =====================================================
       GENERAL
       ===================================================== */

    const screens =
        [...document.querySelectorAll(".screen")];


    let selectedCorrection = null;
    let pauseChoice = null;
    let deleteChoice = null;



    /* =====================================================
       SCREEN NAVIGATION
       ===================================================== */

    function showScreen(name) {

        const target =
            document.querySelector(
                `[data-screen="${name}"]`
            );


        if (!target) {

            console.warn(
                "Scherm bestaat niet:",
                name
            );

            return;

        }


        screens.forEach(screen => {

            screen.classList.toggle(
                "active",
                screen === target
            );

        });


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }



    /* =====================================================
       BOTTOM NAVIGATION
       ===================================================== */

    function getBottomNav(active) {

        return `

            <button
                class="nav-item ${active === "home" ? "active" : ""}"
                data-go="home"
                type="button"
            >

                <span class="nav-icon">

                    <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >

                        <path
                            d="M3 10.8L12 3l9 7.8v9.2a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />

                    </svg>

                </span>

                <small>
                    Home
                </small>

            </button>



            <button
                class="nav-item ${active === "insights" ? "active" : ""}"
                data-go="insights"
                type="button"
            >

                <span class="nav-icon">

                    <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >

                        <path
                            d="M4 18V11M10 18V6M16 18V9M22 18V3"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.8"
                            stroke-linecap="round"
                        />

                    </svg>

                </span>

                <small>
                    Inzichten
                </small>

            </button>



            <button
                class="nav-item ${active === "goals" ? "active" : ""}"
                data-go="goals"
                type="button"
            >

                <span class="nav-icon">

                    <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >

                        <circle
                            cx="12"
                            cy="12"
                            r="8"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.8"
                        />

                        <circle
                            cx="12"
                            cy="12"
                            r="3"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.8"
                        />

                    </svg>

                </span>

                <small>
                    Doelen
                </small>

            </button>



            <button
                class="nav-item ${active === "profile" ? "active" : ""}"
                data-go="profile"
                type="button"
            >

                <span class="nav-icon">

                    <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >

                        <circle
                            cx="12"
                            cy="8"
                            r="3.5"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.8"
                        />

                        <path
                            d="M5 20c.8-4 3.3-6 7-6s6.2 2 7 6"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.8"
                            stroke-linecap="round"
                        />

                    </svg>

                </span>

                <small>
                    Profiel
                </small>

            </button>

        `;

    }


    document
        .querySelectorAll(
            "[data-bottom-nav]"
        )
        .forEach(nav => {

            nav.innerHTML =
                getBottomNav(
                    nav.dataset.bottomNav
                );

        });



    /* =====================================================
       GLOBAL CLICK HANDLER
       ===================================================== */

    document.addEventListener(
        "click",
        event => {


            const navigationButton =
                event.target.closest(
                    "[data-go]"
                );


            if (navigationButton) {

                showScreen(
                    navigationButton.dataset.go
                );

                return;

            }


            const toggle =
                event.target.closest(
                    "[data-toggle]"
                );


            if (toggle) {

                toggle.classList.toggle(
                    "on"
                );


                toggle.setAttribute(
                    "aria-pressed",
                    toggle.classList.contains(
                        "on"
                    )
                );

            }

        }
    );



    /* =====================================================
       CLICKABLE WEEK CARD
       ===================================================== */

    document
        .querySelectorAll(
            ".clickable-week"
        )
        .forEach(card => {


            card.addEventListener(
                "keydown",
                event => {


                    if (
                        event.key === "Enter"
                        ||
                        event.key === " "
                    ) {

                        event.preventDefault();

                        showScreen(
                            "insights"
                        );

                    }

                }
            );

        });



    /* =====================================================
       STUDY TIME
       ===================================================== */

    document
        .querySelectorAll(
            ".day-button"
        )
        .forEach(button => {


            button.addEventListener(
                "click",
                () => {

                    button.classList.toggle(
                        "selected"
                    );

                }
            );

        });



    const saveStudyTimeButton =
        document.getElementById(
            "save-study-time"
        );


    const studyTimeToast =
        document.getElementById(
            "study-time-toast"
        );


    const homeStudyTime =
        document.getElementById(
            "home-study-time"
        );


    if (saveStudyTimeButton) {

        saveStudyTimeButton.addEventListener(
            "click",
            () => {


                const start =
                    document.getElementById(
                        "study-start"
                    ).value;


                const end =
                    document.getElementById(
                        "study-end"
                    ).value;


                studyTimeToast.classList.remove(
                    "show"
                );


                if (!start || !end) {

                    studyTimeToast.textContent =
                        "Vul een start- en eindtijd in.";

                    studyTimeToast.classList.add(
                        "show"
                    );

                    return;

                }


                if (start >= end) {

                    studyTimeToast.textContent =
                        "De eindtijd moet later zijn dan de starttijd.";

                    studyTimeToast.classList.add(
                        "show"
                    );

                    return;

                }


                const selectedDays =
                    [
                        ...document.querySelectorAll(
                            ".day-button.selected"
                        )
                    ];


                if (selectedDays.length === 0) {

                    studyTimeToast.textContent =
                        "Selecteer minimaal één studiedag.";

                    studyTimeToast.classList.add(
                        "show"
                    );

                    return;

                }


                homeStudyTime.textContent =
                    `Vandaag ${start} – ${end}`;


                studyTimeToast.textContent =
                    "Studietijd opgeslagen.";


                studyTimeToast.classList.add(
                    "show"
                );


                setTimeout(
                    () => {

                        showScreen(
                            "home"
                        );

                    },
                    650
                );

            }
        );

    }



    /* =====================================================
       AI FAILURE CORRECTION
       ===================================================== */

    document
        .querySelectorAll(
            "#failure-options .radio-option"
        )
        .forEach(option => {


            option.addEventListener(
                "click",
                () => {


                    selectedCorrection =
                        option.dataset.correction;


                    document
                        .querySelectorAll(
                            "#failure-options .radio-option"
                        )
                        .forEach(button => {

                            button.classList.remove(
                                "selected"
                            );

                        });


                    option.classList.add(
                        "selected"
                    );


                    document
                        .getElementById(
                            "save-correction"
                        )
                        .disabled = false;

                }
            );

        });



    const saveCorrectionButton =
        document.getElementById(
            "save-correction"
        );


    if (saveCorrectionButton) {

        saveCorrectionButton.addEventListener(
            "click",
            () => {


                if (!selectedCorrection) {

                    return;

                }


                showScreen(
                    "corrected"
                );

            }
        );

    }



    /* =====================================================
       AI SUGGESTION
       ===================================================== */

    const suggestionToast =
        document.getElementById(
            "suggestion-toast"
        );


    document
        .querySelectorAll(
            "[data-suggestion]"
        )
        .forEach(button => {


            button.addEventListener(
                "click",
                () => {


                    const value =
                        button.dataset.suggestion;


                    suggestionToast.classList.add(
                        "show"
                    );


                    if (value === "yes") {

                        suggestionToast.textContent =
                            "Focus-reminder ingesteld. Je kunt timing en frequentie later aanpassen.";

                    }


                    if (value === "later") {

                        suggestionToast.textContent =
                            "Geen probleem. MindMirror stelt dit voorlopig niet opnieuw voor.";

                    }


                    if (value === "no") {

                        suggestionToast.textContent =
                            "Voorstel uitgeschakeld. MindMirror blijft alleen inzichten tonen.";

                    }

                }
            );

        });



    /* =====================================================
       SINGLE SELECT GROUPS
       ===================================================== */

    document
        .querySelectorAll(
            ".single-select"
        )
        .forEach(group => {


            group
                .querySelectorAll(
                    ".radio-option"
                )
                .forEach(button => {


                    button.addEventListener(
                        "click",
                        () => {


                            group
                                .querySelectorAll(
                                    ".radio-option"
                                )
                                .forEach(item => {

                                    item.classList.remove(
                                        "selected"
                                    );

                                });


                            button.classList.add(
                                "selected"
                            );

                        }
                    );

                });

        });



    /* =====================================================
       ACCOUNT
       ===================================================== */

    const accountButton =
        document.getElementById(
            "save-account"
        );


    const accountToast =
        document.getElementById(
            "account-toast"
        );


    if (
        accountButton
        &&
        accountToast
    ) {

        accountButton.addEventListener(
            "click",
            () => {

                accountToast.classList.add(
                    "show"
                );

            }
        );

    }



    /* =====================================================
       SHOW / HIDE PASSWORD
       ===================================================== */

    document
        .querySelectorAll(
            "[data-show-password]"
        )
        .forEach(button => {


            button.addEventListener(
                "click",
                () => {


                    const input =
                        document.getElementById(
                            button.dataset.showPassword
                        );


                    if (!input) {

                        return;

                    }


                    const isHidden =
                        input.type === "password";


                    input.type =
                        isHidden
                            ? "text"
                            : "password";


                    button.textContent =
                        isHidden
                            ? "Verberg"
                            : "Toon";

                }
            );

        });



    /* =====================================================
       PASSWORD STRENGTH
       ===================================================== */

    const newPassword =
        document.getElementById(
            "new-password"
        );


    const passwordMeter =
        document.getElementById(
            "password-meter"
        );


    const passwordStrength =
        document.getElementById(
            "password-strength"
        );


    function getPasswordScore(value) {

        let score = 0;


        if (value.length >= 8) {
            score++;
        }


        if (/[A-Z]/.test(value)) {
            score++;
        }


        if (/[a-z]/.test(value)) {
            score++;
        }


        if (/\d/.test(value)) {
            score++;
        }


        if (/[^A-Za-z0-9]/.test(value)) {
            score++;
        }


        return score;

    }


    if (newPassword) {

        newPassword.addEventListener(
            "input",
            () => {


                const score =
                    getPasswordScore(
                        newPassword.value
                    );


                const width =
                    Math.min(
                        100,
                        score * 20
                    );


                passwordMeter.style.width =
                    `${width}%`;


                if (!newPassword.value) {

                    passwordStrength.textContent =
                        "Nog geen wachtwoord ingevoerd.";

                    return;

                }


                if (score <= 2) {

                    passwordStrength.textContent =
                        "Wachtwoord is nog zwak.";

                    return;

                }


                if (score <= 4) {

                    passwordStrength.textContent =
                        "Wachtwoord is redelijk sterk.";

                    return;

                }


                passwordStrength.textContent =
                    "Sterk wachtwoord.";

            }
        );

    }



    /* =====================================================
       PASSWORD FORM
       ===================================================== */

    const passwordForm =
        document.getElementById(
            "password-form"
        );


    if (passwordForm) {

        passwordForm.addEventListener(
            "submit",
            event => {


                event.preventDefault();


                const current =
                    document
                        .getElementById(
                            "current-password"
                        )
                        .value;


                const next =
                    document
                        .getElementById(
                            "new-password"
                        )
                        .value;


                const confirm =
                    document
                        .getElementById(
                            "confirm-password"
                        )
                        .value;


                const error =
                    document.getElementById(
                        "password-error"
                    );


                const success =
                    document.getElementById(
                        "password-success"
                    );


                error.classList.remove(
                    "show"
                );


                success.classList.remove(
                    "show"
                );


                if (!current) {

                    error.textContent =
                        "Vul eerst je huidige wachtwoord in.";

                    error.classList.add(
                        "show"
                    );

                    return;

                }


                if (
                    next.length < 8
                    ||
                    getPasswordScore(next) < 4
                ) {

                    error.textContent =
                        "Kies een sterker wachtwoord met minimaal 8 tekens, een hoofdletter, kleine letter en cijfer.";

                    error.classList.add(
                        "show"
                    );

                    return;

                }


                if (next !== confirm) {

                    error.textContent =
                        "De nieuwe wachtwoorden komen niet overeen.";

                    error.classList.add(
                        "show"
                    );

                    return;

                }


                success.classList.add(
                    "show"
                );


                passwordForm.reset();


                passwordMeter.style.width =
                    "0%";


                passwordStrength.textContent =
                    "Nog geen wachtwoord ingevoerd.";

            }
        );

    }



    /* =====================================================
       VACATION MODE
       ===================================================== */

    const vacationButton =
        document.getElementById(
            "vacation-mode"
        );


    const vacationToast =
        document.getElementById(
            "vacation-toast"
        );


    if (
        vacationButton
        &&
        vacationToast
    ) {

        vacationButton.addEventListener(
            "click",
            () => {

                vacationToast.classList.add(
                    "show"
                );

            }
        );

    }



    /* =====================================================
       PAUSE AI
       ===================================================== */

    document
        .querySelectorAll(
            "#pause-options .radio-option"
        )
        .forEach(option => {


            option.addEventListener(
                "click",
                () => {


                    pauseChoice =
                        option.dataset.pause;


                    document
                        .querySelectorAll(
                            "#pause-options .radio-option"
                        )
                        .forEach(item => {

                            item.classList.remove(
                                "selected"
                            );

                        });


                    option.classList.add(
                        "selected"
                    );


                    document
                        .getElementById(
                            "confirm-pause"
                        )
                        .disabled = false;

                }
            );

        });



    const confirmPause =
        document.getElementById(
            "confirm-pause"
        );


    if (confirmPause) {

        confirmPause.addEventListener(
            "click",
            () => {


                if (!pauseChoice) {

                    return;

                }


                const toast =
                    document.getElementById(
                        "pause-toast"
                    );


                toast.textContent =
                    `AI-analyse gepauzeerd: ${pauseChoice}.`;


                toast.classList.add(
                    "show"
                );

            }
        );

    }



    /* =====================================================
       EXPORT DATA
       ===================================================== */

    const exportButton =
        document.getElementById(
            "export-data"
        );


    if (exportButton) {

        exportButton.addEventListener(
            "click",
            () => {


                document
                    .getElementById(
                        "export-toast"
                    )
                    .classList.add(
                        "show"
                    );

            }
        );

    }



    /* =====================================================
       DELETE DATA
       ===================================================== */

    document
        .querySelectorAll(
            "#delete-options .radio-option"
        )
        .forEach(option => {


            option.addEventListener(
                "click",
                () => {


                    deleteChoice =
                        option.dataset.delete;


                    document
                        .querySelectorAll(
                            "#delete-options .radio-option"
                        )
                        .forEach(item => {

                            item.classList.remove(
                                "selected"
                            );

                        });


                    option.classList.add(
                        "selected"
                    );


                    document
                        .getElementById(
                            "confirm-delete"
                        )
                        .disabled = false;

                }
            );

        });



    const confirmDelete =
        document.getElementById(
            "confirm-delete"
        );


    if (confirmDelete) {

        confirmDelete.addEventListener(
            "click",
            () => {


                if (!deleteChoice) {

                    return;

                }


                const toast =
                    document.getElementById(
                        "delete-toast"
                    );


                toast.textContent =
                    `${deleteChoice} zijn verwijderd in deze prototype-demo.`;


                toast.classList.add(
                    "show"
                );

            }
        );

    }



    /* =====================================================
       INSIGHTS FILTER
       ===================================================== */

    document
        .querySelectorAll(
            ".filter-tabs button"
        )
        .forEach(button => {


            button.addEventListener(
                "click",
                () => {


                    const parent =
                        button.parentElement;


                    parent
                        .querySelectorAll(
                            "button"
                        )
                        .forEach(item => {

                            item.classList.remove(
                                "selected"
                            );

                        });


                    button.classList.add(
                        "selected"
                    );

                }
            );

        });


})();