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

function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    if (username == "username" && password == "password") {
        return true;
    } 
    else {
        alert("Incorrect credentials");
        return false;
    }
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
    document.getElementById("buttonWrapExitDeleteItemMode").hidden = true;

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
    //Remove current displayed data
    for (var j = 0; j < oldContents.length; j+1) {
        listContentsDestination.removeChild(oldContents[j]);
    }

    //Sort list by position
    var listContents = list.getElementsByTagName("li");
    var x = Array.from(listContents);
    let sorted = x.sort(sorter);

    function sorter(a,b) {
        if(a.getElementsByTagName("p1")[0].textContent < b.getElementsByTagName("p1")[0].textContent) return -1;
        if(a.getElementsByTagName("p1")[0].textContent > b.getElementsByTagName("p1")[0].textContent) return 1;
        return 0;
}
    listContents = sorted;

    //Load each item of the list
    for (var i = 0; i < listContents.length; i++) {
        var text = listContents[i].getElementsByTagName("p")[0].textContent;
        var p = document.createElement("p");
        p.textContent = text;
        var div = document.createElement("div");
        div.className = "listContentsContainer"
        div.appendChild(p);

        var deleteButton = document.createElement("div");
        deleteButton.className = "buttonWrapDeleteItem";
        deleteButton.hidden = true;

        var svg = document.createElement("svg");
        deleteButton.appendChild(svg);
        svg.outerHTML = '<svg class="svgSizingChanges2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/></svg>';

        var itemIdentifier = document.createElement("h1");
        itemIdentifier.textContent = listContents[i].getElementsByTagName("h1")[0].textContent;
        itemIdentifier.hidden = true;

        var listIdentifier = document.createElement("h6");
        listIdentifier.textContent = document.getElementById("listHeading").getElementsByTagName("p")[0].innerHTML;
        listIdentifier.hidden = true;

        var li = document.createElement("li");
        li.className = "contentsItem";
        
        li.appendChild(div);
        li.appendChild(deleteButton);
        li.appendChild(itemIdentifier);
        li.appendChild(listIdentifier);
        li.onclick = function() {
            clickedItem(this);
        }
        listContentsDestination.appendChild(li);
    }
    //Hide buttons
    document.getElementById("buttonWrapExitDeleteItemMode").hidden = true;
}

//Clicked item
function clickedItem(item) {
    var pane = document.getElementById("sidenavRight");
    pane.scrollTop = 0;

    //Get item name
    var name = item.getElementsByClassName("listContentsContainer")[0].getElementsByTagName("p")[0].textContent;

    //Get list data
    var description;
    var deadlineDate;
    var deadlineTime;
    var reminderDate;
    var reminderTime;

    var lists = document.getElementsByClassName("list");
    for (var i = 0; i < lists.length; i++) {
        if (lists[i].getElementsByClassName("identifier")[0].textContent == item.getElementsByTagName("h6")[0].textContent) {
            var items = lists[i].getElementsByTagName("ul")[0].getElementsByTagName("li");
            for (var j = 0; j < items.length; j++) {
                if (items[j].getElementsByTagName("h1")[0].textContent == item.getElementsByTagName("h1")[0].textContent) {
                    description = items[j].getElementsByTagName("h2")[0].textContent;
                    deadlineDate = items[j].getElementsByTagName("h3")[0].textContent;
                    deadlineTime = items[j].getElementsByTagName("h4")[0].textContent;
                    reminderDate = items[j].getElementsByTagName("h5")[0].textContent;
                    reminderTime = items[j].getElementsByTagName("h6")[0].textContent;
                    break;
                }
            }
        break;
        }
    }

    //Load data into item viewer
    document.getElementById("viewerListIdentifier").textContent = item.getElementsByTagName("h6")[0].textContent;
    document.getElementById("viewerItemIdentifier").textContent = item.getElementsByTagName("h1")[0].textContent;
    document.getElementById("name").value = name;
    document.getElementById("taskDescription").value = description;
    document.getElementById("deadlineDate").value = deadlineDate;
    document.getElementById("deadlineTime").value = deadlineTime;
    document.getElementById("reminderDate").value = reminderDate;
    document.getElementById("reminderTime").value = reminderTime;

    
    //Hide overlapping menus
    document.getElementById("notificationsMenu").hidden = true;
    document.getElementById("settingsMenu").hidden = true;

}

//Add Item to List
function addItem() {
    //Add to lists data
    var listIndexDestination = document.getElementById("listHeading").getElementsByTagName("p")[0];
    var lists = document.getElementsByClassName("list");
    var h1_2 = document.createElement("h1");
    h1_2.hidden = true;
    for (var i = 0; i < lists.length; i++){
        var x = listIndexDestination.textContent;
        var y = lists[i].getElementsByClassName("identifier")[0].textContent
        if (x==y){
            var p2 = document.createElement("p");
            p2.textContent = "Untitled";

            

            //Generate unique identifier code
            var validIdentifier = false;
            var identifier = "";
            while (validIdentifier == false){
                validIdentifier = true;
                identifier = "";
                for (var j = 0; j < 15; j++) {
                    identifier += Math.floor(Math.random() * 10).toString();
                }
                
                //Check if code is unique, if not, generate a new one
                var currentIdentifiers = [];
                var items = lists[i].getElementsByTagName("ul")[0].children;
                
                for (var j = 0; j < items.length; j++) {
                    var identifierToCheck = items[j].getElementsByTagName("h1")[0].textContent;
                    if (identifierToCheck == identifier) {
                        validIdentifier = false;
                    }
                }
            }
            var position = document.createElement("p1");
            position.textContent = lists.length;
            var h1 = document.createElement("h1");
            h1.hidden = true; 
            h1.innerHTML = identifier;
            h1_2.textContent = identifier;
            var h2 = document.createElement("h2");
            h2.hidden = true;
            var h3 = document.createElement("h3");
            h3.hidden = true;
            var h4 = document.createElement("h4");
            h4.hidden = true;
            var h5 = document.createElement("h5");
            h5.hidden = true;
            var h6 = document.createElement("h6");
            h6.hidden = true;

            var li2 = document.createElement("li");
            li2.appendChild(p2);
            li2.appendChild(position);
            li2.appendChild(h1);
            li2.appendChild(h2);
            li2.appendChild(h3);
            li2.appendChild(h4);
            li2.appendChild(h5);
            li2.appendChild(h6);

            lists[i].getElementsByTagName("ul")[0].appendChild(li2);
        }
    }

    //Add to main
    var p = document.createElement("p");
    p.textContent = "Untitled";
    var div = document.createElement("div");
    div.className = "listContentsContainer";
    div.appendChild(p);
    var deleteButton = document.createElement("div");
    deleteButton.className = "buttonWrapDeleteItem";
    deleteButton.hidden = true;
    var svg = document.createElement("svg");
    deleteButton.appendChild(svg);
    svg.outerHTML = '<svg class="svgSizingChanges2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/></svg>';
    var li = document.createElement("li");
    var h6 = document.createElement("h6");
    h6.textContent = listIndexDestination.textContent;
    h6.hidden = true;
    li.appendChild(div);
    li.appendChild(deleteButton);
    li.className = "contentsItem";
    li.appendChild(h1_2);
    li.appendChild(h6);
    
    li.onclick = function() {
        clickedItem(this);
    }

    var ul = document.getElementById("listContents");
    ul.appendChild(li);
}

function enterRemoveItemMode() {
    //Reveal delete buttons
    var listContents = document.getElementById("listContents");
    var items = listContents.getElementsByClassName("contentsItem");
    for (var i = 0; i < items.length; i++) {
        var deleteButton = items[i].getElementsByClassName("buttonWrapDeleteItem")[0];
        deleteButton.hidden = false;
        //On-click functionality for each delete button
        deleteButton.onclick = function() {
            removeItem(this.parentElement);
        }
    }

    //override on-click for items to remove functionality
    items = document.getElementsByClassName("contentsItem")
    for (var i = 0; i < items.length; i++ ){
        items[i].onclick = function() {};
    }
    
    //Reset item view to default values
    document.getElementById("viewerListIdentifier").textContent = "";
    document.getElementById("viewerItemIdentifier").textContent = "";
    document.getElementById("name").value = "";
    document.getElementById("taskDescription").value = "";
    document.getElementById("deadlineDate").value = "";
    document.getElementById("deadlineTime").value = "";
    document.getElementById("reminderDate").value = "";
    document.getElementById("reminderTime").value = "";

    //Reveal exit-item-delete-mode button
    document.getElementById("buttonWrapExitDeleteItemMode").hidden = false;

    //Hide other buttons
    document.getElementById("mainButtonPlus").hidden = true;
    document.getElementById("mainButtonMinus").hidden = true;
}

function exitRemoveItemMode() {
    //Reveal delete buttons
    var listContents = document.getElementById("listContents");
    var items = listContents.getElementsByClassName("contentsItem");
    for (var i = 0; i < items.length; i++) {
        var deleteButton = items[i].getElementsByClassName("buttonWrapDeleteItem")[0];
        deleteButton.hidden = true;
    }

    //override on-click for items to restore functionality
    items = document.getElementsByClassName("contentsItem")
    for (var i = 0; i < items.length; i++ ){
        items[i].onclick = function() {
            clickedItem(this);
        };
    }

    //Reveal exit-item-delete-mode button
    document.getElementById("buttonWrapExitDeleteItemMode").hidden = true;

    //Hide other buttons
    document.getElementById("mainButtonPlus").hidden = false;
    document.getElementById("mainButtonMinus").hidden = false;
}

function removeItem(x) {
    //Remove from list data
    var listIdentifier = document.getElementById("listHeading").getElementsByTagName("p")[0].textContent;
    var lists = document.getElementsByClassName("list");
    for (var i = 0; i < lists.length; i++) {
        if (lists[i].getElementsByClassName("identifier")[0].textContent == listIdentifier) {
            var items = lists[i].getElementsByTagName("ul")[0];
            var itemsContents = lists[i].getElementsByTagName("ul")[0].getElementsByTagName("li");
            for (var j = 0; j < itemsContents.length; j++) {
                if (itemsContents[j].getElementsByTagName("h1")[0].textContent == x.getElementsByTagName("h1")[0].textContent) {
                    items.removeChild(itemsContents[j]);
                }
            }
            lists[i].getElementsByTagName("ul")[0].getElementsByTagName("h1").textContent;
        }
    }
    //Remove from main window
    var listContents = document.getElementById("listContents");
    listContents.removeChild(x);
}

function updateItem() {
    //Find item data location
    var listToUpdate = null;
    var lists = document.getElementsByClassName("list");
    for (var i = 0; i < lists.length; i++){
        if (lists[i].getElementsByClassName("identifier")[0].textContent == document.getElementById("viewerListIdentifier").textContent) {
            var items = lists[i].getElementsByTagName("ul")[0].children;
            for (var j = 0; j < items.length; j++) {
                if (items[j].getElementsByTagName("h1")[0].textContent == document.getElementById("viewerItemIdentifier").textContent) {
                    listToUpdate = items[j];
                }
            }
        }
    }

    if (listToUpdate != null) {
        listToUpdate.getElementsByTagName("p")[0].textContent = document.getElementById("name").value;
        listToUpdate.getElementsByTagName("h2")[0].textContent = document.getElementById("taskDescription").value;
        listToUpdate.getElementsByTagName("h3")[0].textContent = document.getElementById("deadlineDate").value;
        listToUpdate.getElementsByTagName("h4")[0].textContent = document.getElementById("deadlineTime").value;
        listToUpdate.getElementsByTagName("h5")[0].textContent = document.getElementById("reminderDate").value;
        listToUpdate.getElementsByTagName("h6")[0].textContent = document.getElementById("reminderTime").value;
        l = listToUpdate.parentElement.parentElement;
        clickedList(l.getElementsByTagName("a")[0].textContent, l.getElementsByTagName("ul")[0], l.getElementsByClassName("identifier")[0].textContent);
    }
}

function itemReorder() {
    var listIdentifier = document.getElementById("listHeading").getElementsByTagName("p")[0].textContent;
    var listToUpdate = null;
    var lists = document.getElementsByClassName("list");

    for (var i = 0; i < lists.length; i++) {
        if (lists[i].getElementsByClassName("identifier")[0].textContent == listIdentifier) {
            itemsFromData = lists[i].getElementsByTagName("ul")[0].getElementsByTagName("li");
            itemsFromMain = document.getElementsByClassName("contentsItem");
            for (var j = 0; j < itemsFromMain.length; j++) {
                var itemIdentifier = itemsFromMain[j].getElementsByTagName("h1")[0].textContent;
                for (var k = 0; k < itemsFromData.length; k++) {
                    if (itemsFromData[k].getElementsByTagName("h1")[0].textContent == itemIdentifier) {
                        itemsFromData[k].getElementsByTagName("p1")[0].textContent = j;
                    }
                }
            }
            break;
        }
    }  

    itemsData = listToUpdate;

    itemsMain = document.getElementById("listContents").children;
}

function viewNotificationsMenu() {
    document.getElementById("notificationsMenu").hidden = false;
    document.getElementById("settingsMenu").hidden = true;
}

function viewSettingsMenu() {
    document.getElementById("settingsMenu").hidden = false;
    document.getElementById("notificationsMenu").hidden = true;
}

function clickedToday() {
    var listContentsDestination = document.getElementById("listContents");
    document.getElementById("listHeading").getElementsByTagName("u")[0].textContent = "Today"
    var listIndexDestination = document.getElementById("listHeading").getElementsByTagName("p")[0].innerHTML = -1;

    //Prepare to load list contents
    var listContentsDestination = document.getElementById("listContents");
    var oldContents = listContentsDestination.getElementsByTagName("li");
    //Remove current displayed data
    for (var j = 0; j < oldContents.length; j+1) {
        listContentsDestination.removeChild(oldContents[j]);
    }
    
    //Get todays date
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    if (dd<10) {dd='0'+dd;} 
    if (mm<10) {mm='0'+mm;} 
    var todaysDate = yyyy+"-"+mm+"-"+dd;

    //Get all lists where deadline date is today
    var lists = document.getElementsByClassName("list");
    var items = [];
    for (var i = 0; i < lists.length; i++) {
        var listsItems = lists[i].getElementsByTagName("ul")[0].getElementsByTagName("li");
        for (var j = 0; j < listsItems.length; j++) {
            if (listsItems[j].getElementsByTagName("h3")[0].textContent == todaysDate) {
                var text = listsItems[j].getElementsByTagName("p")[0].textContent;
                var p = document.createElement("p");
                p.textContent = text;
                var div = document.createElement("div");
                div.className = "listContentsContainer"
                div.appendChild(p);

                var deleteButton = document.createElement("div");
                deleteButton.className = "buttonWrapDeleteItem";
                deleteButton.hidden = true;

                var svg = document.createElement("svg");
                deleteButton.appendChild(svg);
                svg.outerHTML = '<svg class="svgSizingChanges2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/></svg>';

                var itemIdentifier = document.createElement("h1");
                itemIdentifier.textContent = listsItems[j].getElementsByTagName("h1")[0].textContent;
                itemIdentifier.hidden = true;

                var listIdentifier = document.createElement("h6");
                listIdentifier.textContent = document.getElementById("listHeading").getElementsByTagName("p")[0].innerHTML;
                listIdentifier.hidden = true;

                var li = document.createElement("li");
                li.className = "contentsItem";
                
                li.appendChild(div);
                li.appendChild(itemIdentifier);
                li.appendChild(listIdentifier);

                var x = lists[i].getElementsByClassName("identifier")[0].textContent;
                
                
                li.onclick = todayItemClicked.bind(this, [x, lists]);
                listContentsDestination.appendChild(li);
            }

        }
    }

    //Hide add and remove items buttons
    document.getElementById("mainButtonPlus").hidden = true;
    document.getElementById("mainButtonMinus").hidden = true;

}

function todayItemClicked(args) {
    for (var k = 0; k < args[1].length; k++) {
        if (args[1][k].getElementsByClassName("identifier")[0].textContent == args[0]) {
            args[1][k].click();
            break;
        }
    }
}

function deleteNotification(x) {
    x.parentElement.removeChild(x);
}

function openHelp() {
    lists = document.getElementById("lists");
    window.localStorage.setItem("listsInnerHTML", lists.innerHTML);
    window.location.href='help.html'
}

function logout() {
    window.location.href='index.html'
    window.localStorage.removeItem("listsInnerHTML");
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
            if (button != null) {
                button.onclick = function() {
                    var list = this.parentElement;
                    removeList(list);
                }
            }
        }

        //On-click functionality for today list
        document.getElementsByClassName("today")[0].onclick = function() {
            clickedToday();
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

        //Items Drag and Drop
        $( function() {
            $( "#listContents" ).sortable({
                axis: 'y',
                update: function( ) {
                    itemReorder();
                }
            });
            $( "#listContents" ).disableSelection();
        });

        //Enter remove-item-mode button
        var enterRemoveItemModeButton = document.getElementById("mainButtonMinus");
        enterRemoveItemModeButton.onclick = function() {
            enterRemoveItemMode();
        }

        //Exit remove-item-mode button
        document.getElementById("buttonWrapExitDeleteItemMode").onclick = function() {
            exitRemoveItemMode();
        }
}

//When leaving the page, save lists
window.onbeforeunload = function(event)
    {
        window.localStorage.setItem("listsInnerHTML", document.getElementById("lists").innerHTML);
    };

//On load
window.onload = function() { 
    try {
        //When page is first loaded, hide buttons in the main window, and buttons only available in certain modes
        if (document.getElementById("listHeading").textContent == "") {
            document.getElementById("mainButtonPlus").hidden = true;
            document.getElementById("mainButtonMinus").hidden = true;
            document.getElementById("buttonWrapExitDeleteMode").hidden = true;
            document.getElementById("buttonWrapExitDeleteItemMode").hidden = true;
            var deleteListButtons = document.getElementsByClassName("buttonWrapDeleteList");
            for (var i = 0; i < deleteListButtons.length; i++) {
                deleteListButtons[i].hidden = true;
            }
        }
        //Load lists from local storage
        if (window.localStorage.getItem("listsInnerHTML") != null) {
            console.log("storage found");
            document.getElementById("lists").innerHTML = window.localStorage.getItem("listsInnerHTML");
        }
        //Event handler   
        EventHandler();
    }
    catch{};
}