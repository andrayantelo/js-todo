
$(document).ready(function() {
    
    
    
    $(function() {
    //the textbox has the typing cursor in it ready to type
    
      $("#checkListEntry").focus();
    });
    
    $('.button').mouseenter(function() {
    //changes css for the Add button when mouse hovers over it
    
        $(this).css('background-color','white');
        $(this).css('color', '#3d1256');
        $(this).css('border', 'solid');
        $(this).css('borderWidth', '1px');
        
    });
    $('.button').mouseleave(function() {
    // changes button back to normal css when mouse leaves
    
        $(this).css('background-color','#3d1256');
        $(this).css('color', 'white');
        $(this).css('border', 'none');
        $(this).css('borderWidth', '0px');
    });
    
   $('#list').delegate('li', 'mouseover mouseout', function(event) {
       var $this = $(this).find('a');
       
       if(event.type === 'mouseover') {
           $this.stop(true, true).fadeIn();
       } else {
           $this.stop(true, true).fadeOut();
       }
   });
    
    $('#addButton').click(function(){
    //when button is clicked
    
        var toAdd = $('#checkListEntry').val();
        
    /*get the value of #checkListEntry, presumably someone typed
    something to be added before clicking */
    
        todoList.addToList(toAdd);
        
    // add this value to 
    
        todoList.generateListDiv($('#list'));
        $('#input').find("form")[0].reset();    //empties input area
    });

    //stores list when save button is clicked. has an alert for now.  
      
    $('#saveButton').click(function(){
        todoList.storeList();
        alert("List saved");
    });
    
    $('#clearButton').click(function() {
        todoList.clearList();
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
      
      
    $('.dropdown-option').click( function() {
        var loadList = this.textContent
        console.log(loadList);
        todoList.retrieveList(loadList);
        todoList.generateListDiv($('#list'));
        alert("this worked");
    });
        
        


    
        todoList.retrieveList()
        todoList.isOk = true;
        todoList.generateListDiv($('#list'));
        
    
    

    
});

var emptyState = function() {
        return {
        items: {},
        order: [],
        added: [],
        counter: 0,
        localStorageKey: ""
        }
    }

var List = function (localStorageKey) {
    var self = this;

//    self.localStorageKey = localStorageKey;
    
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
    
  
    
    self.clearList = function() {
        if(!self.isOk) {
            console.log("Unable to clear list");
            return self;
        }
        
        self.state = emptyState();
        
        return self;
        
        
    };
    
    //separate method to add html so that a saved list's name appears in dropdown menu
    self.addSavedList = function(saveMenu, savedList) {
        
        self.state.saved.forEach( function(listName) {
        saveMenu.append('<li class="dropdown-option"><a href="#">' + listName + '</a></li>');
        })
    };
    
    self.storeList = function() {
         if(!self.isOk) {
            console.log("Unable to store list");
            return self;
        }
        
        var listName = prompt("Enter a name for your list.");
        
        // convert a javascript value (self.listItems) to a JSON string
        var stateString = JSON.stringify(self.state);
    
    /* access the current domain's local Storage object and add a data item
        (myList) to it */
    
        localStorage.setItem(listName, stateString);
        
        //add the list name to saved lists array
        self.state.saved.push(listName);
        //add the saved list names to dropdown menu
        self.addSavedList($('.dropdown-menu'), self.state.saved);
        
        return self;
        
       
    };
    
    
    self.retrieveList = function() {
        
            // Returns true if the list successfully loaded, otherwise false
        if(!self.isOk) {
            console.log("Unable to retrieve list");
            return self;
        }
        
        var stateString = localStorage.getItem(self.localStorageKey);
        
        
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

/*new object todoList has the following properties:
self.localStorageKey = todoList
self.listItems = []
and the following methods: addTolist, generateListDiv, removeFromList,
storeList, retrieveList */





