window.onload = function() {
    //Load Language
    if (window.localStorage.getItem("language") != null) {
        switch (window.localStorage.getItem("language")) {
            case "English":
                document.getElementById("backButton").getElementsByTagName("p")[0].textContent = "Back";
                document.getElementById("helpHeading").textContent = "Help";
                break;
            case "French":
                document.getElementById("backButton").getElementsByTagName("p")[0].textContent = "Retourner";
                document.getElementById("helpHeading").textContent = "Assistance";
                break;
            case "Italian":
                document.getElementById("backButton").getElementsByTagName("p")[0].textContent = "Indietro";
                document.getElementById("helpHeading").textContent = "Assistenza";
                break;
            case "Spanish":
                document.getElementById("backButton").getElementsByTagName("p")[0].textContent = "Regresa";
                document.getElementById("helpHeading").textContent = "Asistencia";
                break;
        }
    }
    //Load Colours
    if (window.localStorage.getItem("colours0") != null) {
        document.body.style.background = window.localStorage.getItem("colours0");
    }
    if (window.localStorage.getItem("colours2") != null) {
        document.getElementById("backButton").style.background = window.localStorage.getItem("colours2");
    }
    if (window.localStorage.getItem("colours3") != null) {
        document.getElementById("backButton").style.color = window.localStorage.getItem("colours3");
        document.getElementById("helpHeading").style.color = window.localStorage.getItem("colours3");
        document.getElementById("FAQContainer").getElementsByTagName("h2")[0].style.color = window.localStorage.getItem("colours3");
        document.getElementById("backButton").style.borderColor = window.localStorage.getItem("colours3");
    }
}