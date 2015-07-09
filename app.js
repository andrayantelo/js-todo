/* if comment is indented it means it is lines of code that have been
commented out. Otherwise they are just comments.*/

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
    
    
    $(document).on('click', '.item', function() {
       // var toRemove = $('#list').index(this);
       // console.log(toRemove);
        todoList.removeFromList(this.innerHTML);
        todoList.generateListDiv($('#list'));
      
        
    });
    
    $('#list').sortable();
    
    if (todoList.retrieveList()) {
        todoList.generateListDiv($('#list'));
    }
    
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

    self.addToList = function(item) {
// if the list is empty then the first element will be 'item'
        if (self.listItems.length === 0) {
            self.listItems[0] = item;
/* if the list is not empty than item will be the nth item in
the list, where n is equal to the length of listItems   */
        } else {
            self.listItems[self.listItems.length] = item;
            
            
        }
        //return this.listItems;  <-- why did I have this line? ***
        return false;
    };
    
    self.generateListDiv = function(listDiv) {
// empty the child nodes and content from the element 'listDiv' 
        listDiv.empty();
//for each array element in listItems
        self.listItems.forEach( function(toAdd) {
/*add to the beginning of the element listDiv the element li with class
'item' and with the value toAdd */
            listDiv.prepend('<li class="item">' + toAdd + '</li>');
        });
    };
    
    self.removeFromList = function(item) {
//get the index of the item
        var indexOfItem = self.listItems.indexOf(item);
// if the item is not the last one in the list
        if (indexOfItem != -1) {
// start at position indexofItem and remove 1 element of the list 
            self.listItems.splice(indexOfItem, 1);
        }


    };
    
    self.storeList = function() {
// convert a javascript value (self.listItems) to a JSON string
            var myList = JSON.stringify(self.listItems);
/* access the current domain's local Storage object and add a data item
(myList) to it */
            localStorage.setItem(self.localStorageKey, myList);
        };
        
    self.retrieveList = function() {
// Returns true if the list successfully loaded, otherwise false
        var item = localStorage.getItem(self.localStorageKey);
        if (item === undefined) {
            return false;
        }
// to account for when storage is empy
        else if (item === null) {
            return false;
        }
// 
        self.listItems = JSON.parse(item);
        return true;
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
