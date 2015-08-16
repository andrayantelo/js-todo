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
    
        todoList.generateListDiv($('#list'));
        $('#input').find("form")[0].reset();    //empties input area
    });

    //stores list when save button is clicked.   
      
    $('#saveButton').click(function(){
        todoList.storeList();
        todoLists.storeLists(todoList.state.localStorageKey, todoList.state.added);
        todoLists.generateListMenu($('.dropdown-menu'));
        
    });
    
    $('#clearButton').click(function() {
        todoList.clearList($('#listTitle'));
        todoList.generateListDiv($('#list'));
        
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
        var loadList = this.textContent
        console.log(loadList);
        todoLists.generateListDivFromLoadedList(loadList, $('#list'));
        alert("this worked");
    });  
      
//    $('.dropdown-option').click( function() {
//        var loadList = this.textContent
//        console.log(loadList);
//        todoLists.generateListDivFromLoadedList(loadList, $('#list'));
//        todoList.retrieveList(loadList);
//        todoList.generateListDiv($('#list'), $('#listTitle'));
//        alert("this worked");
//    }); 
        
        


        //want to load the list names so that they appear in the dropdown menu
        //multipleLists = loadFromLocalStorage("allListNames", multipleLists);
        //todoLists.retrieveLists();
        todoLists.listsState = emptyMultipleListsState();  //temporary until I write retrieveLists method
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

var loadFromLocalStorage = function(storageItemKey) {
        //loads stored item using its key storageItemKey and returns the item
        var storageItem = localStorage.getItem(storageItemKey)
        
        
        if (storageItem === null) {
            console.log(storageItemKey + "not found in localstorage");
            return storageItem;   
        }
                                                                                                   
 
       var storageItem = JSON.parse(storageItem);  
       console.log(storageItem);
        
       return storageItem
         
};




 //separate method to add html so that a saved list's name appears in dropdown menu
    
var emptyListState = function() {
        return {
        //object with unique ID and item pairs
        items: {},
        //array of unique IDs (for each item of a List)
        order: [],
        //array of items
        added: [],
        counter: 0,
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
        if(!self.isOk) {
            console.log("Could not store multiple lists");
            updateFlag(self.isOk);
            return self;
        }
        //store the state
        storeInLocalStorage(self.localStorageKey, self.listsState);
    };
    
    self.addToSavedNames = function(listStateStorageKey) {
        //adds saved list title to the listsState.savedNames array
        self.listsState.savedNames.push(listStateStorageKey);
        self.storeState();
    };
    
    self.loadState = function() {
       // if(!self.isOk) {
       //     console.log("Could not retrieve multiple lists");
       //     updateFlag(self.isOk);
       //     return self;
        //}
        return loadFromLocalStorage(self.localStorageKey);
        
    };

    
};

var List = function () {
    // this represents a single todo list
    var self = this;

    //self.localStorageKey = localStorageKey;
    
    self.state = emptyListState();
        
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

    
    self.generateListDiv = function(listDiv) {
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
        storeInLocalStorage(self.localStorageKey, self.state);
        alert("List saved");
        
        
        return self;
        
       
    };
    
    
    self.retrieveList = function(listName) {
        
            // Returns true if the list successfully loaded, otherwise false
        if(!self.isOk) {
            console.log("Unable to retrieve list");
            return self;
        }
        
        loadFromLocalStorage(self.localStorageKey, self.state);
        return self;
    };     
    
    
   

}; 
        
    

var todoList = new List();
var todoLists = new multipleLists('todoLists');




