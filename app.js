//function selectorCache() {
//    var collection = {};

//   function getFromCache( selector ) {
//        if ( undefined === collection[ selector ] ) {
//            collection[ selector ] = $( selector );
//        }

//        return collection[ selector ];
//    }

//    return { get: getFromCache };
//};

//var selectors = new selectorCache();


// Usage $( '#element' ) becomes
//selectors.get( '#element' );


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
        todoList.generateListDiv($('#list'));
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
    });
    $('.button').mouseleave(function() {
    
        $(this).css('background-color','#3d1256');
        $(this).css('color', 'white');
    });

   
   $('#list').delegate('li', 'mouseover mouseout', function(event) {
       // makes the red x appear to remove a list item when mouse hovers over item 
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
    
        todoList.generateListDiv($('#list'));
        $('#input').find("form")[0].reset();    //empties input area
    });

      
      
    $('#saveButton').click(function(){
        //stores list when save button is clicked. 
        //store the List object and store it's name in multipleLists in localStorage
        todoList.storeList();
        todoLists.addToSavedNames(todoList.state.localStorageKey);
        todoLists.generateListMenu($('.dropdown-menu'));
        
    });
    
    $('#clearButton').click(function() {
        todoList.clearList($('#listTitle'));
        todoList.generateListDiv($('#list'));
        
    });
       
    $('#deleteButton').click(function() {
        //deletes the list from localStorage
        var response = confirm("Are you sure you wish to permanently delete list?");
        if (response === true) {
            todoLists.removeFromSavedNames(todoList.state.localStorageKey);
            todoLists.storeState();
            todoLists.generateListMenu($('.dropdown-menu'));
            removeFromLocalStorage(todoList.state.localStorageKey);
            todoList.clearList($('#listTitle'));
            todoList.generateListDiv($('#list'));
        }
        if (response === false) {
            return;
        }
    });
    
    
    
    
    $('#list').on('click', 'a', function() {
        console.log("clicking on x is doing something");
        var parentId = $(this).parent().attr("id");
        
        todoList.removeFromList(parentId);
        todoList.generateListDiv($('#list'));
      
    });
    
    
    $('#list').sortable({
        update: function(event, ui) {
			var sortedIds = $(this).sortable('toArray');
            todoList.newOrder(sortedIds);
			
         }
    });
      
      
    $('.dropdown-menu').on('click', '.dropdown-option', function() {
        //generates list div with appropriate list when title of list is clicked from dropdown menu
        var loadList = this.textContent
        console.log(loadList);
        todoList.state = todoList.retrieveList(loadList);
        console.log(todoList.state + todoList.state.localStorageKey);
        $('#listTitle').val(loadList);
        todoList.generateListDiv($('#list'));
    });  

        //want to load the list names so that they appear in the dropdown menu
        //multipleLists = loadFromLocalStorage("allListNames", multipleLists);
        todoLists.loadState();
        if (todoLists.loadState() !== null) {            // IS THIS WRITTEN IN A GOOD WAY?
            todoLists.listsState = todoLists.loadState();
        }
        todoLists.generateListMenu($('.dropdown-menu'));
        todoList.isOk = true;
        todoList.generateListDiv($('#list'));
        
    
    

    
});

var updateFlag = function(listObject) {  // Never actually used this anywhere, utility function instead of List object method for now.
        if (listObject.isOk) {
           listObject.isOk = false;
           //console.log("isOk is now false");
         }    
        else if (!listObject.isOk) {    //should I write else if
            listObject.isOk = true;
            //console.log("isOk is now true");
        }
};

var storeInLocalStorage = function(storageItemKey, storageItem) {        
        //  Stores storageItem in localStorage with key storageItemKey
        // convert a javascript value (storageItem) to a JSON string
        localStorage.setItem(storageItemKey, JSON.stringify(storageItem));
    
        // access the current domain's local Storage object and add a data item
        //(storageString) to it 
};

var loadFromLocalStorage = function(storageItemKey, substituteLoadedItem ) {
        //loads stored item using its key storageItemKey and returns the item
        var storageItem = localStorage.getItem(storageItemKey)
        
        
        if (storageItem === null) {
            console.log(storageItemKey + "not found in localstorage");
            return substituteLoadedItem;   
        }
                                                                                                   
 
       else {
       var storageItem = JSON.parse(storageItem);  
       console.log(storageItem);
        
       return storageItem
       }
         
};

var removeFromLocalStorage = function(storageKey) {
    //remove item with localstorage key storageKey from localstorage
    localStorage.removeItem(storageKey);
};

    
var emptyListState = function() {
        return {
        //object with unique ID and item pairs
        items: {},
        //array of unique IDs (for each item of a List)
        order: [],
        //array of items
        added: [],
        counter: 0,
        //also title of list
        localStorageKey: "",
        //saved: []
        }
};
    
var emptyMultipleListsState = function() {
    return {
        //array of saved List Names
        savedNames: [],
    }
};
    
var multipleLists = function(localStorageKey) {
    //represents a collection of stored list names
    var self = this;
    self.isOk = true;
    self.localStorageKey = localStorageKey;
    self.listsState = emptyMultipleListsState();
    
    self.generateListMenu = function(menuClass) {
        //generates and updates HTML for dropdown menu
        if (!self.isOk) {
            console.log("Could not generate listmenu");
            updateFlag(self.isOk);
            return self;
        }
            
        $(menuClass).empty();
        self.listsState.savedNames.forEach( function(listName) {
        $(menuClass).append('<li class="dropdown-option"><a href="#">' + listName + '</a></li>');
        });
    };
    
    self.storeState = function() {
        //stores the names of multipleLists in localStorage
        if(!self.isOk) {
            console.log("Could not store multiple lists");
            updateFlag(self.isOk);
            return self;
        }
        
        storeInLocalStorage(self.localStorageKey, self.listsState);
    };
    
    self.addToSavedNames = function(listName) {
        //adds saved list title to the listsState.savedNames array
        self.listsState.savedNames.push(listName);
        self.storeState();
    };
    
    self.removeFromSavedNames = function(listName) {
        //remove saved list title from the listsState.savedNames array
        var nameIndex = self.listsState.savedNames.indexOf(listName);
        self.listsState.savedNames.splice(nameIndex, 1);
        self.storeState();
        
            
    };
    
    self.loadState = function() {
        //loads the list names of multipleLists
       // if(!self.isOk) {
       //     console.log("Could not retrieve multiple lists");
       //     updateFlag(self.isOk);
       //     return self;
        //}
        return loadFromLocalStorage(self.localStorageKey, emptyMultipleListsState());
        
    };

    
};

var List = function () {
    // this represents a single todo list
    var self = this;

    //self.localStorageKey = localStorageKey;
    
    self.state = emptyListState();
        
    self.isOk = true;
    
  //  self.itemCounter = JSON.parse(localStorage.getItem('counter')) || 0;
  
    self.newOrder = function(newSortedIds) {
        //new array of ID's is stored in self.state.order
        if (!self.isOk) {
            console.log("can not add new order of IDs");
            return self
        }
        
        self.state.order = newSortedIds;
        console.log(self.state.order);
    };
    
    self.generateId = function(prefix) {
        //generates a new unique item ID and increases the counter up by one
        //the counter keeps track of how many times this method is run and is
        //what makes the ID unique
        var itemId = prefix + "-" + self.state.counter;
        self.state.counter = self.state.counter + 1
        var myCounter = JSON.stringify(self.state.counter);
        return itemId;
    };


    self.addToList = function(item) {
        //adds an item to an individual List
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

    
    self.generateListDiv = function(listDiv) {
        //generates and updates HTML for each added item 
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
        //removes an item from the List object
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
        //clears all items and list title of a List
        if(!self.isOk) {
            console.log("Unable to clear list");
            return self;
        }
        
        self.state = emptyListState();
        titleBox.val('');
        
        return self;
        
        
    };
    
   
    self.storeList = function() {   
        //stores an individual List in localStorage 
         if(!self.isOk) {
            console.log("Unable to store list");
            return self;
        }
        
        if (document.getElementById('listTitle').value) {
            var listName = document.getElementById('listTitle').value;
            console.log("this is the list name" + " " + listName);
        }
        
        else { 
           var listName = prompt("You must enter a list title");
           if (listName === null) {
               return;
               
           }
           while (!listName) { 
               var listName = prompt("You must enter a list title");
               }
           
           }
           
        self.state.localStorageKey = listName;
        storeInLocalStorage(self.state.localStorageKey, self.state);
        alert("List saved");
        
        
        return self;
        
       
    };
    
    
    self.retrieveList = function(listName) {
        //loads an individual List from localStorage
        
            // Returns true if the list successfully loaded, otherwise false
        if(!self.isOk) {
            console.log("Unable to retrieve list");
            return self;
        }
        
        return loadFromLocalStorage(listName, emptyListState());
        
    };     
    
    
   

}; 
        
    

var todoList = new List();
var todoLists = new multipleLists('todoLists');




