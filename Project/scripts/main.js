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
    li.className = "list"
    var a = document.createElement("a");

    a.appendChild(document.createTextNode("Untitled"));
    li.appendChild(a);
    

    
    var ulHidden = document.createElement("ul");
    ulHidden.hidden = true;

    var p = document.createElement("p");
    p.hidden = true;
    p.textContent = ul.children.length;

    li.appendChild(ulHidden);
    li.appendChild(p);
    ul.appendChild(li);
    li.onclick = function() {
        clickedList(li.getElementsByTagName("a")[0].textContent, li.getElementsByTagName("ul")[0], li.getElementsByTagName("p")[0].textContent);  
    };


    

}

function removeList() {
    alert("enter removeListMode"); 
}

function clickedList(listName, list, index) {
    var listHeading = document.getElementById("listHeading").getElementsByTagName("u")[0];
    listHeading.textContent = listName;

    var listIndexDestination = document.getElementById("listHeading").getElementsByTagName("p")[0];
    listIndexDestination.innerHTML = index;

    var listContentsDestination = document.getElementById("listContents");
    var oldContents = listContentsDestination.getElementsByTagName("li");
    for (var j = 0; j < oldContents.length; j++) {
        listContentsDestination.removeChild(oldContents[j]);
    }

    var listContents = list.getElementsByTagName("li");
    for (var i = 0; i < listContents.length; i++) {
        var text = listContents[i].getElementsByTagName("p")[0].textContent;
        var p = document.createElement("p");
        p.textContent = text;
        var li = document.createElement("li");
        
        li.appendChild(p);
        listContentsDestination.appendChild(li);
    }
}

function EventHandler() {
    //Button Click Event Handler
        //Add List Button
        var a = document.getElementById("listsButtonPlus");
        a.onclick = function() {addList()};

        //Remove List Button
        var b = document.getElementById("listsButtonMinus");
        b.onclick = function() {removeList()};

        var lists = document.getElementsByClassName("list");

        for (var i = 0; i < lists.length; i++ ){
            lists[i].onclick = function() {
                clickedList(this.getElementsByTagName("a")[0].textContent, this.getElementsByTagName("ul")[0], this.getElementsByTagName("p")[0].textContent);  
                document.getElementById("mainButtonPlus").hidden = false;
                document.getElementById("mainButtonMinus").hidden = false;
            };
        }
        var heading = document.getElementById("listHeading");
        heading.getElementsByTagName("u")[0].addEventListener("input", function() {
            
                var lists = document.getElementsByClassName("list");
                for (var i = 0; i < lists.length; i++){

                    var x = heading.getElementsByTagName("p")[0].textContent;
                    var y = lists[i].getElementsByTagName("p")[0].textContent
                    console.log(x,y);
                    if (x==y){
                        console.log("test");
                        if (heading.getElementsByTagName("u")[0].textContent.length < 1) {
                            lists[i].getElementsByTagName("a")[0].textContent = "Untitled";
                        }
                        else {
                            lists[i].getElementsByTagName("a")[0].textContent = heading.getElementsByTagName("u")[0].textContent;
                        }
                    }
                }
        }, false);
}

window.onload = function() { 

    console.log("testing");
        if (document.getElementById("listHeading").textContent == "") {
        document.getElementById("mainButtonPlus").hidden = true;
        document.getElementById("mainButtonMinus").hidden = true;
    }

    EventHandler();
}