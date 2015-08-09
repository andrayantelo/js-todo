
$(document).ready(function() {
    
    $('#newListTab').mouseenter(function() {
        $(this).toggleClass("active", true);
    });
    
    $('#newListTab').mouseleave(function() {
        $(this).toggleClass("active", false);
    });
    
    $('#newListTab').click(function() {
        console.log("new list has been clicked");
        todoList.clearList($('#listTitle'));
        todoList.generateListDiv($('#list'), $('#listTitle'));
    });

    $("#listTitle").focus();
    
    $('#listTitle').bind("keydown", function(e) {
        if (e.which == 13)
        {
            e.preventDefault();
            $('#checkListEntry').focus();
        }
    });
    
    $('#checkListEntry').bind("keydown", function(e) {
        if (e.which == 13)
        {
            e.preventDefault();  
            $('#addButton').click();
            
        }
    });
    $('.button').mouseenter(function() {
    
        $(this).css('background-color','white');
        $(this).css('color', '#3d1256');
        $(this).css('border', 'solid');
        $(this).css('borderWidth', '1px');
        
    });
    $('.button').mouseleave(function() {
    
        $(this).css('background-color','#3d1256');
        $(this).css('color', 'white');
        $(this).css('border', 'none');
        $(this).css('borderWidth', '0px');
    });

// makes the red x appear to remove a list item when mouse hovers over item    
   $('#list').delegate('li', 'mouseover mouseout', function(event) {
       var $this = $(this).find('a');
       
       if(event.type === 'mouseover') {
           $this.stop(true, true).fadeIn();
       } else {
           $this.stop(true, true).fadeOut();
       }
   });
    
    $('#addButton').click(function(){
    
        var toAdd = $('#checkListEntry').val();
    
        todoList.addToList(toAdd);
    
        todoList.generateListDiv($('#list'), $('#listTitle'));
        $('#input').find("form")[0].reset();    //empties input area
    });

    //stores list when save button is clicked. has an alert for now.  
      
    $('#saveButton').click(function(){
        todoList.storeList();
        alert("List saved");
    });
    
    $('#clearButton').click(function() {
        todoList.clearList($('#listTitle'));
        todoList.generateListDiv($('#list'), $('#listTitle'));
        
    });
       
    
    
    
    
    $('#list').on('click', 'a', function() {
        console.log("clicking on x is doing something");
        var parentId = $(this).parent().attr("id");
        
        todoList.removeFromList(parentId);
        todoList.generateListDiv($('#list'), $('#listTitle'));
      
    });
    
    
    $('#list').sortable({
        update: function(event, ui) {
			var sortedIds = $(this).sortable('toArray');
            todoList.newOrder(sortedIds);
			
         }
    });
      
      
    $('.dropdown-option').click( function() {
        var loadList = this.textContent
        console.log(loadList);
        todoList.retrieveList(loadList);
        todoList.generateListDiv($('#list'), $('#listTitle'));
        alert("this worked");
    });
        
        


    
      //  todoList.retrieveList()
        retrieveAllListNames();
        generateListMenu();
        todoList.isOk = true;
        todoList.generateListDiv($('#list'), $('#listTitle'));
        
    
    

    
});

var multipleLists = {
    savedLists: []
};

var retrieveAllListNames = function() {
    var allListNamesString = localStorage.getItem("allListNames");
    
    if (allListNamesString === undefined) {
        return [];
    }
         // to account for when storage is empy
    
    else if (allListNamesString === null) {
        return [];
    }
 
    multipleLists = JSON.parse(allListNamesString);  
    return multipleLists;    
    
};


 //separate method to add html so that a saved list's name appears in dropdown menu
var generateListMenu = function() {
    console.log(multipleLists.savedLists);
    $('.dropdown-menu').empty();
    multipleLists.savedLists.forEach( function(listName) {
    $('.dropdown-menu').append('<li class="dropdown-option"><a href="#">' + listName + '</a></li>');
    })
};
    
var emptyState = function() {
        return {
        items: {},
        order: [],
        added: [],
        counter: 0,
        localStorageKey: "",
        saved: []
        }
    }

var List = function (localStorageKey) {
    var self = this;

    self.localStorageKey = localStorageKey;
    
    self.state = emptyState();
        
    self.isOk = true;
    
  //  self.itemCounter = JSON.parse(localStorage.getItem('counter')) || 0;
  
  //method that replaces state.order with new array of IDs
    self.newOrder = function(newSortedIds) {
        if (!self.isOk) {
            console.log("can not add new order of IDs");
            return self
        }
        
        self.state.order = newSortedIds;
        console.log(self.state.order);
    };
    
    self.generateId = function(prefix) {
        var itemId = prefix + "-" + self.state.counter;
        self.state.counter = self.state.counter + 1
        var myCounter = JSON.stringify(self.state.counter);
        return itemId;
    };


    self.addToList = function(item) {
        if (!self.isOk) {
            console.log("Can not add to list");
            return self;
        }
    
        self.state.added.push(item);  
        var uniqueId = self.generateId("item");
        self.state.items[uniqueId] = item;
        //console.log(self.state);
       
        self.state.order.unshift(uniqueId);
        
        
        return uniqueId;
        
        
    };

    
    self.generateListDiv = function(listDiv, titleBox) {
        if(!self.isOk) {
            console.log("Can not generate list div")
            return self;
        }
       
        // empty the child nodes and content from the element 'listDiv' 
    
        listDiv.empty();
        
        
        self.state.order.forEach( function(itemKey) {
        
        listDiv.append('<li class = "item" id=' + itemKey + '>' + self.state.items[itemKey] + '<a href= "#">X</a></li>');
        return self;
        });
    };
   
      
    self.removeFromList = function(uniqueId) {
        if (!self.isOk) {
            console.log("Will not remove from list"); 
            return self;
        }
      //  if (self.isOk) {
        var indexOfOrderId = self.state.order.indexOf(uniqueId);
        if (indexOfOrderId != -1) {
            self.state.order.splice(indexOfOrderId, 1);
            var uniqueIdValue = self.state.items[uniqueId];
            
            delete self.state.items[uniqueId];
            
            
            self.state.added.splice(uniqueIdValue, 1);              
                    
        }
        
        else {
            console.log("removeFromList failed");
            self.isOk = false;
        }
        
    };
    
  
    
    self.clearList = function(titleBox) {
        if(!self.isOk) {
            console.log("Unable to clear list");
            return self;
        }
        
        self.state = emptyState();
        titleBox.val('');
        
        return self;
        
        
    };
    
   
    self.storeList = function() {    
         if(!self.isOk) {
            console.log("Unable to store list");
            return self;
        }
        
        if (document.getElementById('listTitle').value) {
            var listName = document.getElementById('listTitle').value;
        }
        
        else { 
           /* var listName = self.localStorageKey; */
           prompt("You must enter a list title");
        }
        
        self.state.localStorageKey = listName;
        console.log(listName);
        console.log(self.state.localStorageKey);
        
        // convert a javascript value (self.state) to a JSON string
        var stateString = JSON.stringify(self.state);
    
    /* access the current domain's local Storage object and add a data item
        (stateString) to it */
    
        localStorage.setItem(listName, stateString);
        
        //add the list name to multipleLists.savedLists array
        multipleLists.savedLists.push(listName);
        console.log(multipleLists.savedLists);
        //add the saved list names to dropdown menu and store them in localstorage
        generateListMenu($('.dropdown-menu'));
        var listMenuItems = JSON.stringify(multipleLists);
        localStorage.setItem("allListNames", listMenuItems);
        
        return self;
        
       
    };
    
    
    self.retrieveList = function() {
        
            // Returns true if the list successfully loaded, otherwise false
        if(!self.isOk) {
            console.log("Unable to retrieve list");
            return self;
        }
        
        
        var stateString = localStorage.getItem(self.state.localStorageKey);
        
        
        if (stateString === undefined) {
            self.isOk = false;
            return self;
        }
         // to account for when storage is empy
    
        else if (stateString === null) {
                self.isOk = false;
                return self;
        }
 
        self.state = JSON.parse(stateString);      
        
        return self;
         
         
    };     
    
    self.updateFlag = function() {
        if (self.isOk) {
           self.isOk = false;
           //console.log("isOk is now false");
         }    
        else if (!self.isOk) {    //should I write else if
            self.isOk = true;
            //console.log("isOk is now true");
        }
       
    };
    
   

}; 
        
    

var todoList = new List('todoList');




