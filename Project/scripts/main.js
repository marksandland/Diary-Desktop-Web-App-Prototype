function passwordReset() {

    var x = document.getElementById("email"); 

    if (x.value.length < 1) {
        alert("Invalid email address");
        return false;
    }
    else {
        alert("Password reset request sent to " + x.value);
        return true;
    }
}

function createAccount() {


    alert("Account created!")
    return true;
}