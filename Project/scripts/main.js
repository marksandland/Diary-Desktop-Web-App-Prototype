//Password Reset
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

//Create Account
function createAccount() {
    alert("Account created!")
    return true;
}

//Add List
function addList() {
    //Create a list
    var ul = document.getElementById("lists");
    var li = document.createElement("li");
    li.className = "list"
    var a = document.createElement("a");

    //Set list name as untitled
    a.appendChild(document.createTextNode("Untitled"));
    li.appendChild(a);

    //Add the delete button and hide it
    var button = document.createElement("div");
    button.className="buttonWrapDeleteList";
    button.hidden = true;
    var svg = document.createElement("svg");
    button.appendChild(svg);
    svg.outerHTML = '<svg class="svgSizingChanges2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/></svg>';
    
    //Add functionality for the delete button
    button.onclick = function() {
        var list = this.parentElement;
        removeList(list);
    }
    

    li.appendChild(button);
    
    //Create hidden list to store items
    var ulHidden = document.createElement("ul");
    ulHidden.hidden = true;

    //Generate unique identifier code
    var validIdentifier = false;
    var identifier = "";
    while (validIdentifier == false){
        
        validIdentifier = true;
        identifier = "";
        for (var i = 0; i < 15; i++) {
            identifier += Math.floor(Math.random() * 10).toString();
        }
        
        //Check if code is unique, if not, generate a new one
        var currentIdentifiers = [];
        var lists = ul.getElementsByClassName("list");
        
        for (var i = 0; i < lists.length; i++) {
            var identifierToCheck = lists[i].getElementsByClassName("identifier")[0].textContent;
            if (identifierToCheck == identifier) {
                validIdentifier = false;
            }
        }
    }
    
    //Set identifier code
    var p = document.createElement("p");
    p.className="identifier";
    p.hidden = true;
    p.textContent = identifier;

    //Finish creating list
    li.appendChild(ulHidden);
    li.appendChild(p);
    ul.appendChild(li);

    //On-click functionality for this list,
    li.onclick = function() {
        clickedList(this.getElementsByTagName("a")[0].textContent, this.getElementsByTagName("ul")[0], this.getElementsByClassName("identifier")[0].textContent);
        document.getElementById("mainButtonPlus").hidden = false;
        document.getElementById("mainButtonMinus").hidden = false; 
    };
}

//Remove List
function enterRemoveListMode() {
    //Hide add and remove list buttons
    var plusButton = document.getElementById("listsButtonPlus");
    var minusButton = document.getElementById("listsButtonMinus");
    plusButton.hidden = true;
    minusButton.hidden = true;

    //Reveal delete list buttons and exit-delete-mode button
    var deleteListButtons = document.getElementsByClassName("buttonWrapDeleteList");
    for (var i = 0; i < deleteListButtons.length; i++) {
        deleteListButtons[i].hidden = false;
    }
    document.getElementById("buttonWrapExitDeleteMode").hidden = false;

    //Empty the main window
    var heading = document.getElementById("listHeading");
    heading.getElementsByTagName("u")[0].textContent="";
    heading.getElementsByTagName("p")[0].textContent="";
    var contents = document.getElementById("listContents");
    contents.textContent = "";

    //Hide buttons in the main window
    var mainPlusButton = document.getElementById("mainButtonPlus");
    var mainMinusButton = document.getElementById("mainButtonMinus");
    mainPlusButton.hidden = true;
    mainMinusButton.hidden = true;

    //override on-click for lists to remove functionality
    var lists = document.getElementsByClassName("list");
        for (var i = 0; i < lists.length; i++ ){
            lists[i].onclick = function() {};
        }
}

function exitRemoveListMode() {
    //Reveal add and remove list buttons
    var plusButton = document.getElementById("listsButtonPlus");
    var minusButton = document.getElementById("listsButtonMinus");
    plusButton.hidden = false;
    minusButton.hidden = false;

    //Hide delete list buttons and exit-delete-mode button
    var deleteListButtons = document.getElementsByClassName("buttonWrapDeleteList");
    for (var i = 0; i < deleteListButtons.length; i++) {
        deleteListButtons[i].hidden = true;
    }
    document.getElementById("buttonWrapExitDeleteMode").hidden = true;

    //override on-click for lists to restore functionality
    var lists = document.getElementsByClassName("list");
    for (var i = 0; i < lists.length; i++ ){
        lists[i].onclick = function() {
            clickedList(this.getElementsByTagName("a")[0].textContent, this.getElementsByTagName("ul")[0], this.getElementsByClassName("identifier")[0].textContent);
            document.getElementById("mainButtonPlus").hidden = false;
            document.getElementById("mainButtonMinus").hidden = false;
        };
    }
}

function removeList(list) {
    var lists = document.getElementById("lists");
    lists.removeChild(list);
}

//Clicked List
function clickedList(listName, list, index) {
    //Load list name
    var listHeading = document.getElementById("listHeading").getElementsByTagName("u")[0];
    listHeading.textContent = listName;

    //Assign index identifier to the heading
    var listIndexDestination = document.getElementById("listHeading").getElementsByTagName("p")[0];
    listIndexDestination.innerHTML = index;

    //Prepare to load list contents
    var listContentsDestination = document.getElementById("listContents");
    var oldContents = listContentsDestination.getElementsByTagName("li");
    //remove current displayed data
    for (var j = 0; j < oldContents.length; j+1) {
        listContentsDestination.removeChild(oldContents[j]);
    }

    //load each item of the list
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

//Add Item to List
function addItem() {
    //Add to main
    var p = document.createElement("p");
    p.textContent = "Untitled";
    var li = document.createElement("li");
    li.appendChild(p);

    var ul = document.getElementById("listContents");
    ul.appendChild(li);

    //Add to lists data
    var listIndexDestination = document.getElementById("listHeading").getElementsByTagName("p")[0];
    var lists = document.getElementsByClassName("list");
    for (var i = 0; i < lists.length; i++){

        var x = listIndexDestination.textContent;
        var y = lists[i].getElementsByClassName("identifier")[0].textContent
        if (x==y){
            var p2 = document.createElement("p");
            p2.textContent = "Untitled";
            var li2 = document.createElement("li");
            li2.appendChild(p2);
            lists[i].getElementsByTagName("ul")[0].appendChild(li2);
        }
    }
}

//Event Handler
function EventHandler() {
    //Button Click Event Handler
        //Add List Button
        var a = document.getElementById("listsButtonPlus");
        a.onclick = function() {addList()};

        //Remove List Button
        var b = document.getElementById("listsButtonMinus");
        b.onclick = function() {enterRemoveListMode()};

        //Add list button
        var a = document.getElementById("mainButtonPlus");
        a.onclick = function() {addItem()};

        //On-click functionality for lists
        var lists = document.getElementsByClassName("list");
        for (var i = 0; i < lists.length; i++ ){
            lists[i].onclick = function() {
                clickedList(this.getElementsByTagName("a")[0].textContent, this.getElementsByTagName("ul")[0], this.getElementsByClassName("identifier")[0].textContent);  
                document.getElementById("mainButtonPlus").hidden = false;
                document.getElementById("mainButtonMinus").hidden = false;
            };

            //On-click functionality for each lists delete button
            var button = lists[i].getElementsByClassName("buttonWrapDeleteList")[0];
            button.onclick = function() {
                var list = this.parentElement;
                removeList(list);
            }
        }

        //On-click functionality for button to exit delete-list mode
        document.getElementById("buttonWrapExitDeleteMode").onclick = function() {
            exitRemoveListMode();
        }

        //Renaming lists
        var heading = document.getElementById("listHeading");
        heading.getElementsByTagName("u")[0].addEventListener("input", function() {
                var lists = document.getElementsByClassName("list");
                for (var i = 0; i < lists.length; i++){
                    var x = heading.getElementsByTagName("p")[0].textContent;
                    var y = lists[i].getElementsByClassName("identifier")[0].textContent;
                    if (x==y){
                        if (heading.getElementsByTagName("u")[0].textContent.length < 1) {
                            lists[i].getElementsByTagName("a")[0].textContent = "Untitled";
                        }
                        else {
                            lists[i].getElementsByTagName("a")[0].textContent = heading.getElementsByTagName("u")[0].textContent;
                        }
                    }
                }
        }, false);

        //Lists Drag and Drop
        $( function() {
            $( "#lists" ).sortable({
                axis: 'y'
            });
            $( "#lists" ).disableSelection();
        } );
}

//On load
window.onload = function() { 
    //When page is first loaded, hide buttons in the main window, and buttons only available in certain modes
    if (document.getElementById("listHeading").textContent == "") {
        document.getElementById("mainButtonPlus").hidden = true;
        document.getElementById("mainButtonMinus").hidden = true;
        document.getElementById("buttonWrapExitDeleteMode").hidden = true;
        var deleteListButtons = document.getElementsByClassName("buttonWrapDeleteList");
        for (var i = 0; i < deleteListButtons.length; i++) {
            deleteListButtons[i].hidden = true;
        }
    }   
    EventHandler();
}