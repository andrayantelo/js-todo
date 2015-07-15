
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
       
    
    
    
    
    
    
    
    $(document).on('click', '.item', function() {
        
       // var toRemove = $('#list').index(this);
       // console.log(toRemove);
       
        todoList.removeFromList(this.innerHTML);
        todoList.generateListDiv($('#list'));
      
    });
    
    
        $('#list').sortable({
        //  cursor: "move",  
        placeholder: "mylist-placeholder"
        });

    
        todoList.retrieveList()
        todoList.isOk = true;
        todoList.generateListDiv($('#list'));
    
    
/*    if (typeof(Storage) !="undefined") {
      // store
        todoList.storeList();
      //retrieve
        todoList.retrieveList();
    }
    
    else {
    document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
     }
*/    
    
});


var List = function (localStorageKey) {
    var self = this;

    self.localStorageKey = localStorageKey;
    
    self.listItems = [];
    
    self.isOk = true;

    self.addToList = function(item) {
        if (!self.isOk) {
            console.log("Can not add to list");
            return self;
        }
        
        // if the list is empty then the first element will be 'item'
    
        if (self.listItems.length === 0) {
            self.listItems[0] = item;
            
        /* if the list is not empty than item will be the nth item in
        the list, where n is equal to the length of listItems   */
    
        } 
        else {
        self.listItems[self.listItems.length] = item;
            
            
        }
        return self;
        
        
    };
    
    self.generateListDiv = function(listDiv) {
        if(!self.isOk) {
            console.log("Can not generate list div")
            return self;
        }
       
        // empty the child nodes and content from the element 'listDiv' 
    
        listDiv.empty();
        //for each array element in listItems
    
        self.listItems.forEach( function(toAdd) {
        /*add to the beginning of the element listDiv the element li with class
        'item' and with the value toAdd */
    
        listDiv.prepend('<li class="item">' + toAdd + '</li>');
        return self;
        });
        
    };
    
    self.removeFromList = function(item) {
        if (!self.isOk) {
            console.log("Will not remove from list"); 
            return self;
        }
        if (self.isOk) {
            //get the index of the item
    
            var indexOfItem = self.listItems.indexOf(item);
            // if the item is in the list
    
            if (indexOfItem != -1) {
            // start at position indexofItem and remove 1 element of the list 
    
                self.listItems.splice(indexOfItem, 1);
                self.storeList();
                return self;
            }
            else {
                console.log(item + " " + "not on list");
                self.isOk = false;
                return self;
                  };
            }


    };
    
    self.clearList = function() {
        if(!self.isOk) {
            console.log("Unable to cleat list");
            return self;
        }
        
        self.listItems = [];
        self.storeList();
        return self;
        
        
    };
    
    self.storeList = function() {
         if(!self.isOk) {
            console.log("Unable to store list");
            return self;
        }
        
        
        // convert a javascript value (self.listItems) to a JSON string
    
        var myList = JSON.stringify(self.listItems);
        /* access the current domain's local Storage object and add a data item
        (myList) to it */
    
        localStorage.setItem(self.localStorageKey, myList);
        return self;
        
       
    };
    
    
    self.retrieveList = function() {
        
            // Returns true if the list successfully loaded, otherwise false
        if(!self.isOk) {
            console.log("Unable to retrieve list");
            return self;
        }
        
        var item = localStorage.getItem(self.localStorageKey);
        if (item === undefined) {
            self.isOk = false;
            return self;
        }
         // to account for when storage is empy
    
        else if (item === null) {
                self.isOk = false;
                return self;
        }
 
        self.listItems = JSON.parse(item);
        
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
        
    
/* make a new List object called todoList with self.localStorageKey set
equal to 'todoList'*/
var todoList = new List('todoList');

/*new object todoList has the following properties:
self.localStorageKey = todoList
self.listItems = []
and the following methods: addTolist, generateListDiv, removeFromList,
storeList, retrieveList */
