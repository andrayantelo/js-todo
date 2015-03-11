$(document).ready(function() {
    
    var todoList = new List();
    
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
        todoList.generateListDiv($('#list'));
        $('#checkListEntry').val('');
    })
    
    
    $(document).on('click', '.item', function() {
        var toRemove = $('#list').index(this);
        todoList.removeFromList(toRemove);
        todoList.generateListDiv($('#list'));
        
    })
    
    $('#list').sortable();
    
    //if (typeof(Storage) !="undefined") {
        // store
       // local.
    
    
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
        return this.listItems;
    };
    
    self.generateListDiv = function(listDiv) {
        listDiv.empty();
        self.listItems.forEach( function(toAdd) {
            listDiv.prepend('<li class="item">' + toAdd + '</li>');
        });
    };
    
    self.removeFromList = function(item) {
        if (item in self.listItems) {
            self.listItems.remove(item);
        };
    };
        
};
        
    
    
