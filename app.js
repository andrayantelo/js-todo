// if comment is indented it means it is lines of code that have been
//commented out. Otherwise they are just comments.

$(document).ready(function() {
    
    
    
    $(function() {
//the textbox has the typing cursor in it ready to type
      $("#checkListEntry").focus();
    })
    
    $('#button').mouseenter(function() {
//changes css for the Add button when mouse hovers over it
        $('#button').css('background-color','white');
        $('#button').css('color', '#3d1256');
        $('#button').css('border', 'solid');
        $('#button').css('borderWidth', '1px');
    })
    $('#button').mouseleave(function() {
// changes button back to normal css when mouse leaves
        $('#button').css('background-color','#3d1256');
        $('#button').css('color', 'white');
        $('#button').css('border', 'none');
    })
    
    $('#button').click(function(){
//when button is clicked
        var toAdd = $('#checkListEntry').val();
//get the value of #checkListEntry, presumably someone typed
//something to be added before clicking
        todoList.addToList(toAdd);
// add this value to 
        todoList.generateListDiv($('#list'));
        $('#checkListEntry').val('');
    })
    
    
    $(document).on('click', '.item', function() {
       // var toRemove = $('#list').index(this);
       // console.log(toRemove);
        todoList.removeFromList(this.innerHTML);
        todoList.generateListDiv($('#list'));
      
        
    })
    
    $('#list').sortable();
    
    if (todoList.retrieveList()) {
        todoList.generateListDiv($('#list'));
    }
    
//    if (typeof(Storage) !="undefined") {
      // store
//        todoList.storeList();
      //retrieve
//        todoList.retrieveList();
//    }
    
//    else {
//    document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
//     }
    
    
});


var List = function (localStorageKey) {
    var self = this

    self.localStorageKey = localStorageKey;
    
    self.listItems = [];

    self.addToList = function(item) {
// if the list is empty then the first element will be 'item'
        if (self.listItems.length === 0) {
            self.listItems[0] = item;
// if the list is not empty than item will be the nth item in
// the list, where n is equal to the length of listItems    
        } else {
            self.listItems[self.listItems.length] = item;
            
            
        }
        //return this.listItems;
        self.storeList();
        return false;
    };
    
    self.generateListDiv = function(listDiv) {
        listDiv.empty();
        self.listItems.forEach( function(toAdd) {
            listDiv.prepend('<li class="item">' + toAdd + '</li>');
        });
    };
    
    self.removeFromList = function(item) {
        var indexOfItem = self.listItems.indexOf(item);
        if (indexOfItem != -1) {
            self.listItems.splice(indexOfItem, 1);
        }
        self.storeList();
    };
    
    self.storeList = function() {
            var myList = JSON.stringify(self.listItems);
            localStorage.setItem(self.localStorageKey, myList);
        };
        
    self.retrieveList = function() {
// Returns true if the list successfully loaded, otherwise false
        var item = localStorage.getItem(self.localStorageKey);
        if (item === undefined) {
            return false;
        }
        self.listItems = JSON.parse(item);
        return true;
        };

};
        
    
// make a new List object called todoList with self.localStorageKey set
// equal to 'todoList'
var todoList = new List('todoList');

//new object todoList has the following properties:
// self.localStorageKey = todoList
// self.listItems = []
// and the following methods: addTolist, generateListDiv, removeFromList,
// storeList, retrieveList
