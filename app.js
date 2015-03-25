

$(document).ready(function() {
    
    
    
    $(function() {
      $("#checkListEntry").focus();
    })
    
    $('#button').mouseenter(function() {
        $('#button').css('background-color','white');
        $('#button').css('color', '#3d1256');
        $('#button').css('border', 'solid');
        $('#button').css('borderWidth', '1px');
    })
    $('#button').mouseleave(function() {
        $('#button').css('background-color','#3d1256');
        $('#button').css('color', 'white');
        $('#button').css('border', 'none');
    })
    
    $('#button').click(function(){
        var toAdd = $('#checkListEntry').val();
        todoList.addToList(toAdd);
        todoList.storeList();
        todoList.generateListDiv($('#list'));
        $('#checkListEntry').val('');
    })
    
    
    $(document).on('click', '.item', function() {
       // var toRemove = $('#list').index(this);
       // console.log(toRemove);
        todoList.removeFromList(this.innerHTML);
        todoList.storeList();
        todoList.generateListDiv($('#list'));
      
        
    })
    
    $('#list').sortable();
    
    if(localStorage.getItem('myList')) {
        todoList.retrieveList();
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


var List = function () {
    var self = this
    
    self.listItems = [];

    self.addToList = function(item) {
        if (self.listItems.length === 0) {
            self.listItems[0] = item;
            
        } else {
            self.listItems[self.listItems.length] = item;
            
            
        }
        //return this.listItems;
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
        
    };
    
    self.storeList = function() {
            var myList = JSON.stringify(self.listItems);
            localStorage.setItem("myList", myList);
        };
        
    self.retrieveList = function() {
        self.listItems = JSON.parse(localStorage.getItem("myList"));
        };

};
        
    

var todoList = new List();
