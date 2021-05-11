//Password Reset
function passwordReset() {

    var x = document.getElementById("email"); 

    if (x.value.length < 1) {
        document.getElementById("loginForm").getElementsByTagName("p")[0].hidden = false;
        return false;
    }
    else {
        alert("Password reset request sent to " + x.value);
        return true;
    }
}

//Create Account
function createAccount() {
    var returnValue = true;
    //Email Field
    if (document.getElementById("email").value == "") {
        document.getElementById("emailError").style.visibility = "visible";
        returnValue = false;
    }
    else {
        document.getElementById("emailError").style.visibility = "hidden";
    }
    //Username Field
    if (document.getElementById("username").value.length < 3 || document.getElementById("username").value.length > 20) {
        document.getElementById("usernameError").style.visibility = "visible";
        returnValue = false;
    }
    else {
        document.getElementById("usernameError").style.visibility = "hidden";
    }
    //Password Field
    if (document.getElementById("password").value.length < 8 || document.getElementById("password").value.length > 20) {
        document.getElementById("passwordError").style.visibility = "visible";
        returnValue = false;
    }
    else {  
        document.getElementById("passwordError").style.visibility = "hidden";
    }
    //Password Confirmation Field
    if (document.getElementById("passwordConfirm").value != document.getElementById("password").value) {
        document.getElementById("passwordConfirmError").style.visibility = "visible";
        returnValue = false;
    }
    else {  
        document.getElementById("passwordConfirmError").style.visibility = "hidden";
    }
    if (returnValue == true) {
        document.getElementById("emailError").style.visibility = "hidden";
        document.getElementById("usernameError").style.visibility = "hidden";
        document.getElementById("passwordError").style.visibility = "hidden";
        document.getElementById("passwordConfirmError").style.visibility = "hidden";
        setTimeout(function () { alert("Account created!"); }, 1);
        
        return true;
    }
    return false;



    
}

function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    if (username == "username" && password == "password") {
        return true;
    } 
    else {
        document.getElementById("loginForm").getElementsByTagName("p")[0].hidden = false;
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

    //Colours
    var text = $("a")
    for (var i = 0; i < text.length; i++) {
        text[i].style.color = window.localStorage.getItem("colours3");
    }
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
    //Load Colour Settings
    if (window.localStorage.getItem("colours2") != null){
        var items = document.getElementsByClassName("listContentsContainer");
        for (var i = 0; i < items.length; i++) {
            items[i].style.background = window.localStorage.getItem("colours2");
        }
    }

    if (window.localStorage.getItem("colours3") != null){
        var items = document.getElementsByClassName("listContentsContainer");
        for (var i = 0; i < items.length; i++) {
            items[i].style.color = window.localStorage.getItem("colours3");
            items[i].style.borderColor = window.localStorage.getItem("colours3");
        }
        var text = $("p")
        for (var i = 0; i < text.length; i++) {
            text[i].style.color = window.localStorage.getItem("colours3");
        }
    }
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

    //Load Colour Settings
    if (window.localStorage.getItem("colours2") != null){
        var items = document.getElementsByClassName("listContentsContainer");
        for (var i = 0; i < items.length; i++) {
            items[i].style.background = window.localStorage.getItem("colours2");
        }
    }

    if (window.localStorage.getItem("colours3") != null){
        var items = document.getElementsByClassName("listContentsContainer");
        for (var i = 0; i < items.length; i++) {
            items[i].style.color = window.localStorage.getItem("colours3");
            items[i].style.borderColor = window.localStorage.getItem("colours3");
        }
        var text = $("p")
        for (var i = 0; i < text.length; i++) {
            text[i].style.color = window.localStorage.getItem("colours3");
        }
    }

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
    document.getElementById("listHeading").getElementsByTagName("u")[0].textContent = document.getElementsByClassName("today")[0].getElementsByTagName("a")[0].textContent;
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

function clickedThisWeek() {
    var listContentsDestination = document.getElementById("listContents");
    document.getElementById("listHeading").getElementsByTagName("u")[0].textContent = document.getElementsByClassName("thisWeek")[0].getElementsByTagName("a")[0].textContent;
    var listIndexDestination = document.getElementById("listHeading").getElementsByTagName("p")[0].innerHTML = -1;

    //Prepare to load list contents
    var listContentsDestination = document.getElementById("listContents");
    var oldContents = listContentsDestination.getElementsByTagName("li");
    //Remove current displayed data
    for (var j = 0; j < oldContents.length; j+1) {
        listContentsDestination.removeChild(oldContents[j]);
    }
    
    //Get date of monday this week
    var monday = new Date();
    var day = monday.getDay(),
    diff = monday.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
    monday.setDate(diff);
    var days = [];
    for (var i = 0; i < 7; i++) {
        var tempDate = new Date();
        tempDate.setDate(monday.getDate() + i);
        days.push(tempDate);
    }

    for (var i = 0; i < days.length; i++) {
        console.log(days[i]);
    }

    


    //Get all lists where deadline date is today
    var lists = document.getElementsByClassName("list");
    for (var i = 0; i < lists.length; i++) {
        var listsItems = lists[i].getElementsByTagName("ul")[0].getElementsByTagName("li");
        for (var j = 0; j < listsItems.length; j++) {
            var isThisWeek = false;
            for (var day = 0; day < days.length; day++) {
                var dd = days[day].getDate();
                var mm = days[day].getMonth()+1; 
                var yyyy = days[day].getFullYear();
                if (dd<10) {dd='0'+dd;} 
                if (mm<10) {mm='0'+mm;} 
                var todaysDate = yyyy+"-"+mm+"-"+dd;
                if (listsItems[j].getElementsByTagName("h3")[0].textContent == todaysDate) {
                    isThisWeek = true;
                }
            }



            if (isThisWeek == true) {
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

function deleteNotification(x) {
    x.parentElement.removeChild(x);
}

function openHelp() {
    lists = document.getElementById("lists");
    window.localStorage.setItem("listsInnerHTML", lists.innerHTML);
    window.location.href='help.html';
}

function logout() {
    window.location.href='index.html'
    window.localStorage.removeItem("listsInnerHTML");
    window.localStorage.removeItem("colours0");
    window.localStorage.removeItem("colours1");
    window.localStorage.removeItem("colours2");
    window.localStorage.removeItem("colours3");
    window.localStorage.removeItem("language");
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

        //On-click functionality for thisWeek list
        document.getElementsByClassName("thisWeek")[0].onclick = function() {
            clickedThisWeek();
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

//Buttons that change the color scheme
function changeColor(i, color) {
    switch (i){
        case 0:
            document.getElementById("main").style.background = color;
            window.localStorage.setItem("colours0", color);
            break;
        case 1:
            document.getElementById("sidenavLeft").style.background = color;
            document.getElementById("sidenavRight").style.background = color;
            document.getElementById("settingsMenu").style.background = color;
            document.getElementById("notificationsMenu").style.background = color;
            document.getElementById("calendarPane").style.background = color;
            document.getElementById("rightPaneHeader").style.background = color;
            document.getElementById("leftPaneHeader").style.background = color;
            window.localStorage.setItem("colours1", color);
            break;
        case 2:
            document.getElementById("mainButtonPlus").style.backgroundColor = color;
            document.getElementById("mainButtonMinus").style.backgroundColor = color;
            document.getElementById("updateItemButton").style.backgroundColor = window.localStorage.getItem("colours2");
            var buttons = document.getElementsByClassName("buttonWrapLeft");
            for (var i = 0; i < buttons.length; i++) {
                buttons[i].style.background = color;
            }

            var items = document.getElementsByClassName("listContentsContainer");
            for (var i = 0; i < items.length; i++) {
                items[i].style.background = color;
            }
            var notifications = document.getElementsByClassName("notificationContainer");
            for (var i = 0; i < notifications.length; i++) {
                notifications[i].style.background = color;
            }
            window.localStorage.setItem("colours2", color);
            break;
        case 3:
            document.getElementById("mainButtonPlus").style.borderColor = color;
            document.getElementById("mainButtonPlus").style.color = color;
            document.getElementById("mainButtonMinus").style.borderColor = color;
            document.getElementById("mainButtonMinus").style.color = color;
            var buttons = document.getElementsByClassName("buttonWrapLeft");
            for (var i = 0; i < buttons.length; i++) {
                buttons[i].style.color = color;
                buttons[i].style.borderColor = color;
            }

            var items = document.getElementsByClassName("listContentsContainer");
            for (var i = 0; i < items.length; i++) {
                items[i].style.color = color;
                items[i].style.borderColor = color;
            }

            var text = $("h1, h2, a, p")
            for (var i = 0; i < text.length; i++) {
                text[i].style.color = color;
            }

            document.getElementById("main").style.borderColor = color;
            document.getElementById("calendar").style.borderColor = color;
            document.getElementById("calendarPane").style.borderColor = color;
            document.getElementById("sidenavRight").style.borderColor = color;
            document.getElementById("rightPaneHeader").style.borderColor = color;
            document.getElementById("settingsMenu").style.borderColor = color;
            document.getElementById("notificationsMenu").style.borderColor = color;
            window.localStorage.setItem("colours3", color);
            break;
        

        default:
            console.log("Invalid Aspect")
    }

}

function changeLanguage(lang) {
    window.localStorage.setItem("language", lang.value);
    loadLanguage();
}

function loadLanguage() {
    if (window.localStorage.getItem("language") != null) {
        console.log("language found")
        document.getElementById("language").value = window.localStorage.getItem("language");
        switch (window.localStorage.getItem("language")) {
            case "English":
                document.getElementsByClassName("today")[0].getElementsByTagName("a")[0].textContent = "Today";
                document.getElementById("notificationsMenu").getElementsByTagName("h1")[0].textContent = "Notifications"
                document.getElementById("settingsMenu").getElementsByTagName("h1")[0].textContent = "Settings"
                document.getElementById("settingsMenu").getElementsByTagName("h2")[0].childNodes[0].nodeValue = "Notifications"
                document.getElementById("settingsMenu").getElementsByTagName("h2")[1].childNodes[0].nodeValue = "Language"
                document.getElementById("settingsMenu").getElementsByTagName("h2")[2].childNodes[0].nodeValue = "Background #1"
                document.getElementById("settingsMenu").getElementsByTagName("h2")[3].childNodes[0].nodeValue = "Background #2"
                document.getElementById("settingsMenu").getElementsByTagName("h2")[4].childNodes[0].nodeValue = "Foreground #1"
                document.getElementById("settingsMenu").getElementsByTagName("h2")[5].childNodes[0].nodeValue = "Foreground #2"
                document.getElementById("name").setAttribute("placeholder", "Name");
                document.getElementById("taskDescription").setAttribute("placeholder", "Task Description");
                document.getElementById("itemForm").getElementsByTagName("h2")[0].textContent = "Deadline";
                document.getElementById("itemForm").getElementsByTagName("h2")[1].textContent = "Remind me at";
                break;
            case "French":
                document.getElementsByClassName("today")[0].getElementsByTagName("a")[0].textContent = "Aujourd'hui";
                document.getElementById("notificationsMenu").getElementsByTagName("h1")[0].textContent = "Notifications"
                document.getElementById("settingsMenu").getElementsByTagName("h1")[0].textContent = "Paramètres"
                document.getElementById("settingsMenu").getElementsByTagName("h2")[0].childNodes[0].nodeValue = "Notifications"
                document.getElementById("settingsMenu").getElementsByTagName("h2")[1].childNodes[0].nodeValue = "Langue"
                document.getElementById("settingsMenu").getElementsByTagName("h2")[2].childNodes[0].nodeValue = "Contexte #1"
                document.getElementById("settingsMenu").getElementsByTagName("h2")[3].childNodes[0].nodeValue = "Contexte #2"
                document.getElementById("settingsMenu").getElementsByTagName("h2")[4].childNodes[0].nodeValue = "Premier Plan #1"
                document.getElementById("settingsMenu").getElementsByTagName("h2")[5].childNodes[0].nodeValue = "Premier Plan #2"
                document.getElementById("name").setAttribute("placeholder", "Nom");
                document.getElementById("taskDescription").setAttribute("placeholder", "Description de la tâche");
                document.getElementById("itemForm").getElementsByTagName("h2")[0].textContent = "Date limite";
                document.getElementById("itemForm").getElementsByTagName("h2")[1].textContent = "Rappelle-moi à";
                break;
            case "Italian":
                document.getElementsByClassName("today")[0].getElementsByTagName("a")[0].textContent = "Oggi";
                document.getElementById("notificationsMenu").getElementsByTagName("h1")[0].textContent = "Notifiche"
                document.getElementById("settingsMenu").getElementsByTagName("h1")[0].textContent = "Opzioni"
                document.getElementById("settingsMenu").getElementsByTagName("h2")[0].childNodes[0].nodeValue = "Notifiche"
                document.getElementById("settingsMenu").getElementsByTagName("h2")[1].childNodes[0].nodeValue = "linguaggio"
                document.getElementById("settingsMenu").getElementsByTagName("h2")[2].childNodes[0].nodeValue = "Sfondo #1"
                document.getElementById("settingsMenu").getElementsByTagName("h2")[3].childNodes[0].nodeValue = "Sfondo #2"
                document.getElementById("settingsMenu").getElementsByTagName("h2")[4].childNodes[0].nodeValue = "Primo piano #1"
                document.getElementById("settingsMenu").getElementsByTagName("h2")[5].childNodes[0].nodeValue = "Primo piano #2"
                document.getElementById("name").setAttribute("placeholder", "Nome");
                document.getElementById("taskDescription").setAttribute("placeholder", "Descrizione del compito");
                document.getElementById("itemForm").getElementsByTagName("h2")[0].textContent = "Scadenza";
                document.getElementById("itemForm").getElementsByTagName("h2")[1].textContent = "Ricordamelo a";
                break;
            case "Spanish":
                document.getElementsByClassName("today")[0].getElementsByTagName("a")[0].textContent = "Hoy";
                document.getElementById("notificationsMenu").getElementsByTagName("h1")[0].textContent = "Notificaciones"
                document.getElementById("settingsMenu").getElementsByTagName("h1")[0].textContent = "Ajustes"
                document.getElementById("settingsMenu").getElementsByTagName("h2")[0].childNodes[0].nodeValue = "Notificaciones"
                document.getElementById("settingsMenu").getElementsByTagName("h2")[1].childNodes[0].nodeValue = "Idioma"
                document.getElementById("settingsMenu").getElementsByTagName("h2")[2].childNodes[0].nodeValue = "Fondo #1"
                document.getElementById("settingsMenu").getElementsByTagName("h2")[3].childNodes[0].nodeValue = "Fondo #2"
                document.getElementById("settingsMenu").getElementsByTagName("h2")[4].childNodes[0].nodeValue = "Primer Plano #1"
                document.getElementById("settingsMenu").getElementsByTagName("h2")[5].childNodes[0].nodeValue = "Primer Plano #2"
                document.getElementById("name").setAttribute("placeholder", "Nombre");
                document.getElementById("taskDescription").setAttribute("placeholder", "Descripción de la tarea");
                document.getElementById("itemForm").getElementsByTagName("h2")[0].textContent = "Plazo";
                document.getElementById("itemForm").getElementsByTagName("h2")[1].textContent = "Recuérdame en";
                break;
        }
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
        //Load lists from local storage
        if (window.localStorage.getItem("listsInnerHTML") != null) {
            console.log("data found");
            document.getElementById("lists").innerHTML = window.localStorage.getItem("listsInnerHTML");
        }
        //Load Colour Settings
        if (window.localStorage.getItem("colours0") != null){
            console.log("colour0 found");
            document.getElementById("main").style.background = window.localStorage.getItem("colours0");
        }
        if (window.localStorage.getItem("colours1") != null){
            console.log("colour1 found");
            document.getElementById("sidenavLeft").style.background = window.localStorage.getItem("colours1");
            document.getElementById("sidenavRight").style.background = window.localStorage.getItem("colours1");
            document.getElementById("settingsMenu").style.background = window.localStorage.getItem("colours1");
            document.getElementById("notificationsMenu").style.background = window.localStorage.getItem("colours1");
            document.getElementById("calendarPane").style.background = window.localStorage.getItem("colours1");
            document.getElementById("rightPaneHeader").style.background = window.localStorage.getItem("colours1");
            document.getElementById("leftPaneHeader").style.background = window.localStorage.getItem("colours1");
        }
        if (window.localStorage.getItem("colours2") != null){
            console.log("colour2 found");
            document.getElementById("mainButtonPlus").style.backgroundColor = window.localStorage.getItem("colours2");
            document.getElementById("mainButtonMinus").style.backgroundColor = window.localStorage.getItem("colours2");
            document.getElementById("updateItemButton").style.backgroundColor = window.localStorage.getItem("colours2");
            var buttons = document.getElementsByClassName("buttonWrapLeft");
            for (var i = 0; i < buttons.length; i++) {
                buttons[i].style.background = window.localStorage.getItem("colours2");
            }
            var items = document.getElementsByClassName("listContentsContainer");
            for (var i = 0; i < items.length; i++) {
                items[i].style.background = window.localStorage.getItem("colours2");
            }

            var notifications = document.getElementsByClassName("notificationContainer");
            for (var i = 0; i < notifications.length; i++) {
                notifications[i].style.background = window.localStorage.getItem("colours2");
            }
        }
        if (window.localStorage.getItem("colours3") != null){
            console.log("colour3 found");
            document.getElementById("mainButtonPlus").style.borderColor = window.localStorage.getItem("colours3");
            document.getElementById("mainButtonPlus").style.color = window.localStorage.getItem("colours3");
            document.getElementById("mainButtonMinus").style.borderColor = window.localStorage.getItem("colours3");
            document.getElementById("mainButtonMinus").style.color = window.localStorage.getItem("colours3");
            var buttons = document.getElementsByClassName("buttonWrapLeft");
            for (var i = 0; i < buttons.length; i++) {
                buttons[i].style.color = window.localStorage.getItem("colours3");
                buttons[i].style.borderColor = window.localStorage.getItem("colours3");
            }

            var items = document.getElementsByClassName("listContentsContainer");
            for (var i = 0; i < items.length; i++) {
                items[i].style.color = window.localStorage.getItem("colours3");
                items[i].style.borderColor = window.localStorage.getItem("colours3");
            }

            var text = $("h1, h2, a, p")
            for (var i = 0; i < text.length; i++) {
                text[i].style.color = window.localStorage.getItem("colours3");
            }

            document.getElementById("main").style.borderColor = window.localStorage.getItem("colours3");
            document.getElementById("calendar").style.borderColor = window.localStorage.getItem("colours3");
            document.getElementById("calendarPane").style.borderColor = window.localStorage.getItem("colours3");
            document.getElementById("sidenavRight").style.borderColor = window.localStorage.getItem("colours3");
            document.getElementById("rightPaneHeader").style.borderColor = window.localStorage.getItem("colours3");
            document.getElementById("settingsMenu").style.borderColor = window.localStorage.getItem("colours3");
            document.getElementById("notificationsMenu").style.borderColor = window.localStorage.getItem("colours3");
        }
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

        //Language
        loadLanguage();
        //Event handler   
        EventHandler();
    }
    catch {};
}