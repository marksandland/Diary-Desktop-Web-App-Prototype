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

function addList() {
    var ul = document.getElementById("lists");
    var li = document.createElement("li");
    var a = document.createElement("a");
    a.href="#";

    a.appendChild(document.createTextNode("Untitled"))
    li.appendChild(a);
    ul.appendChild(li);
}

function removeList() {
    alert("enter removeListMode"); 
}

window.onload = function() { 
    //Button Click Event Handler
        //Add List Button
        var a = document.getElementById("buttonPlus");
        a.onclick = function() {addList()};

        //Remove List Button
        var b = document.getElementById("buttonMinus");
        b.onclick = function() {removeList()};


        
}

        

